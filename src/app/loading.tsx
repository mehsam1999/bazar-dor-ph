const LoadingPage = () => {
  return (
    <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
      <div className="mb-8 flex flex-col items-center justify-center gap-3">
        <span className="loading loading-spinner loading-lg text-green-700"></span>
        <p className="text-base font-medium text-[#202b23]">পণ্যের তথ্য লোড হচ্ছে...</p>
        <p className="text-xs text-gray-500">অনুগ্রহ করে অপেক্ষা করুন</p>
      </div>

      <div className="mb-6 h-7 w-40 animate-pulse rounded-lg bg-green-100"></div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-[#e0e8e0] bg-[#fbfdfb] p-3">
            <div className="mb-3 h-28 animate-pulse rounded-lg bg-green-50 sm:h-36"></div>
            <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
            <div className="mb-3 h-3 w-1/2 animate-pulse rounded bg-gray-100"></div>
            <div className="h-5 w-2/3 animate-pulse rounded bg-green-100"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LoadingPage
