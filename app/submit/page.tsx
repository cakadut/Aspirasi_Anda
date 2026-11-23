"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SubmitPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nama: "",
    email: "",
    no_hp: "",
    jurusan: "",
    judul: "",
    isi_aspirasi: "",
  });

  const generateTicket = () => {
    const today = new Date();

    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    const random = Math.floor(Math.random() * 999999)
      .toString()
      .padStart(6, "0");

    return `${yyyy}${mm}${dd}-${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const ticketNo = generateTicket();

    const { error } = await supabase
      .from("aspirations")
      .insert([
        {
          ticket_no: ticketNo,
          nama: form.nama,
          email: form.email,
          no_hp: form.no_hp,
          jurusan: form.jurusan,
          kategori: "Umum",
          judul: form.judul,
          isi_aspirasi: form.isi_aspirasi,
          status: "BARU",
        },
      ]);

    if (error) {
      alert("Gagal menyimpan aspirasi");
      console.error(error);
    } else {
      alert(
        `Aspirasi berhasil dikirim.\n\nNomor Tiket:\n${ticketNo}`
      );

      setForm({
        nama: "",
        email: "",
        no_hp: "",
        jurusan: "",
        judul: "",
        isi_aspirasi: "",
      });
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6">
          Kirim Aspirasi
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            className="w-full border p-3 rounded"
            placeholder="Nama"
            value={form.nama}
            onChange={(e) =>
              setForm({ ...form, nama: e.target.value })
            }
            required
          />

          <input
            className="w-full border p-3 rounded"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            className="w-full border p-3 rounded"
            placeholder="No HP"
            value={form.no_hp}
            onChange={(e) =>
              setForm({ ...form, no_hp: e.target.value })
            }
          />

          <select
            className="w-full border p-3 rounded"
            value={form.jurusan}
            onChange={(e) =>
              setForm({ ...form, jurusan: e.target.value })
            }
            required
          >
            <option value="">Pilih Jurusan</option>
            <option>Teknik Sipil</option>
            <option>Teknik Mesin</option>
            <option>Teknik Elektro</option>
            <option>Teknik Kimia</option>
            <option>Teknik Industri</option>
            <option>Teknik Komputer</option>
            <option>Teknik Lingkungan</option>
            <option>Teknik Perkapalan</option>
            <option>Teknik Metalurgi dan Material</option>
            <option>Arsitektur</option>
            <option>Teknik Bioproses</option>
          </select>

          <input
            className="w-full border p-3 rounded"
            placeholder="Judul Aspirasi"
            value={form.judul}
            onChange={(e) =>
              setForm({ ...form, judul: e.target.value })
            }
            required
          />

          <textarea
            className="w-full border p-3 rounded h-40"
            placeholder="Sampaikan aspirasi Anda..."
            value={form.isi_aspirasi}
            onChange={(e) =>
              setForm({
                ...form,
                isi_aspirasi: e.target.value,
              })
            }
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            {loading
              ? "Mengirim..."
              : "Kirim Aspirasi"}
          </button>
        </form>
      </div>
    </main>
  );
}