export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-white mb-8">
          📊 Dashboard Admin
        </h1>

        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="text-slate-400">Total Aspirasi</div>
            <div className="text-3xl font-bold text-cyan-400 mt-2">
              0
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="text-slate-400">Baru</div>
            <div className="text-3xl font-bold text-blue-400 mt-2">
              0
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="text-slate-400">Diproses</div>
            <div className="text-3xl font-bold text-yellow-400 mt-2">
              0
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="text-slate-400">Selesai</div>
            <div className="text-3xl font-bold text-green-400 mt-2">
              0
            </div>
          </div>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <h2 className="text-2xl text-white font-bold mb-4">
            Daftar Aspirasi
          </h2>

          <p className="text-slate-400">
            Data aspirasi akan ditampilkan di sini.
          </p>
        </div>

      </div>
    </main>
  );
}