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

const AllProducts = async () => {
  const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products")
  const products: IProduct[] = await res.json()

  return (
    <section id="সব-পণ্য" className="mx-auto max-w-7xl space-y-4 mt-10 py-6 mb-10">
      <div>
        <h2 className="text-xl font-bold">সব পণ্য</h2>
        <p className="text-sm text-gray-500">মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে</p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`} className="rounded-xl border border-base-300 bg-base-100 p-4 transition hover:-translate-y-1 hover:border-green-600">
            <div className="flex items-center gap-3">
              <span className="rounded-xl bg-base-200 p-3 text-2xl">{product.image}</span>
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

export default AllProducts;