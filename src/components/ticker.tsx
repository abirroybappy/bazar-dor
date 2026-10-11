import { getProducts, unitName } from "@/lib/data";
import { bn } from "@/lib/numbers.mjs";
import Link from "next/link";
export default async function Ticker() {
  const products = (await getProducts().catch(() => [])).slice(0, 10);
  if (!products.length)
    return (
      <div className="ticker text-center">
        বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে
      </div>
    );
  return (
    <div className="ticker" aria-label="আজকের বাজার দর">
      <div className="ticker-track">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="ticker-group"
            aria-hidden={copy === 1 ? true : undefined}
          >
            {products.map((p) => (
              <Link
                tabIndex={copy === 1 ? -1 : 0}
                href={`/product/${p.slug}`}
                key={p.id}
              >
                {p.image} {p.nameBn} {bn(p.today)} টাকা/{unitName(p.unit)}{" "}
                <b className={p.change.dir}>
                  {p.change.dir === "up"
                    ? "▲"
                    : p.change.dir === "down"
                      ? "▼"
                      : "—"}{" "}
                  {bn(Math.abs(p.change.pct), 1)}%
                </b>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
