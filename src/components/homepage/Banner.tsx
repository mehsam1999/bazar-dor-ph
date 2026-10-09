import BannerImg from "@/assets/bazar-hero.png"
import Link from "next/link";
import Image from "next/image";

export default function Banner() {
    return (
        <section className="mx-auto my-4 flex w-full max-w-6xl flex-col items-center justify-between gap-6 rounded-3xl border border-gray-200 bg-base-100 p-5 sm:flex-row sm:px-8 sm:py-7">
        <div className="flex-1">
            <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-[11px] font-bold text-green-700">শুক্রবার, ০৯ অক্টোবর, ২০২৬</span>
            <h1 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">আজকের বাজারের দাম এক নজরে</h1>
            <p className="text-center text-xs leading-6 text-gray-500 sm:text-sm md:text-left md:text-base">চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-<br className="hidden sm:block" />সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
            <Link href="/products" className="mt-5 inline-block rounded-lg bg-green-700 px-5 py-2.5 text-xs font-semibold text-white shadow-md transition hover:bg-green-800">সব পণ্য দেখুন</Link>
        </div>
        <div className="flex w-full justify-center sm:w-56 sm:shrink-0">
            <Image src={BannerImg} alt="banner" width={208} height={176} className="h-40 w-48 object-contain sm:h-44 sm:w-52" priority />
        </div>
        </section>
    );
}
