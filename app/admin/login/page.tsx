"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: username.trim(), password });
      if (error) { alert("Email atau password salah"); return; }
      const check = await supabase.rpc("admin_list_aspirations_v2");
      if (check.error) { await supabase.auth.signOut(); alert("Akses admin tidak diizinkan"); return; }
      window.location.href = "/admin/dashboard";
    } finally { setBusy(false); }
  };

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">

          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🔐</div>

            <h1 className="text-4xl font-bold text-white">
              Login Admin
            </h1>

            <p className="text-slate-400 mt-3">
              AspirasiAnda Administrator Panel
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">

            <div>
              <label className="block mb-2 text-slate-300">
                Email
              </label>

              <input
                type="email"
                placeholder="Masukkan Email"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                className="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl text-white"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-slate-300">
                Password
              </label>

              <input
                type={visible ? "text" : "password"}
                placeholder="Masukkan Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl text-white"
                required
              />
            </div>

            <button type="button" onClick={() => setVisible(!visible)} className="text-cyan-400">{visible ? "Sembunyikan password" : "Tampilkan password"}</button>
            <button
              disabled={busy}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 py-4 rounded-xl font-bold text-white hover:opacity-90 transition"
            >
              🚀 Login
            </button>
          </form>


        </div>
      </div>
    </main>
  );
}