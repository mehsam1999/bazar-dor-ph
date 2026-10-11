"use client"

import { authClient } from "@/lib/auth-client"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { FaSignOutAlt } from "react-icons/fa"

const ProfilePage = () => {
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const user = session?.user

  const displayName = user?.name ?? ""
  const displayEmail = user?.email ?? ""
  const displayInitial = displayName.charAt(0).toUpperCase()

  const [name, setName] = useState(displayName)

  const hasNameChanged = name.trim() !== displayName.trim()

  const handleSignOut = async () => {
    const { error } = await authClient.signOut()

    if (error) {
      toast.error("সাইন আউট করা যায়নি!")
      return
    }

    toast.success("সফলভাবে সাইন আউট করেছেন!")
    router.push("/")
    router.refresh()
  }

  const handleUpdateButton = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string

    const { error } = await authClient.updateUser({ name })

    if (error) {
      toast.error("নাম আপডেট করা যায়নি!")
      return
    }

    toast.success("নাম সফলভাবে আপডেট হয়েছে!")
    router.refresh()
  }

  return (
    <div className="px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-xl">
        <h1 className="text-2xl font-bold text-[#202b23]">আমার প্রোফাইল</h1>
        <p className="mt-1 text-xs text-gray-500">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন</p>

        <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-[#e0e8e0] bg-[#fbfdfb] p-4">
          <div className="flex min-w-0 items-center gap-3">
            {user?.image ? (
              <Image src={user.image} alt={displayName || "User"} width={48} height={48} className="h-12 w-12 shrink-0 rounded-xl object-cover" />
            ) : (
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-lg font-bold text-green-800">{displayInitial}</span>
            )}

            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold text-[#202b23]">{displayName}</h2>
              <p className="truncate text-xs text-gray-500">{displayEmail}</p>
            </div>
          </div>

          <button onClick={handleSignOut} type="button" className="flex shrink-0 items-center gap-1 rounded-lg border border-red-300 px-3 py-2 text-[11px] font-medium text-red-600 transition hover:bg-red-50">
            <FaSignOutAlt /> সাইন আউট
          </button>
        </div>

        <div className="mt-4 rounded-xl border border-[#e0e8e0] bg-[#fbfdfb] p-5 sm:p-7">
          <h2 className="text-base font-semibold text-[#202b23]">তথ্য</h2>

          <form onSubmit={handleUpdateButton} className="mt-6">
            <label htmlFor="name" className="mb-2 block text-xs font-semibold text-[#202b23]">নাম</label>

            <input id="name" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="h-9 w-full rounded-lg border border-[#e0e8e0] bg-transparent px-3 text-xs outline-none focus:border-green-600" />

            <button type="submit" disabled={!hasNameChanged || !name.trim()} className="mt-3 h-9 w-full rounded-lg bg-green-700 text-xs font-semibold text-white shadow-md transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50">
              আপডেট করুন
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage