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
      result = result.filter(
        (item) => item.status === statusFilter
      );
    }

    if (search) {
      result = result.filter(
        (item) =>
          item.title
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          item.ticket_code
            ?.toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  }, [search, statusFilter, data]);

  async function loadData() {
    setLoading(true);

    const { data, error } = await supabase
      .from("public_aspirations")
      .select("ticket_code,title,category,status,submitted_at,updated_at,public_progress,display_name")
      .order("submitted_at", { ascending: false });

    if (!error) {
      setData(data || []);
      setFiltered(data || []);
    }

    setLoading(false);
  }

  const total = data.length;
  const baru = data.filter(
    (x) => x.status === "submit"
  ).length;

  const proses = data.filter(
    (x) => x.status === "diproses"
  ).length;

  const klarifikasi = data.filter(
    (x) => x.status === "diterima"
  ).length;

  const selesai = data.filter(
    (x) => x.status === "selesai"
  ).length;

  const ditolak = data.filter(
    (x) => x.status === "ditolak"
  ).length;

  const badgeColor = (status: string) => {
    switch (status) {
      case "selesai":
        return "bg-green-600";

      case "diproses":
        return "bg-yellow-500";

      case "ditolak":
        return "bg-red-600";

      case "diterima":
        return "bg-orange-500";

      default:
        return "bg-blue-600";
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-extrabold">
            📊 Dashboard Aspirasi
          </h1>

          <p className="text-slate-400 mt-3">
            Aspirasi Publik Mahasiswa Fakultas Teknik Universitas Indonesia
          </p>
        </div>

        {/* Statistik */}

        <div className="grid xl:grid-cols-6 lg:grid-cols-3 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-blue-700 rounded-3xl p-6 shadow-xl">
            <div>Total Aspirasi</div>
            <div className="text-4xl font-bold mt-2">
              {total}
            </div>
          </div>

          <div className="bg-cyan-600 rounded-3xl p-6 shadow-xl">
            <div>Status Baru</div>
            <div className="text-4xl font-bold mt-2">
              {baru}
            </div>
          </div>

          <div className="bg-yellow-500 rounded-3xl p-6 shadow-xl">
            <div>Diproses</div>
            <div className="text-4xl font-bold mt-2">
              {proses}
            </div>
          </div>

          <div className="bg-orange-600 rounded-3xl p-6 shadow-xl">
            <div>Diterima</div>
            <div className="text-4xl font-bold mt-2">
              {klarifikasi}
            </div>
          </div>

          <div className="bg-green-600 rounded-3xl p-6 shadow-xl">
            <div>Selesai</div>
            <div className="text-4xl font-bold mt-2">
              {selesai}
            </div>
          </div>

          <div className="bg-red-600 rounded-3xl p-6 shadow-xl">
            <div>Ditolak</div>
            <div className="text-4xl font-bold mt-2">
              {ditolak}
            </div>
          </div>
        </div>

        {/* Filter */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Cari nomor tiket atau judul aspirasi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-slate-800 rounded-xl px-4 py-3 outline-none border border-slate-700"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="bg-slate-800 rounded-xl px-4 py-3 border border-slate-700"
            >
              <option value="SEMUA">
                Semua Status
              </option>
              <option value="submit">
                submit
              </option>
              <option value="diproses">
                diproses
              </option>
              <option value="diterima">
                DITERIMA
              </option>
              <option value="selesai">
                selesai
              </option>
              <option value="ditolak">
                ditolak
              </option>
            </select>
          </div>
        </div>

        {/* List Aspirasi */}

        {loading ? (
          <div className="bg-slate-900 rounded-3xl p-10 text-center">
            Memuat data...
          </div>
        ) : (
          <div className="space-y-5">
            {filtered.length === 0 && (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center">
                <div className="text-6xl mb-4">
                  📭
                </div>

                <h2 className="text-2xl font-bold">
                  Tidak Ada Data
                </h2>

                <p className="text-slate-400 mt-2">
                  Tidak ada aspirasi yang sesuai
                  dengan filter yang dipilih.
                </p>
              </div>
            )}

            {filtered.map((item) => (
              <div
                key={item.ticket_code}
                onClick={() => setSelected(item)}
                className="cursor-pointer bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-cyan-500 hover:shadow-xl transition-all"
              >
                <div className="flex flex-wrap justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {item.title}
                    </h2>

                    <div className="text-slate-400 mt-2">
                      Nomor Tiket :
                      {" "}
                      {item.ticket_code}
                    </div>

                    <div className="text-slate-500">
                      Pengirim :
                      {" "}
                      {item.display_name}
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

        {/* Modal Detail */}

        {selected && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-700 max-w-4xl w-full rounded-3xl p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">
                  Detail Aspirasi
                </h2>

                <button
                  onClick={() => setSelected(null)}
                  className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-xl font-semibold"
                >
                  Tutup
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="text-slate-400">
                    Nomor Tiket
                  </div>
                  <div>{selected.ticket_code}</div>
                </div>

                <div>
                  <div className="text-slate-400">
                    Pengirim
                  </div>
                  <div>
                    {selected.display_name}
                  </div>
                </div>

                <div>
                  <div className="text-slate-400">
                    Tanggal
                  </div>
                  <div>
                    {new Date(
                      selected.submitted_at
                    ).toLocaleString("id-ID")}
                  </div>
                </div>

                <div>
                  <div className="text-slate-400">
                    Judul
                  </div>
                  <div>{selected.title}</div>
                </div>

                

                <div>
                  <div className="text-slate-400">
                    Kategori
                  </div>
                  <div>{selected.category}</div>
                </div>

                

                <div>
                  <div className="text-slate-400">
                    Status
                  </div>

                  <span
                    className={`${badgeColor(
                      selected.status
                    )} inline-block px-3 py-2 rounded-full mt-2`}
                  >
                    {selected.status}
                  </span>
                </div>

                <div>
                  <div className="text-slate-400">
                    Tanggapan Admin
                  </div>

                  <div className="bg-slate-800 p-4 rounded-xl mt-2">
                    {selected.public_progress ||
                      "Belum ada tanggapan admin"}
                  </div>
                </div>

               
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}