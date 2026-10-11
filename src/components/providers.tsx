"use client";
import { Toaster } from "react-hot-toast";
export default function Providers() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{ duration: 3500, style: { fontFamily: "inherit" } }}
    />
  );
}
