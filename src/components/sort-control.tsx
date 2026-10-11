"use client";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
export default function SortControl({ value }: { value: string }) {
  const router = useRouter();
  const path = usePathname();
  const [pending, start] = useTransition();
  return (
    <label className="sort-label">
      সাজান{" "}
      <select
        aria-label="দাম অনুযায়ী সাজান"
        value={["asc", "desc"].includes(value) ? value : "default"}
        disabled={pending}
        onChange={(e) =>
          start(() =>
            router.push(`${path}?sort=${e.target.value}`, { scroll: false }),
          )
        }
      >
        <option value="default">ডিফল্ট</option>
        <option value="asc">দাম: কম থেকে বেশি</option>
        <option value="desc">দাম: বেশি থেকে কম</option>
      </select>
      {pending && <small role="status">সাজানো হচ্ছে…</small>}
    </label>
  );
}
