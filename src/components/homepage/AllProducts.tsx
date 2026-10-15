
"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

interface IProduct {
  id: number
  slug: string
  nameBn: string
  today: number
  unit: string
  image: string
  change: {
    dir: "up" | "down" | "flat"
    pct: number
  }
}

const AllProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [sort, setSort] = useState("default")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAllProducts = async () => {
      try{
        const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products")

        if (!res.ok) throw new Error("Failed to fetch products")

        const data: IProduct[] = await res.json()
        setProducts(data)
      }
      catch (error){
        console.error("Error fetching products:", error)

      } 
      finally{
        setLoading(false)
      }
    }

    fetchAllProducts()
  }, [])

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "price-low") return a.today - b.today
    if (sort === "price-high") return b.today - a.today
    return a.id - b.id
  })

  if (loading) return <p className="mt-10 text-center">পণ্য লোড হচ্ছে...</p>

  return (
    <section id="সব-পণ্য" className="mx-auto mt-10 mb-10 max-w-7xl space-y-4 py-6">
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl font-bold">সব পণ্য</h2>
          <p className="text-sm text-gray-500">মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে</p>
        </div>
        <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)} className="select select-bordered select-sm w-42 appearance-none text-base">
          <option value="default">ডিফল্ট</option>
          <option value="price-low">দাম: কম থেকে বেশি</option>
          <option value="price-high">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <Link key={product.id} href={`/products/${product.slug}`} className="rounded-xl border border-base-300 bg-base-100 p-4 transition hover:-translate-y-1 hover:border-green-600">
            <div className="flex items-center gap-3">
              <span className="rounded-xl bg-base-200 p-3 text-2xl">{product.image}</span>
              <div>
                <h3 className="font-semibold">{product.nameBn}</h3>
                <p className="text-sm text-gray-500">প্রতি {product.unit === "kg" ? "কেজি" : product.unit === "litre" ? "লিটার" : product.unit === "dozen" ? "ডজন" : product.unit === "piece" ? "টি" : product.unit}</p>
              </div>
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-xs text-gray-500">আজকের দাম</p>
                <p className="font-bold">{product.today.toLocaleString("bn-BD")} টাকা</p>
              </div>
              <span className={`rounded-full px-2 py-1 text-xs font-semibold ${product.change.dir === "up" ? "bg-red-50 text-red-600" : product.change.dir === "down" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                {product.change.dir === "up" ? "▲" : product.change.dir === "down" ? "▼" : "—"} {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default AllProducts
