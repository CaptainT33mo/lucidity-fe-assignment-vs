'use client'

import { useEffect } from 'react'
import { useInventoryStore } from '@/store/useInventoryStore'
import StatsCards from '@/components/views/dashboard/StatsCards'
import InventoryTable from '@/components/views/dashboard/InventoryTable'
import { usePermissionStore } from '@/store/usePermissionStore'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

export default function Home() {
  const {
    products,
    fetchProducts,
    totalProducts,
    totalStoreValue,
    outOfStock,
    numOfCategories,
  } = useInventoryStore();
  const { role, setRole } = usePermissionStore();

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleToggleRole = () => {
    setRole(role === "admin" ? "user" : "admin");
  };

  return (
    <>
      <nav className="p-4 flex justify-end items-center bg-black text-white border-b border-b-gray-800">
        <div className="flex items-center gap-2">
          <Label>User</Label>
          <Switch checked={role === "admin"} className='data-[state=unchecked]:bg-gray-600 data-[state=checked]:bg-[#7f894e]' thumbClass='data-[state=checked]:bg-[#eafc86]'
            onCheckedChange={handleToggleRole} />
          <Label>Admin</Label>
        </div>
      </nav>
      <main className="p-4">
        <h1 className="text-3xl font-bold mb-4 text-white">Inventory Stats</h1>

        <StatsCards
          totalProducts={totalProducts}
          totalStoreValue={totalStoreValue}
          outOfStock={outOfStock}
          numOfCategories={numOfCategories}
        />

        <div className="mt-8">
          <InventoryTable products={products} />
        </div>
      </main>
    </>
  )
}
