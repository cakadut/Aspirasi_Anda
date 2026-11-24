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
      window.location.href = "/admin";
      return;
    }

    alert("Username atau password salah");
  };

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-6">

      <div className="w-full max-w-md">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white">
              🔐 Login Admin
            </h1>

            <p className="text-slate-400 mt-2">
              AspirasiAnda Administrator Panel
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            <div>
              <label className="block text-slate-300 mb-2">
                Username
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                placeholder="Masukkan Username"
                className="w-full bg-slate-800 border border-slate-700 text-white p-4 rounded-xl"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Masukkan Password"
                className="w-full bg-slate-800 border border-slate-700 text-white p-4 rounded-xl"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-4 rounded-xl shadow-xl hover:scale-[1.02] transition"
            >
              🚀 Login
            </button>

          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            Default Username: admin
            <br />
            Default Password: qwerty@123
          </div>

        </div>

      </div>

    </main>
  );
}