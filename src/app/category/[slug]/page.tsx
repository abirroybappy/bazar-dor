import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategory, getProducts } from "@/lib/data";
import { bn, sortProducts } from "@/lib/numbers.mjs";
import { ProductGrid } from "@/components/ui";
import SortControl from "@/components/sort-control";
export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
}) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();
  const products = await getProducts(slug);
  const { sort = "default" } = await searchParams;
  return (
    <div className="container page category-page">
      <section className="panel category-heading">
        <span className="large-emoji">{category.icon}</span>
        <div>
          <h1>{category.nameBn}</h1>
          <p className="muted">
            {bn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </section>
      <div className="panel sort-bar">
        <SortControl value={sort} />
      </div>
      <p className="muted section-sub">
        মোট {bn(products.length)}টি পণ্য দেখানো হচ্ছে
      </p>
      <ProductGrid products={sortProducts(products, sort)} />
      {products.length === 0 && (
        <div className="empty">
          <h2>এই বিভাগে কোনো পণ্য নেই</h2>
          <Link className="button" href="/">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      )}
    </div>
  );
}
