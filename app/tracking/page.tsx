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
      alert("Nomor tiket tidak ditemukan");
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
    <main className="min-h-screen bg-slate-950 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">
            🎫 Tracking Tiket Aspirasi
          </h1>

          <p className="text-slate-400 mt-2">
            Masukkan nomor tiket untuk melihat perkembangan aspirasi Anda.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">

          <div className="flex flex-col md:flex-row gap-3">

            <input
              value={ticket}
              onChange={(e) => setTicket(e.target.value)}
              placeholder="Contoh: 20261124-123456"
              className="flex-1 bg-slate-800 border border-slate-700 text-white p-4 rounded-xl"
            />

            <button
              onClick={handleSearch}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition"
            >
              {loading ? "Mencari..." : "🔍 Cari"}
            </button>

          </div>

          {result && (
            <div className="mt-8 bg-slate-800 border border-slate-700 rounded-2xl p-6">

              <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Detail Aspirasi
                </h2>

                <span
                  className={`${getStatusColor(
                    result.status
                  )} text-white px-4 py-2 rounded-full text-sm font-bold`}
                >
                  {result.status}
                </span>
              </div>

              <div className="space-y-4">

                <div>
                  <div className="text-slate-400 text-sm">
                    Nomor Tiket
                  </div>
                  <div className="text-white font-semibold">
                    {result.ticket_no}
                  </div>
                </div>

                <div>
                  <div className="text-slate-400 text-sm">
                    Nama
                  </div>
                  <div className="text-white">
                    {result.show_name
                      ? result.nama
                      : "Anonim"}
                  </div>
                </div>

                <div>
                  <div className="text-slate-400 text-sm">
                    Jurusan
                  </div>
                  <div className="text-white">
                    {result.jurusan}
                  </div>
                </div>

                <div>
                  <div className="text-slate-400 text-sm">
                    Judul Aspirasi
                  </div>
                  <div className="text-white">
                    {result.judul}
                  </div>
                </div>

                <div>
                  <div className="text-slate-400 text-sm">
                    Isi Aspirasi
                  </div>
                  <div className="text-white whitespace-pre-wrap">
                    {result.isi_aspirasi}
                  </div>
                </div>

                <div>
                  <div className="text-slate-400 text-sm">
                    Tanggal Pengiriman
                  </div>
                  <div className="text-white">
                    {new Date(
                      result.created_at
                    ).toLocaleString("id-ID")}
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