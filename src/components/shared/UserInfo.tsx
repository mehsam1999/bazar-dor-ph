"use client"
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaChevronDown, FaSignOutAlt, FaUser } from "react-icons/fa";

const UserInfo = () => {
    const {data: session} = authClient.useSession()
    const user = session?.user
    // console.log(user)
    const handleSignOut = async() =>{
        await authClient.signOut();
        toast.success("সফলভাবে সাইন আউট করেছেন!")
    }
    
    return (
        
        <div>
            {
                user? 
                <div className="dropdown dropdown-end">
                    <div
                    tabIndex={0}
                    role="button"
                    className="flex items-center gap-2 rounded-2xl p-1 pr-2 transition hover:bg-green-50"
                    >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-green-700 bg-green-100 text-base font-bold text-green-800">
                            {user.name?.charAt(0).toUpperCase() || "U"}
                        </span>

                        <span className="hidden max-w-32 truncate text-sm font-semibold text-gray-800 sm:block">
                            {user.name}
                        </span>

                        <FaChevronDown className="text-xs text-gray-500" />
                    </div>

                    <ul
                    tabIndex={0}
                    className="dropdown-content menu z-50 mt-3 w-64 rounded-2xl border border-gray-200 bg-base-100 p-2 shadow-xl"
                    >
                    <li className="pointer-events-none mb-1 border-b border-gray-100 px-3 py-3">
                        <div className="flex items-center gap-3">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-green-700 bg-green-100 text-lg font-bold text-green-800">
                            {user.name?.charAt(0).toUpperCase() || "U"}
                        </span>

                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-gray-800">
                            {user.name}
                            </p>
                            <p className="truncate text-xs text-gray-500">
                            {user.email}
                            </p>
                        </div>
                        </div>
                    </li>

                    <li>
                        <Link href="/profile" className="rounded-xl py-3">
                        <FaUser className="text-gray-500" />
                        আমার প্রোফাইল
                        </Link>
                    </li>

                    <li>
                        <button
                        onClick={handleSignOut}
                        className="rounded-xl py-3 text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                        <FaSignOutAlt />
                        সাইন আউট
                        </button>
                    </li>
                    </ul>
                </div>
                    :
                <div className="flex items-center gap-3 sm:gap-6">
                    <Link href="/signin" className="whitespace-nowrap text-xs font-medium text-gray-800 transition hover:text-green-700 sm:text-sm">সাইন ইন</Link>

                    <Link href="/signup" className="whitespace-nowrap rounded-lg bg-green-700 px-3 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-green-800 sm:px-5 sm:py-2.5 sm:text-sm">সাইন আপ</Link>
                </div>
            }

        </div>
    );
};

export default UserInfo;