"use client";

import { FormEvent, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cellularOutlets, salesPeople, stockMutations } from "@/app/_data/cellular-dummy-data";

type HolderType = "Sales" | "Outlet";

export function StockMutationPage() {
  const [sourceType, setSourceType] = useState<HolderType>("Sales");
  const [destinationType, setDestinationType] = useState<HolderType>("Outlet");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [serials, setSerials] = useState("");
  const [reason, setReason] = useState("");
  const [notice, setNotice] = useState("");
  const [query, setQuery] = useState("");

  const sourceOptions = sourceType === "Sales" ? salesPeople : cellularOutlets.map((outlet) => outlet.name);
  const destinationOptions = destinationType === "Sales" ? salesPeople : cellularOutlets.map((outlet) => outlet.name);
  const filteredMutations = useMemo(() => stockMutations.filter((mutation) => `${mutation.id} ${mutation.source} ${mutation.destination} ${mutation.serialNumbers.join(" ")} ${mutation.status}`.toLowerCase().includes(query.toLowerCase())), [query]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const serialList = serials.split(/[\n,;]+/).map((serial) => serial.trim()).filter(Boolean);
    if (source === destination) {
      setNotice("Lokasi asal dan tujuan tidak boleh sama.");
      return;
    }
    setNotice(`${serialList.length} SN siap diajukan sebagai mutasi ${sourceType} ke ${destinationType}. (Dummy)`);
  }

  function updateSourceType(value: string | null) {
    if (value === "Sales" || value === "Outlet") { setSourceType(value); setSource(""); }
  }

  function updateDestinationType(value: string | null) {
    if (value === "Sales" || value === "Outlet") { setDestinationType(value); setDestination(""); }
  }

  return <div className="mx-auto max-w-[1280px] space-y-8">
    <div><p className="text-sm font-medium text-primary">Inventory / Distribution</p><h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground">Mutasi Stok</h1><p className="mt-2 text-sm text-muted-foreground">Koreksi salah distribusi menggunakan SN/IMEI/ICCID tanpa menghapus histori stok.</p></div>
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <Card><CardHeader><CardTitle>Buat mutasi</CardTitle><CardDescription>Alur yang tersedia: Sales ke Sales, Sales ke Outlet, dan Outlet ke Outlet.</CardDescription></CardHeader><CardContent>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2"><div><Label className="mb-2 text-foreground">Tipe asal *</Label><Select onValueChange={updateSourceType} value={sourceType}><SelectTrigger className="bg-white text-foreground"><SelectValue /></SelectTrigger><SelectContent><SelectItem className="text-foreground" value="Sales">Sales</SelectItem><SelectItem className="text-foreground" value="Outlet">Outlet</SelectItem></SelectContent></Select></div><div><Label className="mb-2 text-foreground">Tipe tujuan *</Label><Select onValueChange={updateDestinationType} value={destinationType}><SelectTrigger className="bg-white text-foreground"><SelectValue /></SelectTrigger><SelectContent><SelectItem className="text-foreground" value="Sales">Sales</SelectItem><SelectItem className="text-foreground" value="Outlet">Outlet</SelectItem></SelectContent></Select></div></div>
          <div className="grid gap-4 sm:grid-cols-2"><div><Label className="mb-2 text-foreground">Lokasi asal *</Label><Select onValueChange={(value) => setSource(value ?? "")} value={source}><SelectTrigger className="bg-white text-foreground"><SelectValue placeholder={`Pilih ${sourceType.toLowerCase()}`} /></SelectTrigger><SelectContent>{sourceOptions.map((option) => <SelectItem className="text-foreground" key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select></div><div><Label className="mb-2 text-foreground">Lokasi tujuan *</Label><Select onValueChange={(value) => setDestination(value ?? "")} value={destination}><SelectTrigger className="bg-white text-foreground"><SelectValue placeholder={`Pilih ${destinationType.toLowerCase()}`} /></SelectTrigger><SelectContent>{destinationOptions.map((option) => <SelectItem className="text-foreground" key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select></div></div>
          <div><Label className="mb-2 text-foreground" htmlFor="mutation-serials">SN/IMEI/ICCID *</Label><textarea className="min-h-28 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring" id="mutation-serials" onChange={(event) => setSerials(event.target.value)} placeholder="Satu serial per baris atau pisahkan dengan koma" value={serials} /></div>
          <div className="grid gap-4 sm:grid-cols-2"><div><Label className="mb-2 text-foreground" htmlFor="mutation-date">Tanggal mutasi *</Label><Input className="bg-white" id="mutation-date" required type="date" /></div><div><Label className="mb-2 text-foreground" htmlFor="mutation-reason">Alasan mutasi *</Label><Input className="bg-white" id="mutation-reason" onChange={(event) => setReason(event.target.value)} placeholder="Contoh: salah distribusi" required value={reason} /></div></div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-5"><p className="text-xs text-muted-foreground">SN berstatus Sold, Damaged, atau In Transit akan ditolak.</p><Button disabled={!source || !destination || !serials || !reason} type="submit">Ajukan mutasi</Button></div>
          {notice && <p className="rounded-xl bg-secondary px-4 py-3 text-sm font-medium text-secondary-foreground" role="status">{notice}</p>}
        </form>
      </CardContent></Card>
      <Card><CardHeader><CardTitle>Aturan perpindahan</CardTitle><CardDescription>Kontrol stok saat mutasi berjalan.</CardDescription></CardHeader><CardContent className="space-y-3 text-sm text-muted-foreground"><p>1. SN harus berada di lokasi asal dan tidak boleh sama dengan lokasi tujuan.</p><p>2. Saat `In Transit`, SN tidak dapat dijual atau dimutasi kembali.</p><p>3. Saat `Received`, lokasi SN berpindah dan histori diperbarui.</p><p>4. Reject atau Cancelled tidak menghapus histori mutasi.</p><Badge variant="outline" className="border-[#e8cf7d] bg-secondary text-[#8b6d13]">Audit trail aktif (Dummy)</Badge></CardContent></Card>
    </div>
    <Card><CardHeader className="gap-4 sm:flex-row sm:items-center sm:justify-between"><div><CardTitle>Histori mutasi</CardTitle><CardDescription>Mutasi per SN dan status perpindahannya.</CardDescription></div><Input className="w-full bg-white sm:max-w-xs" onChange={(event) => setQuery(event.target.value)} placeholder="Cari mutasi, lokasi, SN..." value={query} /></CardHeader><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Nomor</TableHead><TableHead>Perpindahan</TableHead><TableHead>SN / Item</TableHead><TableHead>Alasan</TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody>{filteredMutations.map((mutation) => <TableRow key={mutation.id}><TableCell className="font-semibold text-foreground">{mutation.id}<div className="text-xs font-normal text-muted-foreground">{mutation.date}</div></TableCell><TableCell className="text-foreground">{mutation.source} <span className="text-muted-foreground">→</span> {mutation.destination}<div className="text-xs text-muted-foreground">{mutation.sourceType} → {mutation.destinationType}</div></TableCell><TableCell className="text-foreground">{mutation.item}<div className="text-xs text-muted-foreground">{mutation.serialNumbers.join(", ")}</div></TableCell><TableCell className="max-w-52 whitespace-normal text-muted-foreground">{mutation.reason}</TableCell><TableCell><Badge variant="outline" className="border-[#e8cf7d] bg-secondary text-[#8b6d13]">{mutation.status}</Badge></TableCell></TableRow>)}</TableBody></Table></CardContent></Card>
  </div>;
}
