import Link from "next/link"
import { FaArrowLeft, FaExclamationTriangle } from "react-icons/fa"

const NotFound = () => {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-[#e0e8e0] bg-[#fbfdfb] px-6 py-10 text-center shadow-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100"><FaExclamationTriangle className="text-3xl text-green-700" /></div>
        <h1 className="mt-6 text-6xl font-extrabold text-green-700">404</h1>
        <h2 className="mt-3 text-xl font-bold text-[#202b23]">পেজটি খুঁজে পাওয়া যায়নি!</h2>
        <p className="mt-2 text-sm leading-6 text-gray-500">দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি নেই অথবা সরিয়ে ফেলা হয়েছে। সঠিক লিংকটি যাচাই করে আবার চেষ্টা করুন।</p>
        <div className="mt-10 text-center">
          <Link href="/" className="text-gray-500 hover:text-green-700 flex items-center gap-2 justify-center"><FaArrowLeft className="text-xs" /> হোম পেজে ফিরে যান</Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
