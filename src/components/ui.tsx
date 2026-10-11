import Link from "next/link";
import { bn } from "@/lib/numbers.mjs";
import { Product, unitName } from "@/lib/data";
export function Badge({ product: p }: { product: Product }) {
  return (
    <span className={`badge ${p.change.dir}`}>
      {p.change.dir === "up" ? "▲" : p.change.dir === "down" ? "▼" : "—"}{" "}
      {bn(Math.abs(p.change.pct), 1)}%
    </span>
  );
}
export function ProductCard({ product: p }: { product: Product }) {
  return (
    <Link className="product-card panel" href={`/product/${p.slug}`}>
      <div className="card-top">
        <span className="emoji">{p.image}</span>
        <div>
          <h3>{p.nameBn}</h3>
          <small>প্রতি {unitName(p.unit)}</small>
        </div>
      </div>
      <div className="card-bottom">
        <div>
          <small>আজকের দাম</small>
          <div>
            <strong className="price">{bn(p.today)}</strong> টাকা
          </div>
        </div>
        <Badge product={p} />
      </div>
    </Link>
  );
}
export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
export function Skeleton() {
  return (
    <div
      className="container page"
      aria-busy="true"
      aria-label="তথ্য লোড হচ্ছে"
    >
      <div className="skeleton h-28 mb-6" />
      <div className="product-grid">
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i} className="skeleton h-36" />
        ))}
      </div>
      <span className="sr-only">তথ্য লোড হচ্ছে…</span>
    </div>
  );
}
