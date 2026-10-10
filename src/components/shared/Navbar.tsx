import Logo from "@/assets/logo-icon.png";
import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import UserInfo from "./UserInfo";


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
                    <UserInfo></UserInfo>

                </div>
            </nav>
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
                <NavLinks />
            </div>
        </div>
        
    );
}
