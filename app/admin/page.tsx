"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type Aspiration = {
  id: number;
  ticket_no: string;
  judul: string;
  jurusan: string;
  status: string;
  created_at: string;
};

export default function AdminDashboard() {
  const [data, setData] = useState<Aspiration[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("SEMUA");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);

    const { data, error } = await supabase
      .from("aspirations")
      .select(
        `
        id,
        ticket_no,
        judul,
        jurusan,
        status,
        created_at
      `
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setData(data || []);
    }

    setLoading(false);
  }

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchTicket =
        search === "" ||
        item.ticket_no
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "SEMUA" ||
        item.status === statusFilter;

      return matchTicket && matchStatus;
    });
  }, [data, search, statusFilter]);

  const total = data.length;

  const baru = data.filter(
    (x) => x.status === "BARU"
  ).length;

  const diproses = data.filter(
    (x) => x.status === "DIPROSES"
  ).length;

  const selesai = data.filter(
    (x) => x.status === "SELESAI"
  ).length;

  const statusBadge = (status: string) => {
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
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">

          <div>
            <h1 className="text-4xl font-bold text-white">
              📊 Dashboard Admin
            </h1>

            <p className="text-slate-400 mt-2">
              Kelola aspirasi mahasiswa Fakultas Teknik UI
            </p>
          </div>

          <a
            href="/"
            className="mt-4 md:mt-0 bg-slate-800 hover:bg-slate-700 text-white px-5 py-3 rounded-xl transition"
          >
            ← Kembali ke Beranda
          </a>
        </div>

        {/* Statistik */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="text-slate-400">
              Total Aspirasi
            </div>

            <div className="text-4xl font-bold text-cyan-400 mt-3">
              {total}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="text-slate-400">
              Status Baru
            </div>

            <div className="text-4xl font-bold text-blue-400 mt-3">
              {baru}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="text-slate-400">
              Diproses
            </div>

            <div className="text-4xl font-bold text-yellow-400 mt-3">
              {diproses}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="text-slate-400">
              Selesai
            </div>

            <div className="text-4xl font-bold text-green-400 mt-3">
              {selesai}
            </div>
          </div>

        </div>

        {/* Filter */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">

          <div className="grid md:grid-cols-3 gap-4">

            <input
              type="text"
              placeholder="Cari nomor tiket..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="bg-slate-800 border border-slate-700 text-white p-3 rounded-xl"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="bg-slate-800 border border-slate-700 text-white p-3 rounded-xl"
            >
              <option value="SEMUA">
                Semua Status
              </option>
              <option value="BARU">
                BARU
              </option>
              <option value="DIPROSES">
                DIPROSES
              </option>
              <option value="SELESAI">
                SELESAI
              </option>
              <option value="DITOLAK">
                DITOLAK
              </option>
            </select>

            <button
              onClick={loadData}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl"
            >
              Refresh Data
            </button>

          </div>

        </div>

        {/* Tabel */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <h2 className="text-2xl font-bold text-white mb-6">
            Daftar Aspirasi
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-left">
                  <th className="pb-4">
                    Nomor Tiket
                  </th>
                  <th className="pb-4">
                    Judul
                  </th>
                  <th className="pb-4">
                    Jurusan
                  </th>
                  <th className="pb-4">
                    Status
                  </th>
                  <th className="pb-4">
                    Tanggal
                  </th>
                </tr>
              </thead>

              <tbody>

                {!loading &&
                  filteredData.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-slate-800"
                    >
                      <td className="py-4 text-white">
                        {item.ticket_no}
                      </td>

                      <td className="py-4 text-white">
                        {item.judul}
                      </td>

                      <td className="py-4 text-slate-300">
                        {item.jurusan}
                      </td>

                      <td className="py-4">
                        <span
                          className={`${statusBadge(
                            item.status
                          )} px-3 py-1 rounded-full text-white text-sm`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="py-4 text-slate-300">
                        {new Date(
                          item.created_at
                        ).toLocaleDateString(
                          "id-ID"
                        )}
                      </td>
                    </tr>
                  ))}

                {!loading &&
                  filteredData.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-10 text-center text-slate-400"
                      >
                        Belum ada data aspirasi
                      </td>
                    </tr>
                  )}

                {loading && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-10 text-center text-slate-400"
                    >
                      Memuat data...
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </main>
  );
}