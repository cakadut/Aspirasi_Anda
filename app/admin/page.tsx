export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-slate-950 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">
              📊 Dashboard Admin
            </h1>

            <p className="text-slate-400 mt-2">
              Kelola aspirasi mahasiswa Fakultas Teknik Universitas Indonesia
            </p>
          </div>

          <a
            href="/"
            className="mt-4 md:mt-0 bg-slate-800 hover:bg-slate-700 text-white px-5 py-3 rounded-xl transition"
          >
            ← Kembali ke Beranda
          </a>
        </div>

        {/* Statistik */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <p className="text-slate-400 text-sm">
              Total Aspirasi
            </p>

            <h2 className="text-4xl font-bold text-cyan-400 mt-2">
              0
            </h2>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <p className="text-slate-400 text-sm">
              Status Baru
            </p>

            <h2 className="text-4xl font-bold text-blue-400 mt-2">
              0
            </h2>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <p className="text-slate-400 text-sm">
              Diproses
            </p>

            <h2 className="text-4xl font-bold text-yellow-400 mt-2">
              0
            </h2>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <p className="text-slate-400 text-sm">
              Selesai
            </p>

            <h2 className="text-4xl font-bold text-green-400 mt-2">
              0
            </h2>
          </div>

        </div>

        {/* Filter */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl mb-8">

          <div className="grid md:grid-cols-3 gap-4">

            <input
              type="text"
              placeholder="Cari nomor tiket..."
              className="bg-slate-800 border border-slate-700 text-white p-3 rounded-xl"
            />

            <select className="bg-slate-800 border border-slate-700 text-white p-3 rounded-xl">
              <option>Semua Status</option>
              <option>BARU</option>
              <option>DIPROSES</option>
              <option>SELESAI</option>
              <option>DITOLAK</option>
            </select>

            <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl">
              Cari Data
            </button>

          </div>

        </div>

        {/* Tabel Aspirasi */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">

          <h2 className="text-2xl font-bold text-white mb-6">
            Daftar Aspirasi
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="pb-4">Nomor Tiket</th>
                  <th className="pb-4">Judul</th>
                  <th className="pb-4">Jurusan</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Tanggal</th>
                </tr>
              </thead>

              <tbody>

                <tr className="border-b border-slate-800">
                  <td className="py-4 text-white">
                    Belum ada data
                  </td>

                  <td className="py-4 text-slate-400">
                    -
                  </td>

                  <td className="py-4 text-slate-400">
                    -
                  </td>

                  <td className="py-4">
                    <span className="bg-slate-700 text-white px-3 py-1 rounded-full text-sm">
                      -
                    </span>
                  </td>

                  <td className="py-4 text-slate-400">
                    -
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </main>
  );
}