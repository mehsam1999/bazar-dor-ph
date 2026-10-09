
"use client"

import { useState } from "react"
import Link from "next/link"

interface IProduct {
  id: number
  slug: string
  nameBn: string
  categoryIcon: string
  today: number
  unit: string
  image: string
  change: {
    dir: "up" | "down" | "flat"
    pct: number
  }
}

const CategoryProductList = ({ products }: { products: IProduct[] }) => {
  const [sort, setSort] = useState("default")

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "price-low") return a.today - b.today
    if (sort === "price-high") return b.today - a.today
    return a.id - b.id
  })

  return (
    <>
      <section className="mb-4 flex items-center justify-end gap-2 rounded-2xl border border-[#e0e8e0] bg-[#fbfdfb] px-5 py-4">
        <label htmlFor="sort" className="text-sm text-gray-500">সাজান</label>
        <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)} className="select select-bordered select-sm appearance-none w-42 text-base">
          <option value="default">ডিফল্ট</option>
          <option value="price-low">দাম: কম থেকে বেশি</option>
          <option value="price-high">দাম: বেশি থেকে কম</option>
        </select>
      </section>

      <p className="mb-4 text-sm text-gray-500">মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id} className="rounded-2xl border border-[#e0e8e0] bg-[#fbfdfb] p-4 transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl">{product.image || product.categoryIcon}</div>
              <div>
                <h2 className="font-semibold text-[#202b23]">{product.nameBn}</h2>
                <p className="text-xs text-gray-500">প্রতি {product.unit}</p>
              </div>
            </div>

            <p className="mb-1 text-xs text-gray-500">আজকের দাম</p>

            <div className="flex items-center justify-between gap-2">
              <p className="text-lg font-bold text-[#202b23]">{product.today.toLocaleString("bn-BD")} টাকা</p>
              <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${product.change.dir === "up" ? "bg-red-50 text-red-600" : product.change.dir === "down" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-600"}`}>
                <span>{product.change.dir === "up" ? "▲" : product.change.dir === "down" ? "▼" : "—"}</span>
                <span>{product.change.pct.toLocaleString("bn-BD")}%</span>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {products.length === 0 && <p className="rounded-2xl bg-white py-10 text-center text-gray-500">এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।</p>}
    </>
  )
}

export default CategoryProductList
