"use client";

import { useEffect } from "react";

export default function AdminPage() {
  useEffect(() => {
    window.location.href = "/admin/login";
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
      <div className="text-center">
        <div className="text-5xl mb-4">🔐</div>
        <h1 className="text-3xl font-bold mb-2">
          Mengalihkan ke Login Admin...
        </h1>
        <p className="text-slate-400">
          Mohon tunggu sebentar.
        </p>
      </div>
    </main>
  );
}