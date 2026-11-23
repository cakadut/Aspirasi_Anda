"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (
      username === "admin" &&
      password === "qwerty@123"
    ) {
      sessionStorage.setItem(
        "admin_logged_in",
        "true"
      );

      router.push("/admin/dashboard");
    } else {
      alert("Username atau Password salah");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6">
          Login Admin
        </h1>

        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          className="w-full border p-3 rounded mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={login}
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          Login
        </button>

      </div>
    </main>
  );
}