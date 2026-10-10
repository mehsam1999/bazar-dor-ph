"use client"
import { authClient } from "@/lib/auth-client"
import Link from "next/link"
import toast from "react-hot-toast"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

const SignInPage = () => {
  const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const user = Object.fromEntries(formData.entries()) as { name: string, email: string, password: string, confirmPassword: string}
    // console.log(user)

    const { data, error } = await authClient.signIn.email({
      ...user,
      callbackURL: "/"
    })

    if (data) {
      toast.success("স্বাগতম! সফলভাবে সাইন ইন করেছেন।")
      console.log(data)
    }

    if (error) {
      const message = error.code === "INVALID_EMAIL_OR_PASSWORD"? "ইমেইল অথবা পাসওয়ার্ড ভুল হয়েছে। আবার চেষ্টা করুন।": "সাইন ইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।"
      toast.error(message)
      console.log(error)
    }
  }
  const handleGoogleSignIn= async()=>{
    await authClient.signIn.social({
    provider: "google",
  });
  }
  const handleGithubSignIn= async()=>{
    await authClient.signIn.social({
    provider: "github",
  });
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-[#f0f5f0] px-4 py-6 my-12">
      <div className="w-full max-w-83">
        <div className="mb-5 text-center">
          <h1 className="text-2xl font-bold text-[#202b23]">সাইন ইন</h1>
          <p className="mt-1 text-xs leading-5 text-gray-500">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
        </div>

        <section className="rounded-xl border border-[#e0e8e0] bg-[#fbfdfb] p-4">
          <form onSubmit={onSubmit} className="space-y-3">
            <div>
              <label htmlFor="email" className="mb-1 block text-xs font-medium text-[#202b23]">ইমেইল</label>
              <input id="email" name="email" type="email" placeholder="you@example.com" required className="input input-bordered h-9 w-full border-[#e0e8e0] bg-transparent text-xs outline-none focus:border-green-600" />
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-xs font-medium text-[#202b23]">পাসওয়ার্ড</label>
              <input id="password" name="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" minLength={8} required className="input input-bordered h-9 w-full border-[#e0e8e0] bg-transparent text-xs outline-none focus:border-green-600" />
            </div>

            <button type="submit" className="btn h-9 min-h-0 w-full border-0 bg-green-700 text-xs font-semibold text-white shadow-md hover:bg-green-800">সাইন ইন</button>
          </form>

          <div className="my-3 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200"></div>
            <span className="text-[11px] text-gray-500">অথবা</span>
            <div className="h-px flex-1 bg-gray-200"></div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button onClick={handleGoogleSignIn} type="button" className="btn h-9 min-h-0 border border-[#e0e8e0] bg-transparent px-2 text-[10px] font-medium text-[#202b23] hover:bg-gray-100">
              <FcGoogle className="shrink-0 text-sm" /> Google দিয়ে চালিয়ে যান
            </button>
            <button onClick={handleGithubSignIn} type="button" className="btn h-9 min-h-0 border border-[#e0e8e0] bg-transparent px-2 text-[10px] font-medium text-[#202b23] hover:bg-gray-100">
              <FaGithub className="shrink-0 text-sm" /> GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="mt-3 text-center text-xs text-gray-500">
            অ্যাকাউন্ট নেই? <Link href="/signup" className="font-medium text-green-700 hover:underline">সাইন আপ করুন</Link>
          </p>
        </section>

        <div className="mt-4 text-center">
          <Link href="/" className="text-xs text-gray-500 hover:text-green-700">← হোম পেজে ফিরে যান</Link>
        </div>
      </div>
    </div>
  )
}

export default SignInPage
