"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data } = await supabase
      .from("aspirations")
      .select("*")
      .eq("is_public", true)
      .order("created_at", { ascending: false });

    setData(data || []);
    setLoading(false);
  }

  const total = data.length;
  const baru = data.filter((x) => x.status === "BARU").length;
  const proses = data.filter((x) => x.status === "DIPROSES").length;
  const selesai = data.filter((x) => x.status === "SELESAI").length;

  const badgeColor = (status: string) => {
    switch (status) {
      case "SELESAI":
        return "bg-green-500";
      case "DIPROSES":
        return "bg-yellow-500";
      case "DITOLAK":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-5xl font-bold">
            Dashboard Aspirasi
          </h1>
          <p className="text-slate-400 mt-2">
            Statistik dan aspirasi publik mahasiswa Fakultas Teknik UI
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">

          <div className="bg-blue-600 rounded-2xl p-6 shadow-lg">
            <div className="text-sm opacity-80">Total Aspirasi</div>
            <div className="text-4xl font-bold mt-2">
              {total}
            </div>
          </div>

          <div className="bg-cyan-600 rounded-2xl p-6 shadow-lg">
            <div className="text-sm opacity-80">Status Baru</div>
            <div className="text-4xl font-bold mt-2">
              {baru}
            </div>
          </div>

          <div className="bg-yellow-500 rounded-2xl p-6 shadow-lg">
            <div className="text-sm opacity-80">Diproses</div>
            <div className="text-4xl font-bold mt-2">
              {proses}
            </div>
          </div>

          <div className="bg-green-600 rounded-2xl p-6 shadow-lg">
            <div className="text-sm opacity-80">Selesai</div>
            <div className="text-4xl font-bold mt-2">
              {selesai}
            </div>
          </div>

        </div>

        {loading ? (
          <div className="bg-slate-900 rounded-2xl p-6">
            Memuat data...
          </div>
        ) : (
          <div className="grid gap-5">

            {data.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-blue-500 transition-all"
              >
                <div className="flex flex-wrap justify-between items-center gap-3">

                  <div>
                    <h2 className="text-2xl font-bold">
                      {item.judul}
                    </h2>

                    <div className="text-slate-400 text-sm mt-1">
                      Nomor Tiket : {item.ticket_no}
                    </div>

                    <div className="text-slate-500 text-sm">
                      Jurusan : {item.jurusan}
                    </div>
                  </div>

                  <span
                    className={`${badgeColor(item.status)} px-4 py-2 rounded-full text-sm font-semibold`}
                  >
                    {item.status}
                  </span>

                </div>

                <div className="border-t border-slate-800 my-4" />

                <p className="text-slate-300 leading-relaxed">
                  {item.deskripsi}
                </p>
              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}