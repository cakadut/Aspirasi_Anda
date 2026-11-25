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
    const { data, error } = await supabase
      .from("aspirations")
      .select("*")
      .eq("is_public", true)
      .order("created_at", { ascending: false });

    if (!error) {
      setData(data || []);
    }

    setLoading(false);
  }

  const badgeColor = (status: string) => {
    switch (status) {
      case "SELESAI":
        return "bg-green-600";
      case "DIPROSES":
        return "bg-yellow-500";
      case "DITOLAK":
        return "bg-red-600";
      default:
        return "bg-blue-600";
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Dashboard Aspirasi
          </h1>

          <p className="text-slate-400 mt-2">
            Aspirasi publik mahasiswa Fakultas Teknik UI
          </p>
        </div>

        {loading ? (
          <div className="bg-slate-900 rounded-2xl p-6">
            Memuat data...
          </div>
        ) : data.length === 0 ? (
          <div className="bg-slate-900 rounded-2xl p-6">
            Belum ada aspirasi yang ditampilkan.
          </div>
        ) : (
          <div className="grid gap-5">
            {data.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
              >
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {item.judul}
                    </h2>

                    <div className="text-slate-400 text-sm">
                      {item.ticket_no}
                    </div>
                  </div>

                  <span
                    className={`${badgeColor(item.status)} px-3 py-1 rounded-full text-sm`}
                  >
                    {item.status}
                  </span>
                </div>

                <p className="text-slate-300">
                  {item.deskripsi}
                </p>

                <div className="mt-4 text-sm text-slate-500">
                  {item.jurusan}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}