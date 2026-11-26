"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [aspirasi, setAspirasi] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);

    const { data, error } = await supabase
      .from("aspirations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    }

    setAspirasi(data || []);
    setLoading(false);
  }

  function statusColor(status: string) {
    switch ((status || "").toUpperCase()) {
      case "SELESAI":
        return "bg-green-600";
      case "DIPROSES":
        return "bg-yellow-500";
      case "DITOLAK":
        return "bg-red-600";
      case "MENUNGGU_KLARIFIKASI":
        return "bg-orange-600";
      default:
        return "bg-blue-600";
    }
  }

  const total = aspirasi.length;

  const baru = aspirasi.filter(
    (x) => (x.status || "").toUpperCase() === "BARU"
  ).length;

  const diproses = aspirasi.filter(
    (x) => (x.status || "").toUpperCase() === "DIPROSES"
  ).length;

  const selesai = aspirasi.filter(
    (x) => (x.status || "").toUpperCase() === "SELESAI"
  ).length;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">
              Dashboard Admin
            </h1>
            <p className="text-slate-400 mt-2">
              Kelola Aspirasi Mahasiswa Fakultas Teknik UI
            </p>
          </div>

          <button
            onClick={loadData}
            className="bg-cyan-600 hover:bg-cyan-500 px-5 py-3 rounded-xl font-semibold"
          >
            Refresh
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="text-slate-400">
              Total Aspirasi
            </div>
            <div className="text-4xl font-bold text-cyan-400 mt-2">
              {total}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="text-slate-400">
              Status Baru
            </div>
            <div className="text-4xl font-bold text-blue-400 mt-2">
              {baru}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="text-slate-400">
              Diproses
            </div>
            <div className="text-4xl font-bold text-yellow-400 mt-2">
              {diproses}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="text-slate-400">
              Selesai
            </div>
            <div className="text-4xl font-bold text-green-400 mt-2">
              {selesai}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="bg-slate-900 rounded-2xl p-6">
            Memuat data...
          </div>
        ) : aspirasi.length === 0 ? (
          <div className="bg-slate-900 rounded-2xl p-6">
            Belum ada aspirasi yang ditampilkan.
          </div>
        ) : (
          <div className="grid gap-5">
            {aspirasi.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
              >
                <div className="flex flex-col md:flex-row md:justify-between gap-4">

                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold">
                      {item.judul}
                    </h2>

                    <p className="text-cyan-400 mt-2">
                      {item.ticket_no}
                    </p>

                    <p className="text-slate-400 mt-2">
                      {item.show_name
                        ? item.nama
                        : "Anonim"}
                    </p>

                    <p className="text-slate-500">
                      {item.jurusan}
                    </p>

                    <div className="mt-4 bg-slate-800 rounded-xl p-4">
                      {item.isi_aspirasi}
                    </div>

                    {item.admin_note && (
                      <div className="mt-4 bg-slate-700 rounded-xl p-4">
                        <div className="font-semibold mb-2">
                          Catatan Admin
                        </div>
                        {item.admin_note}
                      </div>
                    )}
                  </div>

                  <div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm text-white ${statusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}