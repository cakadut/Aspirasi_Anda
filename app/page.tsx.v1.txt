export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-500 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            AspirasiAnda
          </h1>

          <p className="text-xl md:text-2xl max-w-3xl">
            Suara Mahasiswa untuk Perubahan yang Lebih Baik
            di Fakultas Teknik Universitas Indonesia.
          </p>

          <div className="mt-8 flex gap-4 flex-wrap">
            <a
              href="/submit"
              className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
            >
              Kirim Aspirasi
            </a>

            <a
              href="/dashboard"
              className="bg-blue-900 px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
            >
              Dashboard Aspirasi
            </a>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-6">

          <a
            href="/submit"
            className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-1 hover:shadow-xl transition"
          >
            <h3 className="text-xl font-bold text-blue-700 mb-2">
              📝 Kirim Aspirasi
            </h3>

            <p className="text-gray-600">
              Sampaikan masukan, keluhan, dan saran untuk FTUI.
            </p>
          </a>

          <a
            href="/tracking"
            className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-1 hover:shadow-xl transition"
          >
            <h3 className="text-xl font-bold text-blue-700 mb-2">
              🎫 Tracking Tiket
            </h3>

            <p className="text-gray-600">
              Pantau perkembangan aspirasi menggunakan nomor tiket.
            </p>
          </a>

          <a
            href="/dashboard"
            className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-1 hover:shadow-xl transition"
          >
            <h3 className="text-xl font-bold text-blue-700 mb-2">
              📊 Dashboard Aspirasi
            </h3>

            <p className="text-gray-600">
              Lihat aspirasi yang telah dikirim dan status penanganannya.
            </p>
          </a>

          <a
            href="/admin/login"
            className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-1 hover:shadow-xl transition"
          >
            <h3 className="text-xl font-bold text-blue-700 mb-2">
              🔐 Login Admin
            </h3>

            <p className="text-gray-600">
              Akses dashboard administrator.
            </p>
          </a>

        </div>
      </section>
    </main>
  );
}