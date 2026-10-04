"use client";

import { ChangeEvent, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { purchaseOrderSerialNumbers } from "@/app/_data/cellular-dummy-data";

type SerialPanelMode = "po" | "receiving";

export function SerialNumberPanel({ mode }: { mode: SerialPanelMode }) {
  const [poId, setPoId] = useState(Object.keys(purchaseOrderSerialNumbers)[0]);
  const [serialNumbers, setSerialNumbers] = useState<string[]>([]);
  const [fileName, setFileName] = useState("");
  const [notice, setNotice] = useState("");
  const expectedSerialNumbers = purchaseOrderSerialNumbers[poId] ?? [];
  const duplicates = useMemo(() => serialNumbers.filter((serial, index) => serialNumbers.indexOf(serial) !== index), [serialNumbers]);
  const uniqueSerialNumbers = [...new Set(serialNumbers)];
  const matched = uniqueSerialNumbers.filter((serial) => expectedSerialNumbers.includes(serial));
  const unmatched = uniqueSerialNumbers.filter((serial) => !expectedSerialNumbers.includes(serial));
  const missing = expectedSerialNumbers.filter((serial) => !uniqueSerialNumbers.includes(serial));

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const content = await file.text();
    setFileName(file.name);
    setSerialNumbers(content.split(/[\n,;]+/).map((serial) => serial.trim()).filter(Boolean));
    setNotice("");
  }

  function handleSubmit() {
    setNotice(mode === "po" ? `${uniqueSerialNumbers.length} serial number disimpan di PO. (Dummy)` : matched.length === expectedSerialNumbers.length ? "Receiving Full Received. Semua SN cocok. (Dummy)" : `Receiving Partial Received. ${missing.length} SN masuk Outstanding PO. (Dummy)`);
  }

  return <Card className="mt-8"><CardHeader><CardTitle>{mode === "po" ? "Upload serial number PO" : "Upload serial number receiving"}</CardTitle><CardDescription>{mode === "po" ? "Upload daftar SN/IMEI/ICCID yang direncanakan pada PO." : "Upload SN aktual lalu cocokkan dengan SN yang terdaftar pada PO."}</CardDescription></CardHeader><CardContent className="space-y-5"><div className="max-w-md"><Label className="mb-2 text-foreground" htmlFor={`${mode}-po`}>Purchase Order</Label><Select onValueChange={(value) => { if (value) { setPoId(value); setSerialNumbers([]); setNotice(""); } }} value={poId}><SelectTrigger className="mt-2 h-10 bg-white text-foreground" id={`${mode}-po`}><SelectValue placeholder="Pilih PO" /></SelectTrigger><SelectContent>{Object.keys(purchaseOrderSerialNumbers).map((id) => <SelectItem className="text-foreground" key={id} value={id}>{id}</SelectItem>)}</SelectContent></Select></div><div><Label className="mb-2 text-foreground" htmlFor={`${mode}-file`}>File serial number <span className="text-primary">*</span></Label><Input accept=".csv,.txt" className="h-11 bg-white file:mr-3 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-1 file:text-xs file:font-semibold file:text-secondary-foreground" id={`${mode}-file`} onChange={handleFileChange} type="file" /><p className="mt-2 text-xs text-muted-foreground">Format CSV/TXT, satu SN per baris atau dipisahkan koma.</p>{fileName && <p className="mt-2 text-xs font-medium text-foreground">File: {fileName}</p>}</div>{serialNumbers.length > 0 && <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><Metric label="Total upload" value={uniqueSerialNumbers.length} /><Metric label="Duplikat" value={duplicates.length} tone={duplicates.length ? "danger" : "default"} />{mode === "receiving" && <><Metric label="SN cocok" value={matched.length} tone="success" /><Metric label="SN outstanding" value={missing.length} tone={missing.length ? "warning" : "success"} /></>}</div>}{mode === "receiving" && unmatched.length > 0 && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{unmatched.length} SN tidak ditemukan di PO dan tidak akan masuk stok warehouse.</p>}{notice && <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700" role="status">{notice}</p>}<Button disabled={!serialNumbers.length || duplicates.length > 0} onClick={handleSubmit} type="button">{mode === "po" ? "Simpan SN ke PO" : "Proses receiving"}</Button></CardContent></Card>;
}

function Metric({ label, value, tone = "default" }: { label: string; value: number; tone?: "default" | "success" | "warning" | "danger" }) { const styles = { default: "border-border bg-muted text-foreground", success: "border-emerald-200 bg-emerald-50 text-emerald-700", warning: "border-amber-200 bg-amber-50 text-amber-700", danger: "border-red-200 bg-red-50 text-red-700" }; return <div className={`rounded-xl border px-4 py-3 ${styles[tone]}`}><p className="text-xs opacity-75">{label}</p><div className="mt-1 flex items-center justify-between"><p className="text-xl font-bold">{value}</p><Badge variant="outline" className="border-current text-current">SN</Badge></div></div>; }
