"use client";

import { FormEvent, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type ReportType = "purchase-order" | "receiving" | "warehouse" | "outlet" | "allocation" | "mutation" | "sales-order" | "products" | "payments" | "sales";
type ReportOption = { value: ReportType; label: string; description: string };

const reportOptions: ReportOption[] = [
  { value: "purchase-order", label: "Purchase Order", description: "Status PO, supplier, dan outstanding serial number." },
  { value: "receiving", label: "Receiving", description: "Hasil pencocokan SN PO dengan SN aktual receiving." },
  { value: "warehouse", label: "Warehouse Stock", description: "Stok warehouse berdasarkan SKU, lokasi, dan status." },
  { value: "outlet", label: "Outlet Stock", description: "Stok outlet dan mutasi antar outlet." },
  { value: "allocation", label: "Sales Allocation", description: "Alokasi stok warehouse ke sales." },
  { value: "mutation", label: "Stock Mutation", description: "Perpindahan SN antar sales dan outlet beserta audit trail." },
  { value: "sales-order", label: "Sales Order", description: "Order penjualan dan pengurangan stok Sales atau Outlet." },
  { value: "products", label: "Products & Pricing", description: "Master product, HPP, price rule, dan margin." },
  { value: "payments", label: "Payments & Reconciliation", description: "Payment, settlement, refund, dan rekonsiliasi." },
  { value: "sales", label: "Cellular Sales", description: "Penjualan device, SIM, dan aksesori seluler." },
];

export function ReportsPage() {
  const [reportType, setReportType] = useState<ReportType>("purchase-order");
  const [exported, setExported] = useState(false);
  const [previewed, setPreviewed] = useState(false);
  const selectedReport = reportOptions.find((option) => option.value === reportType) ?? reportOptions[0];

  function handleReportChange(value: string | null) {
    if (value && reportOptions.some((option) => option.value === value)) {
      setReportType(value as ReportType);
      setExported(false);
      setPreviewed(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setExported(true);
  }

  return <div className="mx-auto max-w-[1280px]"><Card><CardHeader><div className="flex items-center justify-between gap-4"><div><CardTitle>Pilih laporan</CardTitle><CardDescription className="mt-1">Tentukan report seluler dan parameter yang ingin digunakan.</CardDescription></div><Badge variant="outline" className="border-[#e8cf7d] bg-secondary text-[#8b6d13]">Export tersedia di sini</Badge></div></CardHeader><CardContent><form className="space-y-6" onSubmit={handleSubmit}><div><Label className="mb-2 text-foreground" htmlFor="report-type">Jenis laporan *</Label><Select onValueChange={handleReportChange} value={reportType}><SelectTrigger className="h-11 bg-white text-foreground" id="report-type"><SelectValue placeholder="Pilih laporan" /></SelectTrigger><SelectContent>{reportOptions.map((option) => <SelectItem className="text-foreground" key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectContent></Select><p className="mt-2 text-xs text-muted-foreground">{selectedReport.description}</p></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{renderInputs(reportType)}</div><div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs text-muted-foreground"><span className="font-semibold text-foreground">*</span> Field wajib diisi. Field lain bersifat optional.</p><div className="flex gap-2"><Button onClick={() => setPreviewed(true)} type="button" variant="outline">Preview laporan</Button><Button type="submit">Export laporan</Button></div></div>{previewed && <p className="rounded-xl bg-secondary px-4 py-3 text-sm font-medium text-secondary-foreground" role="status">Preview {selectedReport.label} berhasil dibuat. (Dummy)</p>}{exported && <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700" role="status">Laporan {selectedReport.label} siap diexport. (Dummy)</p>}</form></CardContent></Card></div>;
}

function renderInputs(reportType: ReportType) {
  if (reportType === "purchase-order") return <><ReportInput label="Dari tanggal" name="from" type="date" required /><ReportInput label="Sampai tanggal" name="to" type="date" required /><ReportInput label="Supplier" name="supplier" placeholder="Opsional" /><ReportInput label="Status PO" name="status" placeholder="Opsional" /></>;
  if (reportType === "receiving") return <><ReportInput label="Dari tanggal" name="from" type="date" required /><ReportInput label="Sampai tanggal" name="to" type="date" required /><ReportInput label="Nomor PO" name="po" placeholder="Opsional" /><ReportInput label="Status receiving" name="status" placeholder="Opsional" /></>;
  if (reportType === "warehouse") return <><ReportInput label="Per tanggal" name="asOf" type="date" required /><ReportInput label="SKU" name="sku" placeholder="Opsional" /><ReportInput label="Status stok" name="status" placeholder="Opsional" /><ReportInput label="Lokasi rak" name="location" placeholder="Opsional" /></>;
  if (reportType === "outlet") return <><ReportInput label="Per tanggal" name="asOf" type="date" required /><ReportInput label="Outlet" name="outlet" placeholder="Opsional" /><ReportInput label="SKU" name="sku" placeholder="Opsional" /><ReportInput label="Status stok" name="status" placeholder="Opsional" /></>;
  if (reportType === "allocation") return <><ReportInput label="Dari tanggal" name="from" type="date" required /><ReportInput label="Sampai tanggal" name="to" type="date" required /><ReportInput label="Sales" name="sales" placeholder="Opsional" /><ReportInput label="Status alokasi" name="status" placeholder="Opsional" /></>;
  if (reportType === "mutation") return <><ReportInput label="Dari tanggal" name="from" type="date" required /><ReportInput label="Sampai tanggal" name="to" type="date" required /><ReportInput label="Lokasi asal" name="source" placeholder="Opsional" /><ReportInput label="Lokasi tujuan" name="destination" placeholder="Opsional" /><ReportInput label="SN/IMEI/ICCID" name="serial" placeholder="Opsional" /><ReportInput label="Status mutasi" name="status" placeholder="Opsional" /></>;
  if (reportType === "sales-order") return <><ReportInput label="Dari tanggal" name="from" type="date" required /><ReportInput label="Sampai tanggal" name="to" type="date" required /><ReportInput label="Sumber stok" name="sourceType" placeholder="Opsional" /><ReportInput label="Sales / Outlet" name="source" placeholder="Opsional" /><ReportInput label="Customer" name="customer" placeholder="Opsional" /><ReportInput label="SN/IMEI/ICCID" name="serial" placeholder="Opsional" /><ReportInput label="Status order" name="status" placeholder="Opsional" /></>;
  if (reportType === "products") return <><ReportInput label="Per tanggal" name="asOf" type="date" required /><ReportInput label="SKU" name="sku" placeholder="Opsional" /><ReportInput label="Kategori" name="category" placeholder="Opsional" /><ReportInput label="Status price rule" name="status" placeholder="Opsional" /></>;
  if (reportType === "payments") return <><ReportInput label="Dari tanggal" name="from" type="date" required /><ReportInput label="Sampai tanggal" name="to" type="date" required /><ReportInput label="Metode payment" name="method" placeholder="Opsional" /><ReportInput label="Status settlement" name="settlement" placeholder="Opsional" /><ReportInput label="Outlet / Sales" name="owner" placeholder="Opsional" /></>;
  return <><ReportInput label="Dari tanggal" name="from" type="date" required /><ReportInput label="Sampai tanggal" name="to" type="date" required /><ReportInput label="Sales" name="sales" placeholder="Opsional" /><ReportInput label="SKU" name="sku" placeholder="Opsional" /></>;
}

function ReportInput({ label, name, placeholder, type = "text", required = false }: { label: string; name: string; placeholder?: string; type?: string; required?: boolean }) {
  return <div><Label className="mb-2 text-foreground" htmlFor={name}>{label}{required && <span className="ml-1 text-primary">*</span>}</Label><Input className="mt-2 h-11 bg-white" id={name} name={name} placeholder={placeholder} required={required} type={type} /></div>;
}
