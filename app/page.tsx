export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500">
        <div className="max-w-7xl mx-auto px-6 py-24">

          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
              AspirasiAnda
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
              Platform Aspirasi Mahasiswa Fakultas Teknik Universitas Indonesia.
              Sampaikan masukan, keluhan, kritik, dan saran untuk menciptakan
              lingkungan kampus yang lebih baik.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <a
                href="/submit"
                className="bg-white text-blue-800 px-8 py-4 rounded-xl font-bold shadow-xl hover:scale-105 transition"
              >
                🚀 Kirim Aspirasi
              </a>

              <a
                href="/dashboard"
                className="bg-blue-950/40 backdrop-blur border border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-blue-950/60 transition"
              >
                📊 Dashboard Aspirasi
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* STATISTIK */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <p className="text-slate-400 text-sm">
              Total Aspirasi
            </p>
            <h2 className="text-3xl font-bold text-cyan-400 mt-2">
              0
            </h2>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <p className="text-slate-400 text-sm">
              Diproses
            </p>
            <h2 className="text-3xl font-bold text-yellow-400 mt-2">
              0
            </h2>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <p className="text-slate-400 text-sm">
              Selesai
            </p>
            <h2 className="text-3xl font-bold text-green-400 mt-2">
              0
            </h2>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <p className="text-slate-400 text-sm">
              Status Sistem
            </p>
            <h2 className="text-2xl font-bold text-green-400 mt-2">
              Online
            </h2>
          </div>

        </div>
      </section>

      {/* MENU */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <h2 className="text-3xl font-bold mb-8">
          Layanan Aspirasi
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <a
            href="/submit"
            className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl hover:bg-slate-800 hover:-translate-y-1 transition"
          >
            <div className="text-4xl mb-4">📝</div>

            <h3 className="text-xl font-bold text-cyan-400 mb-3">
              Kirim Aspirasi
            </h3>

            <p className="text-slate-400">
              Sampaikan masukan, kritik, keluhan, dan saran untuk FTUI.
            </p>
          </a>

          <a
            href="/tracking"
            className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl hover:bg-slate-800 hover:-translate-y-1 transition"
          >
            <div className="text-4xl mb-4">🎫</div>

            <h3 className="text-xl font-bold text-cyan-400 mb-3">
              Tracking Tiket
            </h3>

            <p className="text-slate-400">
              Pantau perkembangan aspirasi menggunakan nomor tiket.
            </p>
          </a>

          <a
            href="/dashboard"
            className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl hover:bg-slate-800 hover:-translate-y-1 transition"
          >
            <div className="text-4xl mb-4">📊</div>

            <h3 className="text-xl font-bold text-cyan-400 mb-3">
              Dashboard
            </h3>

            <p className="text-slate-400">
              Lihat daftar aspirasi, statistik, dan status penanganan.
            </p>
          </a>

          <a
            href="/admin/login"
            className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl hover:bg-slate-800 hover:-translate-y-1 transition"
          >
            <div className="text-4xl mb-4">🔐</div>

            <h3 className="text-xl font-bold text-cyan-400 mb-3">
              Login Admin
            </h3>

            <p className="text-slate-400">
              Masuk ke dashboard administrator untuk mengelola aspirasi.
            </p>
          </a>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-500">
          © 2026 AspirasiAnda • Fakultas Teknik Universitas Indonesia
        </div>
      </footer>

    </main>
  );
}
