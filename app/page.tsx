export default function Home() {
  return (
    <main className="min-h-screen bg-blue-50">
      <div className="max-w-5xl mx-auto p-10">
        <h1 className="text-5xl font-bold text-blue-700 mb-4">
          AspirasiAnda
        </h1>

        <p className="text-lg mb-8">
          Sistem Aspirasi Mahasiswa Fakultas Teknik Universitas Indonesia
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <a
            href="/submit"
            className="p-6 bg-white rounded-xl shadow hover:bg-blue-100"
          >
            Kirim Aspirasi
          </a>

          <a
            href="/tracking"
            className="p-6 bg-white rounded-xl shadow hover:bg-blue-100"
          >
            Tracking Tiket
          </a>

          <a
            href="/admin/login"
            className="p-6 bg-white rounded-xl shadow hover:bg-blue-100"
          >
            Login Admin
          </a>
        </div>
      </div>
    </main>
  );
}