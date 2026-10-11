"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
export default function Profile({
  user,
  edit = false,
}: {
  user: { name: string; email: string };
  edit?: boolean;
}) {
  const router = useRouter();
  const [name, setName] = useState(user.name);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function logout() {
    setBusy(true);
    try {
      const r = await authClient.signOut();
      if (r.error) throw new Error(r.error.message);
      toast.success("সাইন আউট হয়েছে");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করা যায়নি");
    } finally {
      setBusy(false);
    }
  }
  async function update(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (name.trim().length < 2) {
      setError("নাম অন্তত ২ অক্ষরের হতে হবে");
      toast.error("সঠিক নাম লিখুন");
      return;
    }
    setBusy(true);
    try {
      const r = await authClient.updateUser({ name: name.trim() });
      if (r.error) throw new Error(r.error.message);
      toast.success("তথ্য আপডেট হয়েছে");
      router.push("/profile");
      router.refresh();
    } catch (err) {
      const m = err instanceof Error ? err.message : "আপডেট করা যায়নি";
      setError(m);
      toast.error(m);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="profile-page">
      <h1>{edit ? "তথ্য আপডেট করুন" : "আমার প্রোফাইল"}</h1>
      <p className="muted">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      <section className="panel profile-summary">
        <span className="avatar profile-avatar">{user.name.slice(0, 1)}</span>
        <div>
          <h2>{user.name}</h2>
          <p className="muted">{user.email}</p>
        </div>
        <button className="outline-danger" disabled={busy} onClick={logout}>
          ↪ সাইন আউট
        </button>
      </section>
      <section className="panel profile-info">
        <h2>তথ্য</h2>
        {edit ? (
          <form onSubmit={update}>
            <label>
              নাম
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
                autoComplete="name"
                required
              />
            </label>
            {error && (
              <p role="alert" className="form-error">
                {error}
              </p>
            )}
            <button className="button full" disabled={busy}>
              {busy ? "আপডেট হচ্ছে…" : "Update Information — আপডেট করুন"}
            </button>
            <Link className="back-link" href="/profile">
              ফিরে যান
            </Link>
          </form>
        ) : (
          <>
            <dl>
              <dt>নাম</dt>
              <dd>{user.name}</dd>
              <dt>ইমেইল</dt>
              <dd>{user.email}</dd>
            </dl>
            <Link className="button full" href="/profile/update">
              তথ্য আপডেট করুন
            </Link>
          </>
        )}
      </section>
    </div>
  );
}
