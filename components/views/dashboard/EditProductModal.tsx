'use client'

import { useState } from 'react'
import { useInventoryStore } from '@/store/useInventoryStore'
import { Product } from '@/types'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LuX } from 'react-icons/lu'

interface EditProductModalProps {
    product: Product
    onClose: () => void
}

export default function EditProductModal({ product, onClose }: EditProductModalProps) {
    const { updateProduct } = useInventoryStore()
    const [value, setValue] = useState(product.value)
    const [price, setPrice] = useState(product.price)
    const [quantity, setQuantity] = useState(product.quantity)
    const [category, setCategory] = useState(product.category)

    const handleSave = () => {
        const updated = {
            ...product,
            price,
            quantity,
            value,
            category,
        }
        updateProduct(updated)
        onClose()
    }

    return (
        <Dialog open={!!product} onOpenChange={onClose}>
            <DialogContent hideCloseButton className='bg-[#292b27] border-transparent'>
                <DialogHeader>
                    <DialogTitle>
                        <div className='flex items-center justify-between'>
                            <div>
                                <h2 className='text-2xl text-white'>Edit Product</h2>
                                <p className='font-medium text-white'>{product.name}</p>
                            </div>

                            <Button className='text-[#e4fe72] bg-[#272826] border-gray-700' variant="outline" onClick={onClose}>
                                <LuX size={20} />
                            </Button>

                        </div>
                    </DialogTitle>
                    <div className='!mt-6 flex flex-wrap gap-4'>
                        <div className=''>
                            <Label htmlFor='category' className='text-white'>Category</Label>
                            <Input id='category' value={category} className='bg-[#3f413d] border-transparent text-gray-300'
                                onChange={(e) => setCategory(e.target.value)} />
                        </div>
                        <div className=''>
                            <Label htmlFor='price' className='text-white'>Price</Label>
                            <Input id='price' type="number" value={price} className='bg-[#3f413d] border-transparent text-gray-300'
                                onChange={(e) => setPrice(Number(e.target.value))}
                            />
                        </div>
                        <div className=''>
                            <Label htmlFor='quantity' className='text-white'>Quantity</Label>
                            <Input type='number' id='quantity' value={quantity} className='bg-[#3f413d] border-transparent text-gray-300'
                                onChange={(e) => setQuantity(Number(e.target.value))} />
                        </div>
                        <div className=''>
                            <Label htmlFor='value' className='text-white'>Value</Label>
                            <Input type='number' id='value' value={value} className='bg-[#3f413d] border-transparent text-gray-300'
                                onChange={(e) => setValue(Number(e.target.value))} />
                        </div>
                    </div>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={onClose} variant="ghost" className='text-[#e4fe72] hover:bg-transparent'>Confirm</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
