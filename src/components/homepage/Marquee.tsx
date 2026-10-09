import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
interface IProducts {
    id: number;
    nameBn: string;
    today: number;
    unit: string;
    image: string;
    change: {
        dir: "up" | "down" | "flat";
        pct: number;
    };
}
const Marquee = async () => {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
    const products:IProducts[] = await res.json();

    return (
        <div className="overflow-hidden border-y border-gray-200 bg-base-100">
                <MarqueeText direction="right" duration={10}>
                    {products.slice(0, 10).map((p) => (
                        <span key={p.id} className="inline-flex items-center gap-3 border-r border-gray-200 px-5 py-3 text-base-content whitespace-nowrap">
                            <span>{p.image}</span>
                            <span>{p.nameBn}</span>
                            <span className="text-gray-500">{p.today.toLocaleString("bn-BD")} টাকা/{p.unit === "kg" ? "কেজি" : "লিটার"}</span>
                            <span className={`font-bold ${p.change.dir === "up" ? "text-red-600" : p.change.dir === "down" ? "text-green-600" : "text-gray-500"}`}>
                                {p.change.dir === "up" ? "▲" : p.change.dir === "down" ? "▼" : "—"} {Math.abs(p.change.pct)}%
                            </span>
                        </span>
                    ))}
                </MarqueeText>
            </div>
    );
};

export default Marquee;
