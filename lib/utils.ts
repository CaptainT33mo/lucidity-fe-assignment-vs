import { Product } from "@/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to parse price/value strings, add an ID, etc.
/* eslint-disable  @typescript-eslint/no-explicit-any */
export function transformProducts(data: any[]): Product[] {
  return data.map((item, index) => ({
    id: index + 1,
    name: item.name,
    category: item.category,
    value: parseFloat((item.value || '0').replace('$', '')) || 0,
    price: parseFloat((item.price || '0').replace('$', '')) || 0,
    quantity: item.quantity || 0,
    disabled: false, // default
  }))
}

export const formatNumber = (value: number, locale = "en-US") => {
  return new Intl.NumberFormat(locale).format(value);
};