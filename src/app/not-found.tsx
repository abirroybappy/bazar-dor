import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container empty">
      <span className="empty-icon">🛒</span>
      <p className="muted">৪০৪</p>
      <h1>পৃষ্ঠাটি খুঁজে পাওয়া যায়নি</h1>
      <p>এই পণ্য, বিভাগ অথবা পৃষ্ঠাটি এখন উপলব্ধ নেই।</p>
      <Link href="/" className="button">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
