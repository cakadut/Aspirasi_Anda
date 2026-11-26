"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SubmitPage() {
  const [loading, setLoading] = useState(false);
  const [showName, setShowName] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  useEffect(() => { supabase.from("categories").select("name").eq("is_active", true).order("name").then(({data,error}) => { if(error) alert("Kategori gagal dimuat"); else setCategories((data || []).map(x => x.name)); }); }, []);

  const [form, setForm] = useState({
    nama: "",
    npm: "",
    kategori: "",
    jurusan: "",
    judul: "",
    isi_aspirasi: "",
  });


  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { data, error } = await supabase.rpc("submit_aspiration_with_visibility", { p_student_name: form.nama, p_student_number: form.npm, p_faculty_program: form.jurusan, p_category: form.kategori, p_title: form.judul, p_description: form.isi_aspirasi, p_show_name: showName });
      const ticketNo = data?.[0]?.ticket_code;

      if (error) {
        console.error(error);
        alert("Gagal menyimpan aspirasi");
      } else {
        alert(
          `Aspirasi berhasil dikirim.\n\nNomor Tiket:\n${ticketNo}`
        );

        setShowName(false);
        setForm({
          nama: "",
          npm: "",
          kategori: "",
          jurusan: "",
          judul: "",
          isi_aspirasi: "",
        });


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
              <label className="block text-slate-300 mb-2">No. NPM *</label>
              <input type="text" inputMode="numeric" pattern="[0-9]{4,40}" required value={form.npm} onChange={e => setForm({...form,npm:e.target.value})} className="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-xl" placeholder="Nomor Pokok Mahasiswa" />
              <p className="text-slate-400 text-sm mt-2">NPM dan program studi hanya untuk verifikasi admin. Nama ditampilkan sesuai pilihan Anda.</p>
            </div>
            <div>
              <fieldset className="space-y-2 mb-5 text-slate-300"><legend>Publikasi nama</legend><label className="block"><input type="radio" name="visibility" checked={!showName} onChange={()=>setShowName(false)} /> Anonim (disarankan)</label><label className="block"><input type="radio" name="visibility" checked={showName} onChange={()=>setShowName(true)} /> Tampilkan nama saya jika aspirasi dipublikasikan</label></fieldset>
              <label className="block text-slate-300 mb-2">Kategori *</label>
              <select required value={form.kategori} onChange={e=>setForm({...form,kategori:e.target.value})} className="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-xl"><option value="">Pilih kategori</option>{categories.map(x=><option key={x}>{x}</option>)}</select>
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
                minLength={5} maxLength={120} placeholder="Judul Aspirasi"
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
                minLength={20} maxLength={10000} placeholder="Tuliskan aspirasi Anda..."
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