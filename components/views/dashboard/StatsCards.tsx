import { formatNumber } from "@/lib/utils";
import { StatsCardsProps } from "@/types";
import { LuShapes } from "react-icons/lu";
import { MdOutlineRemoveShoppingCart, MdOutlineShoppingCart } from "react-icons/md";
import { RiExchangeDollarLine } from "react-icons/ri";

export default function StatsCards({
    totalProducts,
    totalStoreValue,
    outOfStock,
    numOfCategories,
}: StatsCardsProps) {
    return (
        <div className="grid grid-cols-4 gap-4">
            <div className="bg-[#273326] text-white p-4 rounded-2xl">
                <div className="flex gap-6">
                    <MdOutlineShoppingCart size={36} />
                    <div className="flex flex-col gap-3">
                        <p className="text-lg">Total product</p>
                        <p className="text-5xl">{totalProducts}</p>
                    </div>
                </div>
            </div>
            <div className="bg-[#273326] text-white p-4 rounded-2xl">
                <div className="flex gap-6">
                    <RiExchangeDollarLine size={36} />
                    <div className="flex flex-col gap-3">
                        <p className="text-lg">Total store value</p>
                        <p className="text-5xl">{formatNumber(totalStoreValue)}</p>
                    </div>
                </div>
            </div>
            <div className="bg-[#273326] text-white p-4 rounded-2xl">
                <div className="flex gap-6">
                    <MdOutlineRemoveShoppingCart size={36} />
                    <div className="flex flex-col gap-3">
                        <p className="text-lg">Out of stock</p>
                        <p className="text-5xl">{outOfStock}</p>
                    </div>
                </div>
            </div>
            <div className="bg-[#273326] text-white p-4 rounded-2xl">
                <div className="flex gap-6">
                    <LuShapes size={36} />
                    <div className="flex flex-col gap-3">
                        <p className="text-lg">No of Category</p>
                        <p className="text-5xl">{numOfCategories}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
