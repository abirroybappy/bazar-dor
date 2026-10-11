"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import categories from "@/lib/categories.json";
export default function Header({ date }: { date: string }) {
  const { data: session, isPending } = authClient.useSession();
  const path = usePathname();
  const router = useRouter();
  async function logout() {
    try {
      const r = await authClient.signOut();
      if (r.error) throw new Error(r.error.message);
      toast.success("সাইন আউট হয়েছে");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করা যায়নি");
    }
  }
  return (
    <header>
      <div className="container header-top">
        <Link href="/" className="brand">
          <span className="logo">
            <Image src="/logo-icon.png" width={26} height={26} alt="" />
          </span>
          <div>
            <strong>বাজার দর</strong>
            <small>{date}</small>
          </div>
        </Link>
        {isPending ? (
          <div className="skeleton w-28 h-10" />
        ) : session ? (
          <details className="user-menu" key={path}>
            <summary>
              <span className="avatar">{session.user.name?.slice(0, 1)}</span>
              {session.user.name}
              <span className="chevron">⌄</span>
            </summary>
            <div className="menu panel">
              <strong>{session.user.name}</strong>
              <small>{session.user.email}</small>
              <Link href="/profile">👤 আমার প্রোফাইল</Link>
              <button className="text-red" onClick={logout}>
                ↪ সাইন আউট
              </button>
            </div>
          </details>
        ) : (
          <div className="auth-links">
            <Link href="/signin">সাইন ইন</Link>
            <Link className="button" href="/signup">
              সাইন আপ
            </Link>
          </div>
        )}
      </div>
      <nav aria-label="পণ্যের বিভাগ">
        <div className="container nav-links">
          {categories.map((c) => (
            <Link
              key={c.slug}
              className={path === `/category/${c.slug}` ? "active" : ""}
              href={`/category/${c.slug}`}
            >
              {c.icon} {c.nameBn}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
