import { notFound } from "next/navigation";
import Link from "next/link";
import { requireSession } from "@/lib/session";
import { getProduct, unitName } from "@/lib/data";
import { bn } from "@/lib/numbers.mjs";
import { Badge } from "@/components/ui";
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) notFound();
  await requireSession();
  const markets = [...p.markets].sort(
    (a, b) => a.min + a.max - (b.min + b.max),
  );
  const min = markets.length ? Math.min(...markets.map((m) => m.min)) : p.today;
  const max = markets.length ? Math.max(...markets.map((m) => m.max)) : p.today;
  const avg = markets.length
    ? markets.reduce((s, m) => s + (m.min + m.max) / 2, 0) / markets.length
    : p.today;
  return (
    <div className="container page detail-page">
      <div className="breadcrumbs">
        <Link href="/">হোম</Link> ›{" "}
        <Link href={`/category/${p.category}`}>{p.categoryNameBn}</Link> ›{" "}
        {p.nameBn}
      </div>
      <section className="panel summary">
        <span className="emoji big">{p.image}</span>
        <div className="summary-text">
          <h1>{p.nameBn}</h1>
          <p className="muted">
            প্রতি {unitName(p.unit)} ·{" "}
            <Link href={`/category/${p.category}`}>{p.categoryNameBn}</Link>
          </p>
          <p>
            গতকালের তুলনায় আজ দাম{" "}
            {p.change.dir === "up"
              ? "বেড়েছে"
              : p.change.dir === "down"
                ? "কমেছে"
                : "অপরিবর্তিত"}{" "}
            · {bn(Math.abs(p.today - p.yesterday))} টাকা
          </p>
        </div>
        <div className="today-box">
          <small>আজকের দাম</small>
          <strong>{bn(p.today)}</strong>
          <small>টাকা / {unitName(p.unit)}</small>
          <Badge product={p} />
        </div>
      </section>
      <section className="panel market-section">
        <h2>দামের সারসংক্ষেপ</h2>
        <div className="stats">
          <div className="panel">
            <small>সর্বনিম্ন দাম</small>
            <p className="down">
              <b>{bn(min)}</b> টাকা
            </p>
            <small>সবচেয়ে কম দামের বাজার</small>
          </div>
          <div className="panel">
            <small>সর্বাধিক দাম</small>
            <p className="up">
              <b>{bn(max)}</b> টাকা
            </p>
            <small>সবচেয়ে বেশি দামের বাজার</small>
          </div>
          <div className="panel">
            <small>গড় দাম</small>
            <p className="down">
              <b>{bn(avg, 2)}</b> টাকা
            </p>
            <small>বাজারগুলোর গড় দামের গড়</small>
          </div>
        </div>
        <h2>বাজারভিত্তিক আজকের দাম</h2>
        {markets.length ? (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  {["বাজার", "বিভাগ", "সর্বনিম্ন", "সর্বাধিক", "গড়"].map(
                    (t) => (
                      <th key={t}>{t}</th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {markets.map((m) => (
                  <tr key={`${m.market}-${m.division}`}>
                    <td>{m.market}</td>
                    <td>{m.division}</td>
                    <td>{bn(m.min)} টাকা</td>
                    <td>{bn(m.max)} টাকা</td>
                    <td>
                      <b>{bn((m.min + m.max) / 2, 2)} টাকা</b>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>বাজারভিত্তিক তথ্য পাওয়া যায়নি।</p>
        )}
      </section>
    </div>
  );
}
