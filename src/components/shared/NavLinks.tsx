import Link from "next/link";
interface INavLinks{
    id: string
    slug: string
    nameBn: string
    icon: string
}

const NavLinks = async () => {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/categories")
    const data = await res.json()
    // console.log(data)
    const navs: INavLinks[] = data
    // console.log(navs)
    return (
        <div className="flex flex-wrap items-center gap-4">
            {navs.map((n, i) => (
                <Link key={i} href={`/products/${n.slug}`} className="flex items-center gap-2 whitespace-nowrap text-sm font-medium text-gray-700 transition hover:text-green-700">
                    <span>{n.icon}</span>
                    <span>{n.nameBn}</span>
                </Link>
            ))}
        </div>
    );
};

export default NavLinks;