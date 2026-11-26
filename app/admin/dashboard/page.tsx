"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [aspirasi, setAspirasi] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [email,setEmail]=useState("");
  const [memberMessage,setMemberMessage]=useState("");
  const [adding,setAdding]=useState(false);
  async function addMember(e: React.FormEvent){e.preventDefault();setAdding(true);setMemberMessage("");try {const {error}=await supabase.rpc("admin_add_member",{p_email:email.trim()});setMemberMessage(error?error.message:"Administrator berhasil ditambahkan.");if(!error)setEmail("");}finally{setAdding(false);}}

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);

    const { data, error } = await supabase.rpc("admin_list_aspirations_v2");

    if (error) {
      setAspirasi([]); await supabase.auth.signOut(); window.location.replace("/admin/login"); return;
    }

    setAspirasi(data || []);
    setLoading(false);
  }

  async function save(item: any) {
    const {error}=await supabase.rpc("admin_update_aspiration_v2",{p_id:item.id,p_status:item.status,p_public_progress:item.public_progress || "",p_private_admin_note:item.private_admin_note || "",p_is_published:item.is_published,p_assigned_to:item.assigned_to || ""});
    if(error) alert(error.message); else {alert("Perubahan tersimpan"); await loadData();}
  }
  function edit(id:string,field:string,value:string|boolean){setAspirasi(prev=>prev.map(x=>x.id===id?{...x,[field]:value}:x));}
  function statusColor(status: string) {
    switch ((status || "").toUpperCase()) {
      case "SELESAI":
        return "bg-green-600";
      case "DIPROSES":
        return "bg-yellow-500";
      case "DITOLAK":
        return "bg-red-600";
      case "MENUNGGU_KLARIFIKASI":
        return "bg-orange-600";
      default:
        return "bg-blue-600";
    }
  }

  const total = aspirasi.length;

  const baru = aspirasi.filter(
    (x) => (x.status || "").toUpperCase() === "SUBMIT"
  ).length;

  const diproses = aspirasi.filter(
    (x) => (x.status || "").toUpperCase() === "DIPROSES"
  ).length;

  const selesai = aspirasi.filter(
    (x) => (x.status || "").toUpperCase() === "SELESAI"
  ).length;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">
              Dashboard Admin
            </h1>
            <p className="text-slate-400 mt-2">
              Kelola Aspirasi Mahasiswa Fakultas Teknik UI
            </p>
          </div>

          <button onClick={async()=>{await supabase.auth.signOut();window.location.replace("/admin/login");}} className="bg-slate-700 px-5 py-3 rounded-xl">Keluar</button>
          <button
            onClick={loadData}
            className="bg-cyan-600 hover:bg-cyan-500 px-5 py-3 rounded-xl font-semibold"
          >
            Refresh
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="text-slate-400">
              Total Aspirasi
            </div>
            <div className="text-4xl font-bold text-cyan-400 mt-2">
              {total}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="text-slate-400">
              Status Baru
            </div>
            <div className="text-4xl font-bold text-blue-400 mt-2">
              {baru}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="text-slate-400">
              Diproses
            </div>
            <div className="text-4xl font-bold text-yellow-400 mt-2">
              {diproses}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="text-slate-400">
              Selesai
            </div>
            <div className="text-4xl font-bold text-green-400 mt-2">
              {selesai}
            </div>
          </div>
        </div>

        <form onSubmit={addMember} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-8 space-y-3"><h2 className="text-xl font-bold">Tambah administrator</h2><p className="text-slate-400 text-sm">Akun harus sudah dibuat dan dikonfirmasi di Supabase Authentication.</p><div className="flex flex-col sm:flex-row gap-3"><input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email administrator" className="bg-slate-800 rounded-xl p-3 flex-1 min-w-0"/><button disabled={adding} className="bg-cyan-700 rounded-xl px-5 py-3">{adding?"Memproses...":"Tambah admin"}</button></div><p role="status">{memberMessage}</p></form>
        {loading ? (
          <div className="bg-slate-900 rounded-2xl p-6">
            Memuat data...
          </div>
        ) : aspirasi.length === 0 ? (
          <div className="bg-slate-900 rounded-2xl p-6">
            Belum ada aspirasi yang ditampilkan.
          </div>
        ) : (
          <div className="grid gap-5">
            {aspirasi.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
              >
                <div className="flex flex-col md:flex-row md:justify-between gap-4">

                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold">
                      {item.title}
                    </h2>

                    <p className="text-cyan-400 mt-2">
                      {item.ticket_code}
                    </p>

                    <p className="text-slate-400 mt-2">
                      {item.student_name}
                    </p>

                    <p className="text-slate-500">
                      {item.faculty_program} · NPM: {item.student_number}
                    </p>

                    <div className="mt-4 bg-slate-800 rounded-xl p-4">
                      {item.description}
                    </div>

                    {item.private_admin_note && (
                      <div className="mt-4 bg-slate-700 rounded-xl p-4">
                        <div className="font-semibold mb-2">
                          Catatan Admin
                        </div>
                        {item.private_admin_note}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 flex flex-col">
                    <select className="bg-slate-800 p-3 rounded-xl" value={item.status} onChange={e=>edit(item.id,"status",e.target.value)}>{["submit","diterima","diproses","selesai","ditolak"].map(s=><option key={s}>{s}</option>)}</select>
                    <input className="bg-slate-800 p-3 rounded-xl" placeholder="Departemen / pihak terkait" value={item.assigned_to||""} onChange={e=>edit(item.id,"assigned_to",e.target.value)}/>
                    <textarea className="bg-slate-800 p-3 rounded-xl" placeholder="Progres publik (tanpa identitas)" value={item.public_progress||""} onChange={e=>edit(item.id,"public_progress",e.target.value)}/>
                    <textarea className="bg-slate-800 p-3 rounded-xl" placeholder="Catatan internal admin" value={item.private_admin_note||""} onChange={e=>edit(item.id,"private_admin_note",e.target.value)}/>
                    <label><input type="checkbox" checked={item.is_published} onChange={e=>edit(item.id,"is_published",e.target.checked)}/> Publikasikan aspirasi</label>
                    <button className="bg-cyan-600 p-3 rounded-xl" onClick={()=>save(item)}>Simpan perubahan</button>
                    <span
                      className={`px-4 py-2 rounded-full text-sm text-white ${statusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}