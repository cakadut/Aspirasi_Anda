"use client";

import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      username === "admin" &&
      password === "qwerty@123"
    ) {
      window.location.href = "/admin/dashboard";
      return;
    }

    alert("Username atau Password salah");
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
                Username
              </label>

              <input
                type="text"
                placeholder="Masukkan Username"
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
                type="password"
                placeholder="Masukkan Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 py-4 rounded-xl font-bold text-white hover:opacity-90 transition"
            >
              🚀 Login
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            Username : admin
            <br />
            Password : qwerty@123
          </div>
        </div>
      </div>
    </main>
  );
}