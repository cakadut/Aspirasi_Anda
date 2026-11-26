"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function TrackingPage() {
  const [ticket, setTicket] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!ticket) return;

    setLoading(true);

    const { data, error } = await supabase
      .from("aspirations")
      .select("*")
      .eq("ticket_no", ticket)
      .single();

    if (error) {
      setResult(null);
    } else {
      setResult(data);
    }

    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "BARU":
        return "bg-blue-600";
      case "DIPROSES":
        return "bg-yellow-500";
      case "SELESAI":
        return "bg-green-600";
      case "DITOLAK":
        return "bg-red-600";
      default:
        return "bg-slate-600";
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            🎫 Tracking Aspirasi
          </h1>

          <p className="text-slate-400">
            Masukkan nomor tiket untuk melihat perkembangan aspirasi Anda.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-3">
            <input
              value={ticket}
              onChange={(e) => setTicket(e.target.value)}
              placeholder="Contoh: 20261123-927455"
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-500"
            />

            <button
              onClick={handleSearch}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 rounded-xl font-bold hover:opacity-90 transition"
            >
              {loading ? "Mencari..." : "🔍 Cari Tiket"}
            </button>
          </div>

          {!loading && ticket && !result && (
            <div className="mt-6 bg-red-500/10 border border-red-500/30 text-red-300 rounded-xl p-4">
              Nomor tiket tidak ditemukan.
            </div>
          )}

          {result && (
            <div className="mt-8">
              <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div>
                    <p className="text-slate-400 text-sm">
                      Nomor Tiket
                    </p>

                    <h2 className="text-2xl font-bold text-cyan-400">
                      {result.ticket_no}
                    </h2>
                  </div>

                  <span
                    className={`${getStatusColor(
                      result.status
                    )} px-5 py-2 rounded-full font-bold`}
                  >
                    {result.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-slate-400 text-sm">
                      Nama Pengirim
                    </p>

                    <p className="font-semibold">
                      {result.show_name
                        ? result.nama
                        : "Anonim"}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-400 text-sm">
                      Jurusan
                    </p>

                    <p>{result.jurusan}</p>
                  </div>

                  <div>
                    <p className="text-slate-400 text-sm">
                      Kategori
                    </p>

                    <p>{result.kategori}</p>
                  </div>

                  <div>
                    <p className="text-slate-400 text-sm">
                      Tanggal Pengiriman
                    </p>

                    <p>
                      {new Date(
                        result.created_at
                      ).toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-slate-400 text-sm mb-2">
                    Judul Aspirasi
                  </p>

                  <p className="font-semibold text-lg">
                    {result.judul}
                  </p>
                </div>

                <div className="mt-6">
                  <p className="text-slate-400 text-sm mb-2">
                    Isi Aspirasi
                  </p>

                  <div className="bg-slate-900 rounded-xl p-4 border border-slate-700 whitespace-pre-wrap">
                    {result.isi_aspirasi}
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-slate-400 text-sm mb-2">
                    Catatan Admin
                  </p>

                  <div className="bg-slate-900 rounded-xl p-4 border border-slate-700">
                    {result.admin_note ||
                      "Belum ada catatan dari admin."}
                  </div>
                </div>

                <div className="mt-8 grid md:grid-cols-4 gap-3">
                  <div className="bg-blue-600/20 border border-blue-600/30 rounded-xl p-3 text-center">
                    BARU
                  </div>

                  <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-3 text-center">
                    DIPROSES
                  </div>

                  <div className="bg-green-600/20 border border-green-600/30 rounded-xl p-3 text-center">
                    SELESAI
                  </div>

                  <div className="bg-red-600/20 border border-red-600/30 rounded-xl p-3 text-center">
                    DITOLAK
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}