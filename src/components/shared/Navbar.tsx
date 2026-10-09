import Logo from "@/assets/logo-icon.png";
import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";


export default function Navbar() {
    const date = new Date().toLocaleDateString("bn-BD", {dateStyle: "full"})
    return (
        <div>
            <nav className="w-full border-b border-gray-100">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-700 text-white">
                            <Image src={Logo} alt="Logo"></Image>
                            {/* <p>🛒</p> */}
                        </div>

                        <div>
                            <h1 className="font-bold leading-5 sm:text-lg">বাজার দর</h1>
                            <p className="text-[10px] text-gray-800 sm:text-xs">{date}</p>
                        </div>
                    </Link>
                    <div className="flex items-center gap-3 sm:gap-6">
                    <Link href="/login" className="whitespace-nowrap text-xs font-medium text-gray-800 transition hover:text-green-700 sm:text-sm">সাইন ইন</Link>

                    <Link href="/register" className="whitespace-nowrap rounded-lg bg-green-700 px-3 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-green-800 sm:px-5 sm:py-2.5 sm:text-sm">সাইন আপ</Link>
                    </div>

                </div>
            </nav>
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <NavLinks />
            </div>
        </div>
        
    );
}
