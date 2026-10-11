import Image from "next/image";
import LoginNotice from "@/components/login-notice";
import { getProducts } from "@/lib/data";
import { bn } from "@/lib/numbers.mjs";
import { ProductGrid } from "@/components/ui";
export const dynamic = "force-dynamic";
export default async function Home() {
  const products = await getProducts();
  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);
  const date = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());
  return (
    <div className="container page">
      <LoginNotice />
      <section className="hero panel">
        <div>
          <span className="eyebrow">{date}</span>
          <h1>আজকের বাজারের দাম এক নজরে</h1>
          <p>
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a href="#সব-পণ্য" className="button">
            সব পণ্য দেখুন
          </a>
        </div>
        <Image
          src="/bazar-hero.png"
          width={310}
          height={260}
          priority
          alt="তাজা ফল ও সবজির ঝুড়ি"
        />
      </section>
      <section className="product-section">
        <h2>
          <span className="up">▲</span> আজ দাম বেড়েছে
        </h2>
        <ProductGrid products={risers} />
      </section>
      <section className="product-section">
        <h2>
          <span className="down">▼</span> আজ দাম কমেছে
        </h2>
        <ProductGrid products={fallers} />
      </section>
      <section id="সব-পণ্য" className="product-section">
        <h2>সব পণ্য</h2>
        <p className="muted section-sub">
          মোট {bn(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>
        <ProductGrid products={products} />
        {!products.length && (
          <p className="panel p-6">এখন কোনো পণ্য পাওয়া যায়নি।</p>
        )}
      </section>
    </div>
  );
}
