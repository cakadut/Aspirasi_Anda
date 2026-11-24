"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SubmitPage() {
  const [loading, setLoading] = useState(false);
  const [showName, setShowName] = useState(false);

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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
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
            show_name: showName,
            is_public: true,
          },
        ]);

      if (error) {
        console.error(error);
        alert("Gagal menyimpan aspirasi");
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

        setShowName(false);
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat mengirim aspirasi");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-slate-950 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">
            📝 Kirim Aspirasi
          </h1>

          <p className="text-slate-400 mt-2">
            Sampaikan kritik, saran, masukan, maupun keluhan
            untuk Fakultas Teknik Universitas Indonesia.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label className="block text-slate-300 mb-2">
                Nama
              </label>

              <input
                type="text"
                className="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-xl"
                placeholder="Nama Lengkap"
                value={form.nama}
                onChange={(e) =>
                  setForm({
                    ...form,
                    nama: e.target.value,
                  })
                }
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">
                Publikasi Identitas
              </label>

              <select
                className="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-xl"
                value={showName ? "true" : "false"}
                onChange={(e) =>
                  setShowName(
                    e.target.value === "true"
                  )
                }
              >
                <option value="false">
                  Anonim (Disarankan)
                </option>

                <option value="true">
                  Tampilkan Nama Saya
                </option>
              </select>

              <p className="text-slate-400 text-sm mt-2">
                Nama hanya akan tampil pada dashboard
                publik apabila Anda memilih opsi ini.
              </p>
            </div>

            <div>
              <label className="block text-slate-300 mb-2">
                Email
              </label>

              <input
                type="email"
                className="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-xl"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">
                Nomor HP
              </label>

              <input
                type="text"
                className="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-xl"
                placeholder="08xxxxxxxxxx"
                value={form.no_hp}
                onChange={(e) =>
                  setForm({
                    ...form,
                    no_hp: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">
                Jurusan
              </label>

              <select
                className="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-xl"
                value={form.jurusan}
                onChange={(e) =>
                  setForm({
                    ...form,
                    jurusan: e.target.value,
                  })
                }
                required
              >
                <option value="">
                  Pilih Jurusan
                </option>

                <option>Teknik Sipil</option>
                <option>Teknik Mesin</option>
                <option>Teknik Elektro</option>
                <option>Teknik Kimia</option>
                <option>Teknik Industri</option>
                <option>Teknik Komputer</option>
                <option>Teknik Lingkungan</option>
                <option>Teknik Perkapalan</option>
                <option>
                  Teknik Metalurgi dan Material
                </option>
                <option>Arsitektur</option>
                <option>Teknik Bioproses</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 mb-2">
                Judul Aspirasi
              </label>

              <input
                type="text"
                className="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-xl"
                placeholder="Judul Aspirasi"
                value={form.judul}
                onChange={(e) =>
                  setForm({
                    ...form,
                    judul: e.target.value,
                  })
                }
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">
                Isi Aspirasi
              </label>

              <textarea
                className="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-xl h-40"
                placeholder="Tuliskan aspirasi Anda..."
                value={form.isi_aspirasi}
                onChange={(e) =>
                  setForm({
                    ...form,
                    isi_aspirasi: e.target.value,
                  })
                }
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-4 rounded-xl shadow-xl hover:opacity-90 transition"
            >
              {loading
                ? "Mengirim..."
                : "🚀 Kirim Aspirasi"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}