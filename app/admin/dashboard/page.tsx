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
    const { data, error } = await supabase
      .from("aspirasi")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setAspirasi(data || []);
    }

    setLoading(false);
  }

  function statusColor(status: string) {
    switch (status) {
      case "Selesai":
        return "bg-green-600";
      case "Diproses":
        return "bg-yellow-500";
      default:
        return "bg-blue-600";
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">
        Dashboard Aspirasi
      </h1>

      <p className="mb-8 text-gray-300">
        Daftar Aspirasi Mahasiswa FTUI
      </p>

      {loading ? (
        <p>Loading...</p>
      ) : aspirasi.length === 0 ? (
        <div className="bg-slate-800 p-6 rounded-xl">
          Belum ada aspirasi yang ditampilkan.
        </div>
      ) : (
        <div className="grid gap-4">
          {aspirasi.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800 rounded-xl p-5 border border-slate-700"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">
                    {item.judul}
                  </h2>

                  <p className="text-gray-400 text-sm">
                    {item.ticket_number}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm ${statusColor(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </div>

              <p className="mt-4 text-gray-300">
                {item.deskripsi}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
