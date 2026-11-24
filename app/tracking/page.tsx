"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function TrackingPage() {
  const [ticket, setTicket] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!ticket) return;

    setLoading(true);

    const { data, error } = await supabase
      .from("aspirations")
      .select("*")
      .eq("ticket_no", ticket)
      .single();

    if (error) {
      setResult(null);
      alert("Nomor tiket tidak ditemukan");
    } else {
      setResult(data);
    }

    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "BARU":
        return "bg-blue-600";
      case "DIPROSES":
        return "bg-yellow-500";
      case "SELESAI":
        return "bg-green-600";
      case "DITOLAK":
        return "bg-red-600";
      default:
        return "bg-slate-600";
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">

        <div className="mb-8">
          <h1 className="