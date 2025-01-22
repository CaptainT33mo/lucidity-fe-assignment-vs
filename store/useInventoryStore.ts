import { MOCK_INVENTORY } from '@/lib/data'
import { transformProducts } from '@/lib/utils'
import { Product } from '@/types'
import { create } from 'zustand'

interface InventoryState {
  products: Product[]
  totalProducts: number
  totalStoreValue: number
  outOfStock: number
  numOfCategories: number

  // Actions
  fetchProducts: () => Promise<void>
  deleteProduct: (id: number) => void
  updateProduct: (updatedProduct: Product) => void
  toggleDisableProduct: (id: number) => void
  recalcStats: (products: Product[]) => void
}

const API_URL = 'https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory'

export const useInventoryStore = create<InventoryState>((set, get) => ({
  products: [],
  totalProducts: 0,
  totalStoreValue: 0,
  outOfStock: 0,
  numOfCategories: 0,

  // --- actions ---
  fetchProducts: async () => {
    try {
      const res = await fetch(API_URL)
      
      // If the response is not OK, check for 429 or otherwise handle error
      if (!res.ok) {
        if (res.status === 429) {
          console.warn('Got 429 Too Many Requests; loading mock data.')
          // Use fallback data
          const transformed = transformProducts(MOCK_INVENTORY)
          set({ products: transformed })
          get().recalcStats(transformed)
          return
        } else {
          // handle other errors
          console.error('Fetch error', res.status)
          return
        }
      }

      const data = await res.json()
      const transformed = transformProducts(data)
      set({ products: transformed })
      get().recalcStats(transformed)
      
    } catch (error) {
      console.error('Error fetching products:', error)
      // If the error is a network/timeout, you can still load fallback data if desired
      const transformed = transformProducts(MOCK_INVENTORY)
      set({ products: transformed })
      get().recalcStats(transformed)
    }
  },

  deleteProduct: (id: number) => {
    const { products, recalcStats } = get()
    const newProducts = products.filter((p) => p.id !== id)
    set({ products: newProducts })
    recalcStats(newProducts)
  },

  updateProduct: (updatedProduct: Product) => {
    const { products, recalcStats } = get()
    const newProducts = products.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p
    )
    set({ products: newProducts })
    recalcStats(newProducts)
  },

  toggleDisableProduct: (id: number) => {
    const { products, recalcStats } = get()
    const newProducts = products.map((p) =>
      p.id === id ? { ...p, disabled: !p.disabled } : p
    )
    set({ products: newProducts })
    recalcStats(newProducts)
  },

  recalcStats: (products: Product[]) => {
    const totalProducts = products.filter(p => !p.disabled).length
    const totalStoreValue = products
      .filter(p => !p.disabled)
      .reduce((acc, p) => acc + p.price * p.quantity, 0)
    const outOfStock = products.filter(p => p.quantity === 0 && !p.disabled).length
    const categories = new Set(
      products.filter(p => !p.disabled).map(p => p.category)
    )

    set({
      totalProducts,
      totalStoreValue,
      outOfStock,
      numOfCategories: categories.size,
    })
  },
}))
