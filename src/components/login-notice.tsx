"use client";
import { useEffect } from "react";
import toast from "react-hot-toast";
export default function LoginNotice() {
  useEffect(() => {
    const u = new URL(window.location.href);
    if (u.searchParams.get("login") === "success") {
      toast.success("সফলভাবে সাইন ইন হয়েছে", { id: "social-login" });
      u.searchParams.delete("login");
      window.history.replaceState(null, "", u.pathname + u.search + u.hash);
    }
  }, []);
  return null;
}
