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

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl p-8 shadow">

        <h1 className="text-3xl font-bold mb-6">
          Tracking Tiket Aspirasi
        </h1>

        <div className="flex gap-3">
          <input
            value={ticket}
            onChange={(e) => setTicket(e.target.value)}
            placeholder="Masukkan nomor tiket"
            className="flex-1 border p-3 rounded"
          />

          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 rounded"
          >
            {loading ? "Mencari..." : "Cari"}
          </button>
        </div>

        {result && (
          <div className="mt-8 border rounded p-6 bg-slate-50">
            <h2 className="text-xl font-bold mb-4">
              Detail Aspirasi
            </h2>

            <p>
              <b>No Tiket:</b> {result.ticket_no}
            </p>

            <p>
              <b>Nama:</b> {result.nama}
            </p>

            <p>
              <b>Jurusan:</b> {result.jurusan}
            </p>

            <p>
              <b>Judul:</b> {result.judul}
            </p>

            <p>
              <b>Status:</b> {result.status}
            </p>

            <p>
              <b>Tanggal:</b>{" "}
              {new Date(result.created_at).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}