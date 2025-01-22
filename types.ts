export interface Product {
  id: number
  name: string
    category: string;
    value: number;
  price: number
  quantity: number
    disabled?: boolean
}

export interface StatsCardsProps {
    totalProducts: number
    totalStoreValue: number
    outOfStock: number
    numOfCategories: number
}

export type Role = "user" | "admin";
