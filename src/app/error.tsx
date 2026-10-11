"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container empty">
      <h1>তথ্য লোড করা যায়নি</h1>
      <p>নেটওয়ার্ক অথবা সার্ভারে সমস্যা হয়েছে। একটু পরে আবার চেষ্টা করুন।</p>
      <button className="button" onClick={reset}>
        আবার চেষ্টা করুন
      </button>
    </div>
  );
}
