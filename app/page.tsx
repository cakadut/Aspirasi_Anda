import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-cyan-600">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.20),transparent_30%)]" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-2 mb-6">
              <span>🎓</span>
              <span className="text-sm">
                Fakultas Teknik Universitas Indonesia
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              AspirasiAnda
            </h1>

            <p className="text-lg md:text-2xl text-blue-100 leading-relaxed">
              Platform Aspirasi Mahasiswa Fakultas Teknik Universitas Indonesia.
              Sampaikan kritik, saran, keluhan, dan masukan secara mudah,
              transparan, dan terpantau melalui sistem tracking tiket.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                href="/kirim"
                className="bg-white text-blue-800 px-8 py-4 rounded-2xl font-bold shadow-2xl hover:scale-105 transition"
              >
                🚀 Kirim Aspirasi
              </Link>

              <Link
                href="/dashboard"
                className="bg-blue-950/40 backdrop-blur border border-white/20 px-8 py-4 rounded-2xl font-bold hover:bg-blue-950/60 transition"
              >
                📊 Dashboard Aspirasi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATISTIK */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
            <p className="text-slate-400 text-sm">
              Total Aspirasi
            </p>

            <h2 className="text-4xl font-bold text-cyan-400 mt-3">
              0
            </h2>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
            <p className="text-slate-400 text-sm">
              Sedang Diproses
            </p>

            <h2 className="text-4xl font-bold text-yellow-400 mt-3">
              0
            </h2>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
            <p className="text-slate-400 text-sm">
              Aspirasi Selesai
            </p>

            <h2 className="text-4xl font-bold text-green-400 mt-3">
              0
            </h2>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
            <p className="text-slate-400 text-sm">
              Status Sistem
            </p>

            <h2 className="text-3xl font-bold text-green-400 mt-3">
              ONLINE
            </h2>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-10">
          Layanan Aspirasi
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            href="/kirim"
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl hover:bg-slate-800 hover:-translate-y-2 transition-all"
          >
            <div className="text-5xl mb-4">
              📝
            </div>

            <h3 className="text-xl font-bold text-cyan-400 mb-3">
              Kirim Aspirasi
            </h3>

            <p className="text-slate-400">
              Sampaikan kritik, saran, maupun keluhan kepada FTUI dengan mudah.
            </p>
          </Link>

          <Link
            href="/tracking"
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl hover:bg-slate-800 hover:-translate-y-2 transition-all"
          >
            <div className="text-5xl mb-4">
              🎫
            </div>

            <h3 className="text-xl font-bold text-cyan-400 mb-3">
              Tracking Tiket
            </h3>

            <p className="text-slate-400">
              Lacak progres aspirasi menggunakan nomor tiket yang diberikan.
            </p>
          </Link>

          <Link
            href="/dashboard"
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl hover:bg-slate-800 hover:-translate-y-2 transition-all"
          >
            <div className="text-5xl mb-4">
              📊
            </div>

            <h3 className="text-xl font-bold text-cyan-400 mb-3">
              Dashboard
            </h3>

            <p className="text-slate-400">
              Lihat statistik dan daftar aspirasi publik yang sedang diproses.
            </p>
          </Link>

          <Link
            href="/admin"
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl hover:bg-slate-800 hover:-translate-y-2 transition-all"
          >
            <div className="text-5xl mb-4">
              ⚙️
            </div>

            <h3 className="text-xl font-bold text-cyan-400 mb-3">
              Admin Panel
            </h3>

            <p className="text-slate-400">
              Area pengelolaan aspirasi bagi administrator sistem.
            </p>
          </Link>
        </div>
      </section>

      {/* FITUR */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-8">
            Mengapa AspirasiAnda?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl mb-3">
                🔒
              </div>

              <h3 className="text-xl font-bold mb-2">
                Privasi Terjaga
              </h3>

              <p className="text-slate-400">
                Pengguna dapat memilih menampilkan nama atau tetap anonim.
              </p>
            </div>

            <div>
              <div className="text-4xl mb-3">
                🎫
              </div>

              <h3 className="text-xl font-bold mb-2">
                Tracking Transparan
              </h3>

              <p className="text-slate-400">
                Setiap aspirasi memperoleh nomor tiket unik yang dapat dipantau.
              </p>
            </div>

            <div>
              <div className="text-4xl mb-3">
                ⚡
              </div>

              <h3 className="text-xl font-bold mb-2">
                Cepat & Mudah
              </h3>

              <p className="text-slate-400">
                Dirancang agar mahasiswa dapat menyampaikan aspirasi hanya dalam beberapa menit.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}