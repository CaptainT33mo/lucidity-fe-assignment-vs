'use client'

import { useInventoryStore } from '@/store/useInventoryStore'
import { useState } from 'react'
import EditProductModal from './EditProductModal'
import { Product } from '@/types'
import { usePermissionStore } from '@/store/usePermissionStore'
import { Button } from '@/components/ui/button'
import { LuEye, LuEyeOff, LuPencil, LuTrash } from 'react-icons/lu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { formatNumber } from '@/lib/utils'

interface InventoryTableProps {
    products: Product[]
    isAdmin?: boolean
}

export default function InventoryTable({ products, isAdmin = true }: InventoryTableProps) {
    const { deleteProduct, toggleDisableProduct } = useInventoryStore();
    const { role } = usePermissionStore();
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)

    const handleDelete = (id: number) => {
        if (role !== "admin") return
        deleteProduct(id)
    }

    const handleEdit = (product: Product) => {
        if (role !== "admin" || product.disabled) return
        setEditingProduct(product)
    }

    const handleDisable = (id: number) => {
        if (role !== "admin") return
        toggleDisableProduct(id)
    }

    return (
        <>
            <Table className="w-full border-collapse bg-[#212124] rounded-xl">
                <TableHeader>
                    <TableRow className="border-b border-[#373738]">
                        <TableHead className="text-left"><Badge className='rounded-xl text-[#e4fe72] bg-[#161718] py-1.5'>Name</Badge></TableHead>
                        <TableHead className="text-left"><Badge className='rounded-xl text-[#e4fe72] bg-[#161718] py-1.5'>Category</Badge></TableHead>
                        <TableHead className="text-left"><Badge className='rounded-xl text-[#e4fe72] bg-[#161718] py-1.5'>Price</Badge></TableHead>
                        <TableHead className="text-left"><Badge className='rounded-xl text-[#e4fe72] bg-[#161718] py-1.5'>Quantity</Badge></TableHead>
                        <TableHead className="text-left"><Badge className='rounded-xl text-[#e4fe72] bg-[#161718] py-1.5'>Value</Badge></TableHead>
                        <TableHead className="text-left"><Badge className='rounded-xl text-[#e4fe72] bg-[#161718] py-1.5'>Action</Badge></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((prod, idx) => (
                        <TableRow
                            key={idx}
                            className={`${prod.disabled ? 'text-gray-400' : 'text-white'} border-b border-[#373738]`}
                        >
                            <TableCell className="py-2">{prod.name}</TableCell>
                            <TableCell className="py-2">{prod.category}</TableCell>
                            <TableCell className="py-2">${formatNumber(prod.price)}</TableCell>
                            <TableCell className="py-2">{prod.quantity}</TableCell>
                            <TableCell className="py-2">${formatNumber(prod.value)}</TableCell>
                            <TableCell className="py-2">
                                <Button className='text-green-500 px-1.5 hover:bg-transparent' variant="ghost" disabled={role !== "admin" || prod.disabled} onClick={() => handleEdit(prod)}>
                                    <LuPencil />
                                </Button>
                                <Button className='text-purple-500 px-1.5  hover:bg-transparent' variant="ghost" disabled={role !== "admin"} onClick={() => handleDisable(prod.id)}>
                                    {prod.disabled ? <LuEyeOff /> : <LuEye />}
                                </Button>
                                <Button className='text-red-500 px-1.5  hover:bg-transparent' variant="ghost" disabled={role !== "admin"} onClick={() => handleDelete(prod.id)}>
                                    <LuTrash />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Edit Modal */}
            {editingProduct && (
                <EditProductModal
                    product={editingProduct}
                    onClose={() => setEditingProduct(null)}
                />
            )}
        </>
    )
}
