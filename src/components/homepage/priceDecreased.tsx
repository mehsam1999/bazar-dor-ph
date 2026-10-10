import Link from "next/link"

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

const PriceDecreased = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products")
  const products: IProduct[] = await res.json()

  const priceDecreased = products.filter((product) => product.change.dir === "down").sort((a, b) => a.change.pct - b.change.pct).slice(0, 6)

  return (
    <section className="mx-auto max-w-7xl space-y-4">
      <h2 className="text-xl font-bold"><span className="text-green-600">▼</span> আজ দাম কমেছে</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {priceDecreased.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`} className="rounded-xl border border-base-300 bg-base-100 p-4 transition hover:-translate-y-1 hover:border-green-600">
            <div className="flex items-center gap-3">
              <span className="rounded-xl bg-base-300 p-3 text-2xl">{product.image}</span>
              <div>
                <h3 className="font-semibold">{product.nameBn}</h3>
                <p className="text-sm text-gray-500">প্রতি {product.unit === "kg" ? "কেজি" : product.unit === "litre" ? "লিটার" : product.unit}</p>
              </div>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-xs text-gray-500">আজকের দাম</p>
                <p className="font-bold">{product.today.toLocaleString("bn-BD")} টাকা</p>
              </div>
              <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">▼ {Math.abs(product.change.pct).toLocaleString("bn-BD")}%</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default PriceDecreased