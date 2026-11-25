"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("SEMUA");

  const [selected, setSelected] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);

    const { data } = await supabase
      .from("aspirations")
      .select("*")
      .order("created_at", { ascending: false });

    setData(data || []);
    setLoading(false);
  }

  async function saveData() {
    if (!selected) return;

    setSaving(true);

    await supabase
      .from("aspirations")
      .update({
        status: selected.status,
        admin_note: selected.admin_note,
      })
      .eq("id", selected.id);

    setSaving(false);

    loadData();

    alert("Data berhasil disimpan");
  }

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchSearch =
        search === "" ||
        item.ticket_no?.toLowerCase().includes(search.toLowerCase()) ||
        item.judul?.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "SEMUA" ||
        item.status === statusFilter;

      return matchSearch && matchStatus;
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

  const klarifikasi = data.filter(
    (x) => x.status === "MENUNGGU_KLARIFIKASI"
  ).length;

  const badgeColor = (status: string) => {
    switch (status) {
      case "BARU":
        return "bg-blue-600";

      case "DIPROSES":
        return "bg-yellow-500";

      case "SELESAI":
        return "bg-green-600";

      case "DITOLAK":
        return "bg-red-600";

      case "MENUNGGU_KLARIFIKASI":
        return "bg-orange-500";

      default:
        return "bg-slate-600";
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-5xl font-bold">
            Dashboard Admin
          </h1>

          <p className="text-slate-400 mt-2">
            Kelola Aspirasi Mahasiswa FTUI
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-4 mb-8">

          <div className="bg-blue-600 rounded-3xl p-6">
            <div>Total</div>
            <div className="text-4xl font-bold">
              {total}
            </div>
          </div>

          <div className="bg-cyan-600 rounded-3xl p-6">
            <div>Baru</div>
            <div className="text-4xl font-bold">
              {baru}
            </div>
          </div>

          <div className="bg-yellow-500 rounded-3xl p-6">
            <div>Diproses</div>
            <div className="text-4xl font-bold">
              {diproses}
            </div>
          </div>

          <div className="bg-orange-500 rounded-3xl p-6">
            <div>Klarifikasi</div>
            <div className="text-4xl font-bold">
              {klarifikasi}
            </div>
          </div>

          <div className="bg-green-600 rounded-3xl p-6">
            <div>Selesai</div>
            <div className="text-4xl font-bold">
              {selesai}
            </div>
          </div>

        </div>

        <div className="bg-slate-900 rounded-3xl p-5 mb-8 border border-slate-800">

          <div className="grid md:grid-cols-3 gap-4">

            <input
              placeholder="Cari tiket atau judul"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="bg-slate-800 p-3 rounded-xl"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="bg-slate-800 p-3 rounded-xl"
            >
              <option value="SEMUA">SEMUA</option>
              <option value="BARU">BARU</option>
              <option value="DIPROSES">DIPROSES</option>
              <option value="MENUNGGU_KLARIFIKASI">
                MENUNGGU_KLARIFIKASI
              </option>
              <option value="SELESAI">SELESAI</option>
              <option value="DITOLAK">DITOLAK</option>
            </select>

            <button
              onClick={loadData}
              className="bg-blue-600 rounded-xl"
            >
              Refresh
            </button>

          </div>

        </div>

        <div className="grid gap-4">

          {filteredData.map((item) => (

            <div
              key={item.id}
              onClick={() => setSelected(item)}
              className="cursor-pointer bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-blue-500"
            >

              <div className="flex justify-between flex-wrap gap-4">

                <div>

                  <h2 className="text-xl font-bold">
                    {item.judul}
                  </h2>

                  <div className="text-slate-400 mt-2">
                    {item.ticket_no}
                  </div>

                  <div className="text-slate-500">
                    {item.jurusan}
                  </div>

                </div>

                <span
                  className={`${badgeColor(
                    item.status
                  )} px-4 py-2 rounded-full`}
                >
                  {item.status}
                </span>

              </div>

            </div>

          ))}

        </div>

        {selected && (

          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">

            <div className="bg-slate-900 w-full max-w-4xl rounded-3xl p-6">

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-3xl font-bold">
                  Detail Aspirasi
                </h2>

                <button
                  onClick={() =>
                    setSelected(null)
                  }
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
                    Nama
                  </div>
                  <div>{selected.nama}</div>
                </div>

                <div>
                  <div className="text-slate-400">
                    Email
                  </div>
                  <div>{selected.email}</div>
                </div>

                <div>
                  <div className="text-slate-400">
                    Jurusan
                  </div>
                  <div>{selected.jurusan}</div>
                </div>

                <div>
                  <div className="text-slate-400">
                    Judul
                  </div>
                  <div>{selected.judul}</div>
                </div>

                <div>
                  <div className="text-slate-400">
                    Isi Aspirasi
                  </div>

                  <div className="whitespace-pre-wrap">
                    {selected.isi_aspirasi}
                  </div>
                </div>

                <select
                  value={selected.status}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      status: e.target.value,
                    })
                  }
                  className="bg-slate-800 p-3 rounded-xl w-full"
                >
                  <option>BARU</option>
                  <option>DIPROSES</option>
                  <option>MENUNGGU_KLARIFIKASI</option>
                  <option>SELESAI</option>
                  <option>DITOLAK</option>
                </select>

                <textarea
                  rows={5}
                  value={selected.admin_note || ""}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      admin_note:
                        e.target.value,
                    })
                  }
                  placeholder="Tanggapan admin..."
                  className="bg-slate-800 w-full p-4 rounded-xl"
                />

                <button
                  disabled={saving}
                  onClick={saveData}
                  className="bg-green-600 px-6 py-3 rounded-xl font-bold"
                >
                  {saving
                    ? "Menyimpan..."
                    : "Simpan Perubahan"}
                </button>

              </div>

            </div>

          </div>

        )}

      </div>
    </main>
  );
}