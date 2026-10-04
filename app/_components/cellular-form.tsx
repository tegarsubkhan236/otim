"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormKind = "po" | "supplier" | "receipt" | "distribution" | "sales";
const content: Record<FormKind, { title: string; description: string; action: string }> = {
  po: { title: "Buat Purchase Order", description: "Ajukan kebutuhan device, SIM, atau accessory ke supplier.", action: "Simpan PO" },
  supplier: { title: "Tambah Supplier", description: "Simpan partner supplier seluler OTIM.", action: "Simpan supplier" },
  receipt: { title: "Catat Penerimaan", description: "Masukkan barang yang sudah diterima warehouse.", action: "Simpan penerimaan" },
  distribution: { title: "Distribusikan Stok", description: "Bagikan stok langsung dari warehouse ke outlet atau sales.", action: "Buat distribusi" },
  sales: { title: "Alokasi ke Sales", description: "Alokasikan stok warehouse langsung kepada sales.", action: "Simpan alokasi" },
};

export function CellularForm({ kind }: { kind: FormKind }) {
  const [notice, setNotice] = useState("");
  const current = content[kind];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(`${current.title} berhasil disimpan. (Dummy)`);
    event.currentTarget.reset();
  }

  return <Card className="mt-8"><CardHeader><CardTitle>{current.title}</CardTitle><CardDescription>{current.description}</CardDescription></CardHeader><CardContent><form className="grid gap-4 md:grid-cols-3" onSubmit={handleSubmit}><Field label={kind === "supplier" ? "Nama supplier" : kind === "po" ? "Supplier" : kind === "receipt" ? "Nomor PO" : kind === "distribution" ? "Warehouse asal" : "Sales"} name="primary" placeholder={kind === "supplier" ? "PT Selular Nusantara" : "Pilih atau masukkan data"} required /><Field label={kind === "po" ? "Expected arrival" : kind === "supplier" ? "PIC" : "Item / SKU"} name="secondary" placeholder="Masukkan data" required /><Field label={kind === "supplier" ? "Nomor kontak" : "Quantity"} name="quantity" placeholder={kind === "supplier" ? "021-555-0188" : "0"} required type={kind === "supplier" ? "tel" : "number"} /><Field label={kind === "receipt" ? "IMEI / ICCID" : kind === "distribution" ? "Tujuan (Outlet / Sales)" : "Catatan"} name="optional" placeholder="Opsional" /><div className="flex items-end"><Button type="submit">{current.action}</Button></div></form>{notice && <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700" role="status">{notice}</p>}</CardContent></Card>;
}

function Field({ label, name, placeholder, required = false, type = "text" }: { label: string; name: string; placeholder: string; required?: boolean; type?: string }) { return <div><Label className="mb-2 text-foreground" htmlFor={`${name}-${label}`}>{label}{required && <span className="ml-1 text-primary">*</span>}</Label><Input className="mt-2 h-10 bg-white" id={`${name}-${label}`} name={name} placeholder={placeholder} required={required} type={type} /></div>; }
