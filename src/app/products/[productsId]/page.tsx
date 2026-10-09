
import Link from "next/link"

interface IMarket {
  market: string
  division: string
  min: number
  max: number
}

interface IProduct {
  id: number
  slug: string
  nameBn: string
  category: string
  categoryNameBn: string
  categoryIcon: string
  today: number
  yesterday: number
  lastWeek: number
  lastMonth: number
  unit: string
  image: string
  change: {
    dir: "up" | "down" | "flat"
    pct: number
  }
  markets: IMarket[]
}

const ProductDetails = async ({ params }: { params: Promise<{ productsId: string }> }) => {
  const { productsId } = await params
  const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/products/${productsId}`)
  const product: IProduct = await res.json()
  const prices = product.markets ?? []
  const minPrice = prices.length ? Math.min(...prices.map((market) => market.min)) : 0
  const maxPrice = prices.length ? Math.max(...prices.map((market) => market.max)) : 0
  const avgPrice = prices.length ? prices.reduce((sum, market) => sum + (market.min + market.max) / 2, 0) / prices.length : 0

  return (
    <div className="min-h-screen px-3 py-5 sm:px-5">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex flex-wrap items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-green-700">হোম</Link>
          <span>›</span>
          <Link href={`/category/${product.category}`} className="hover:text-green-700">{product.categoryNameBn}</Link>
          <span>›</span>
          <span className="text-gray-700">{product.nameBn}</span>
        </div>

        <section className="flex flex-col justify-between gap-4 rounded-xl border border-[#e0e8e0] bg-[#fbfdfb] p-4 sm:flex-row sm:items-center sm:px-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-3xl">{product.image || product.categoryIcon}</div>
            <div>
              <h1 className="text-xl font-bold text-[#202b23] sm:text-2xl">{product.nameBn}</h1>
              <p className="mt-1 text-xs text-gray-500">প্রতি {product.unit} · {product.categoryNameBn}</p>
              <p className="mt-2 text-xs text-gray-600">গতকালের তুলনায় আজকের দাম {product.change.dir === "up" ? "বেড়েছে" : product.change.dir === "down" ? "কমেছে" : "অপরিবর্তিত"} - {product.change.pct.toLocaleString("bn-BD")}%</p>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-center justify-center rounded-xl bg-[#f0f5f0] px-6 py-3 sm:min-w-28">
            <p className="text-xs text-gray-500">বর্তমান দাম</p>
            <p className="text-2xl font-bold text-[#202b23]">{product.today.toLocaleString("bn-BD")}</p>
            <p className="text-xs text-gray-500">টাকা / {product.unit === "kg" ? "কেজি" : product.unit}</p>
            <p className={`mt-1 text-xs font-semibold ${product.change.dir === "up" ? "text-red-600" : product.change.dir === "down" ? "text-green-600" : "text-gray-500"}`}>
              {product.change.dir === "up" ? "▲" : product.change.dir === "down" ? "▼" : "—"} {product.change.pct.toLocaleString("bn-BD")}%
            </p>
          </div>
        </section>

        <section className="mt-4 rounded-xl border border-[#e0e8e0] bg-[#fbfdfb] p-4 sm:p-5">
          <h2 className="mb-4 text-base font-bold text-[#202b23]">দামের সারসংক্ষেপ</h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-[#e0e8e0] p-4">
              <p className="text-xs text-gray-600">সর্বনিম্ন দাম</p>
              <p className="mt-1 text-xl font-bold text-green-600">{minPrice.toLocaleString("bn-BD")} টাকা</p>
              <p className="mt-1 text-[11px] text-gray-500">সবচেয়ে কম দামের বাজার</p>
            </div>

            <div className="rounded-xl border border-[#e0e8e0] p-4">
              <p className="text-xs text-gray-600">সর্বোচ্চ দাম</p>
              <p className="mt-1 text-xl font-bold text-red-600">{maxPrice.toLocaleString("bn-BD")} টাকা</p>
              <p className="mt-1 text-[11px] text-gray-500">সবচেয়ে বেশি দামের বাজার</p>
            </div>

            <div className="rounded-xl border border-[#e0e8e0] p-4">
              <p className="text-xs text-gray-600">গড় দাম</p>
              <p className="mt-1 text-xl font-bold text-green-700">{Math.round(avgPrice).toLocaleString("bn-BD")} টাকা</p>
              <p className="mt-1 text-[11px] text-gray-500">প্রতি {product.unit === "kg" ? "কেজি" : product.unit}-এর হিসাবে</p>
            </div>
          </div>

          <h2 className="mb-3 mt-5 text-base font-bold text-[#202b23]">বাজারভিত্তিক আজকের দাম</h2>

          <div className="overflow-x-auto rounded-xl border border-[#e0e8e0]">
            <table className="w-full min-w-150 border-collapse text-left text-xs">
              <thead className="bg-[#f5f8f5] text-gray-500">
                <tr>
                  <th className="px-3 py-3 font-medium">বাজার</th>
                  <th className="px-3 py-3 font-medium">বিভাগ</th>
                  <th className="px-3 py-3 text-right font-medium">সর্বনিম্ন</th>
                  <th className="px-3 py-3 text-right font-medium">সর্বোচ্চ</th>
                  <th className="px-3 py-3 text-right font-medium">গড়</th>
                </tr>
              </thead>

              <tbody>
                {prices.map((market, index) => (
                  <tr key={`${market.market}-${market.division}`} className={`border-t border-[#e0e8e0] ${index % 2 === 0 ? "bg-[#fbfdfb]" : "bg-[#f0f5f0]"}`}>
                    <td className="px-3 py-3">{market.market}</td>
                    <td className="px-3 py-3">{market.division}</td>
                    <td className="px-3 py-3 text-right">{market.min.toLocaleString("bn-BD")} টাকা</td>
                    <td className="px-3 py-3 text-right">{market.max.toLocaleString("bn-BD")} টাকা</td>
                    <td className="whitespace-nowrap px-3 py-3 text-right font-medium">
                        {((market.min + market.max) / 2).toLocaleString("bn-BD", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })} টাকা
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {prices.length === 0 && <p className="py-6 text-center text-sm text-gray-500">এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।</p>}
        </section>
      </div>
    </div>
  )
}

export default ProductDetails
