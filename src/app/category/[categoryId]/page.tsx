import CategoryProductList from "@/components/categoryDetails/CategoryProductList"

interface IProduct {
  id: number
  slug: string
  nameBn: string
  category: string
  categoryNameBn: string
  categoryIcon: string
  today: number
  unit: string
  image: string
  change: {
    dir: "up" | "down" | "flat"
    pct: number
  }
}

const CategoryProducts = async ({ params }: { params: Promise<{ categoryId: string }> }) => {
  const { categoryId } = await params
  const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/products?category=${categoryId}`)
  const data: IProduct[] = await res.json()
  const category = data[0]

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-6">
      <div className="mx-auto max-w-7xl">
        <section className="mb-5 flex items-center gap-3 rounded-2xl border border-[#e0e8e0] bg-[#fbfdfb] px-5 py-5">
          <span className="text-3xl">{category?.categoryIcon ?? "🛒"}</span>
          <div>
            <h1 className="text-2xl font-bold text-[#202b23]">{category?.categoryNameBn ?? "পণ্য"}</h1>
            <p className="text-sm text-gray-500">{data.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
          </div>
        </section>

        <CategoryProductList products={data}></CategoryProductList>
      </div>
    </main>
  )
}

export default CategoryProducts
