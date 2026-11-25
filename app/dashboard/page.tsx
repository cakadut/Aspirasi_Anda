"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [data, setData] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("SEMUA");
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    let result = [...data];

    if (statusFilter !== "SEMUA") {
      result = result.filter((x) => x.status === statusFilter);
    }

    if (search) {
      result = result.filter(
        (x) =>
          x.judul?.toLowerCase().includes(search.toLowerCase()) ||
          x.ticket_no?.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  }, [search, statusFilter, data]);

  async function loadData() {
    const { data } = await supabase
      .from("aspirations")
      .select("*")
      .eq("is_public", true)
      .order("created_at", { ascending: false });

    setData(data || []);
    setFiltered(data || []);
    setLoading(false);
  }

  const total = data.length;
  const baru = data.filter((x) => x.status === "BARU").length;
  const proses = data.filter((x) => x.status === "DIPROSES").length;
  const selesai = data.filter((x) => x.status === "SELESAI").length;
  const klarifikasi = data.filter(
    (x) => x.status === "MENUNGGU_KLARIFIKASI"
  ).length;

  const badgeColor = (status: string) => {
    switch (status) {
      case "SELESAI":
        return "bg-green-600";
      case "DIPROSES":
        return "bg-yellow-500";
      case "DITOLAK":
        return "bg-red-600";
      case "MENUNGGU_KLARIFIKASI":
        return "bg-orange-500";
      default:
        return "bg-blue-600";
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
            Aspirasi Publik Mahasiswa Fakultas Teknik Universitas Indonesia
          </p>
        </div>

        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-4 mb-8">

          <div className="bg-blue-600 rounded-3xl p-6">
            <div>Total Aspirasi</div>
            <div className="text-4xl font-bold mt-2">{total}</div>
          </div>

          <div className="bg-cyan-600 rounded-3xl p-6">
            <div>Status Baru</div>
            <div className="text-4xl font-bold mt-2">{baru}</div>
          </div>

          <div className="bg-yellow-500 rounded-3xl p-6">
            <div>Diproses</div>
            <div className="text-4xl font-bold mt-2">{proses}</div>
          </div>

          <div className="bg-orange-600 rounded-3xl p-6">
            <div>Klarifikasi</div>
            <div className="text-4xl font-bold mt-2">{klarifikasi}</div>
          </div>

          <div className="bg-green-600 rounded-3xl p-6">
            <div>Selesai</div>
            <div className="text-4xl font-bold mt-2">{selesai}</div>
          </div>

        </div>

        <div className="bg-slate-900 rounded-3xl p-5 mb-8 border border-slate-800">

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Cari Judul atau Nomor Tiket"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-slate-800 rounded-xl px-4 py-3 outline-none"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-800 rounded-xl px-4 py-3"
            >
              <option value="SEMUA">Semua Status</option>
              <option value="BARU">BARU</option>
              <option value="DIPROSES">DIPROSES</option>
              <option value="MENUNGGU_KLARIFIKASI">
                MENUNGGU_KLARIFIKASI
              </option>
              <option value="SELESAI">SELESAI</option>
              <option value="DITOLAK">DITOLAK</option>
            </select>

          </div>

        </div>

        {loading ? (
          <div className="bg-slate-900 rounded-3xl p-6">
            Memuat data...
          </div>
        ) : (

          <div className="grid gap-5">

            {filtered.map((item) => (

              <div
                key={item.id}
                onClick={() => setSelected(item)}
                className="cursor-pointer bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-blue-500 transition-all"
              >

                <div className="flex flex-wrap justify-between gap-4">

                  <div>

                    <h2 className="text-2xl font-bold">
                      {item.judul}
                    </h2>

                    <div className="text-slate-400 mt-2">
                      Nomor Tiket : {item.ticket_no}
                    </div>

                    <div className="text-slate-500">
                      Jurusan : {item.jurusan}
                    </div>

                  </div>

                  <span
                    className={`${badgeColor(
                      item.status
                    )} px-4 py-2 rounded-full text-sm font-semibold h-fit`}
                  >
                    {item.status}
                  </span>

                </div>

              </div>

            ))}

          </div>

        )}

        {selected && (

          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">

            <div className="bg-slate-900 max-w-3xl w-full rounded-3xl p-6 border border-slate-700">

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold">
                  Detail Aspirasi
                </h2>

                <button
                  onClick={() => setSelected(null)}
                  className="bg-red-600 px-4 py-2 rounded-xl"
                >
                  Tutup
                </button>

              </div>

              <div className="space-y-4">

                <div>
                  <div className="text-slate-400">
                    Nomor Tiket
                  </div>
                  <div>{selected.ticket_no}</div>
                </div>

                <div>
                  <div className="text-slate-400">
                    Judul
                  </div>
                  <div>{selected.judul}</div>
                </div>

                <div>
                  <div className="text-slate-400">
                    Jurusan
                  </div>
                  <div>{selected.jurusan}</div>
                </div>

                <div>
                  <div className="text-slate-400">
                    Kategori
                  </div>
                  <div>{selected.kategori}</div>
                </div>

                <div>
                  <div className="text-slate-400">
                    Isi Aspirasi
                  </div>
                  <div className="whitespace-pre-wrap">
                    {selected.isi_aspirasi}
                  </div>
                </div>

                <div>
                  <div className="text-slate-400">
                    Status
                  </div>
                  <div>{selected.status}</div>
                </div>

                <div>
                  <div className="text-slate-400">
                    Tanggapan Admin
                  </div>
                  <div>
                    {selected.admin_note ||
                      "Belum ada tanggapan admin"}
                  </div>
                </div>

                {selected.lampiran && (
                  <a
                    href={selected.lampiran}
                    target="_blank"
                    className="inline-block bg-blue-600 px-4 py-2 rounded-xl"
                  >
                    Lihat Lampiran
                  </a>
                )}

              </div>

            </div>

          </div>

        )}

      </div>
    </main>
  );
}