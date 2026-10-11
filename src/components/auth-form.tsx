"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
export default function AuthForm({
  signup = false,
  protectedRedirect = false,
  oauthError = false,
}: {
  signup?: boolean;
  protectedRedirect?: boolean;
  oauthError?: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (protectedRedirect)
      toast.error("বিস্তারিত দেখতে আগে সাইন ইন করুন", { id: "protected" });
    if (oauthError)
      toast.error("সোশ্যাল লগইন সফল হয়নি। আবার চেষ্টা করুন।", {
        id: "oauth-error",
      });
  }, [protectedRedirect, oauthError]);
  const fail = (message: string) => {
    setError(message);
    toast.error(message);
  };
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const email = String(f.get("email") || "").trim();
    const password = String(f.get("password") || "");
    if (signup && name.length < 2) return fail("নাম অন্তত ২ অক্ষরের হতে হবে");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return fail("সঠিক ইমেইল লিখুন");
    if (password.length < 8) return fail("পাসওয়ার্ড অন্তত ৮ অক্ষরের হতে হবে");
    if (signup && password !== f.get("confirm"))
      return fail("পাসওয়ার্ড দুটি মিলছে না");
    setBusy(true);
    try {
      const result = signup
        ? await authClient.signUp.email({ name, email, password })
        : await authClient.signIn.email({ email, password });
      if (result.error)
        throw new Error(result.error.message || "আবার চেষ্টা করুন");
      toast.success(
        signup
          ? "অ্যাকাউন্ট তৈরি হয়েছে। সাইন ইন করুন।"
          : "সফলভাবে সাইন ইন হয়েছে",
      );
      router.push(signup ? "/signin" : "/");
      router.refresh();
    } catch (err) {
      fail(err instanceof Error ? err.message : "সংযোগে সমস্যা হয়েছে");
    } finally {
      setBusy(false);
    }
  }
  async function social(provider: "google" | "github") {
    setBusy(true);
    setError("");
    try {
      const r = await authClient.signIn.social({
        provider,
        callbackURL: "/?login=success",
        errorCallbackURL: "/signin?error=oauth",
      });
      if (r.error) throw new Error(r.error.message);
    } catch (err) {
      fail(err instanceof Error ? err.message : "সোশ্যাল লগইন করা যায়নি");
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="auth-page">
      <h1>{signup ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন করুন"}</h1>
      <p className="muted">
        {signup
          ? "বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
          : "আপনার অ্যাকাউন্টে প্রবেশ করে বাজারের বিস্তারিত দাম দেখুন।"}
      </p>
      <div className="panel auth-panel">
        <form onSubmit={submit} noValidate>
          {signup && (
            <label>
              নাম
              <input
                name="name"
                autoComplete="name"
                placeholder="যেমন: রহিম উদ্দিন"
                maxLength={100}
                required
              />
            </label>
          )}
          <label>
            ইমেইল
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
            />
          </label>
          <label>
            পাসওয়ার্ড
            <input
              name="password"
              type="password"
              autoComplete={signup ? "new-password" : "current-password"}
              placeholder="কমপক্ষে ৮ অক্ষর"
              minLength={8}
              required
            />
          </label>
          {signup && (
            <label>
              পাসওয়ার্ড নিশ্চিত করুন
              <input
                name="confirm"
                type="password"
                autoComplete="new-password"
                placeholder="আবার লিখুন"
                required
              />
            </label>
          )}
          {error && (
            <p role="alert" className="form-error">
              {error}
            </p>
          )}
          <button className="button full" disabled={busy}>
            {busy
              ? "অপেক্ষা করুন…"
              : signup
                ? "অ্যাকাউন্ট তৈরি করুন"
                : "সাইন ইন"}
          </button>
        </form>
        <div className="divider">অথবা</div>
        <div className="social-buttons">
          <button disabled={busy} onClick={() => social("google")}>
            <span className="google">G</span> Google দিয়ে চালিয়ে যান
          </button>
          <button disabled={busy} onClick={() => social("github")}>
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.3c-3.4.7-4.1-1.4-4.1-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.9 2.9 1.4 3.6 1.1.1-.8.4-1.4.8-1.7-2.7-.3-5.5-1.4-5.5-6a4.7 4.7 0 0 1 1.2-3.2c-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 3 .1 3.3a4.7 4.7 0 0 1 1.2 3.2c0 4.6-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.5c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
            </svg>{" "}
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>
        <p className="auth-switch">
          {signup ? "অ্যাকাউন্ট আছে?" : "অ্যাকাউন্ট নেই?"}{" "}
          <Link href={signup ? "/signin" : "/signup"}>
            {signup ? "সাইন ইন করুন" : "সাইন আপ করুন"}
          </Link>
        </p>
      </div>
      <Link className="back-link" href="/">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
