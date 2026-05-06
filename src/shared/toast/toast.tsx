// components/GlobalToaster.tsx
"use client";

import { Toaster } from "react-hot-toast";

export default function GlobalToaster() {
  return (
    <Toaster
      position="top-left"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#f0fdf4",
          color: "#166534",
          fontWeight: "bold",
          borderRadius: "12px",
          padding: "12px 20px",
          fontSize: "14px",
        },
        success: {
          style: {
            background: "#f0fdf4",
            color: "#166534",
            border: "1px solid #bbf7d0",
          },
          iconTheme: {
            primary: "#22c55e",
            secondary: "#f0fdf4",
          },
        },
        error: {
          style: {
            background: "#fef2f2",
            color: "#991b1b",
            border: "1px solid #fecaca",
            borderRadius: "12px",
            padding: "12px 20px",
            fontSize: "14px",
            fontWeight: "bold",
          },
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fef2f2",
          },
          duration: 5000,
        },
      }}
    />
  );
}
