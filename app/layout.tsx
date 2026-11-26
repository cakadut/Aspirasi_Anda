import "./globals.css";
import PwaRegister from "./pwa-register";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = {
  title: "AspirasiAnda",
  icons: { apple: "/icon-192" },
  appleWebApp: { capable: true, title: "AspirasiAnda" },
  description:
    "Sistem Aspirasi Mahasiswa Fakultas Teknik",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-slate-950 text-white">
        <PwaRegister />
        {/* NAVBAR */}
        <nav className="sticky top-0 z-50 backdrop-blur-lg bg-slate-950/90 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 py-4">
              <Link
                href="/"
                className="flex items-center gap-2 font-bold text-xl"
              >
                <span className="text-cyan-400 text-2xl">🎓</span>

                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  AspirasiAnda
                </span>
              </Link>

              <div className="campus-nav flex flex-wrap items-center justify-center gap-2">
                <Link
                  href="/"
                  className="px-4 py-2 rounded-xl hover:bg-slate-800 transition"
                >
                  Beranda
                </Link>

                <Link
                  href="/submit"
                  className="px-4 py-2 rounded-xl hover:bg-slate-800 transition"
                >
                  Kirim Aspirasi
                </Link>

                <Link
                  href="/tracking"
                  className="px-4 py-2 rounded-xl hover:bg-slate-800 transition"
                >
                  Tracking
                </Link>

                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-xl hover:bg-slate-800 transition"
                >
                  Dashboard
                </Link>

                <Link
                  href="/admin/login"
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 transition font-semibold"
                >
                  Admin
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* CONTENT */}
        <main>{children}</main>

        {/* FOOTER */}
        <footer className="mt-16 border-t border-slate-800 bg-slate-950">
          <div className="max-w-7xl mx-auto px-6 py-8 text-center">
            <h3 className="text-xl font-bold text-cyan-400 mb-2">
              AspirasiAnda
            </h3>

            <p className="text-slate-400">
              Sistem Aspirasi Mahasiswa Fakultas Teknik
            </p>

            <p className="text-slate-500 text-sm mt-3">
              Aspirasi • Kritik • Saran • Monitoring Aspirasi Mahasiswa
            </p>

            <p className="text-slate-600 text-sm mt-4">
              © 2026 Fakultas Teknik
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}