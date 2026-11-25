"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const { data, error } = await supabase
      .from("aspirations")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setData(data);
    }

    setLoading(false);
  };

  const updateStatus = async (
    id: string,
    status: string
  ) => {
    await supabase
      .from("aspirations")
      .update({ status })
      .eq("id", id);

    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <main className="min-h-screen p-8 bg-slate-100">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-6">
          Dashboard Admin
        </h1>

        {loading && <p>Loading...</p>}

        <div className="bg-white rounded-xl shadow overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-200">
                <th className="p-3">Tiket</th>
                <th className="p-3">Nama</th>
                <th className="p-3">Jurusan</th>
                <th className="p-3">Judul</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="p-3">
                    {item.ticket_no}
                  </td>

                  <td className="p-3">
                    {item.nama}
                  </td>

                  <td className="p-3">
                    {item.jurusan}
                  </td>

                  <td className="p-3">
                    {item.judul}
                  </td>

                  <td className="p-3">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        updateStatus(
                          item.id,
                          e.target.value
                        )
                      }
                      className="border p-2 rounded"
                    >
                      <option>BARU</option>
                      <option>DIPROSES</option>
                      <option>MENUNGGU_KLARIFIKASI</option>
                      <option>SELESAI</option>
                      <option>DITOLAK</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </main>
  );
}