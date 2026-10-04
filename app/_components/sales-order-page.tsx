"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { products, sellingPrices, salesOrders as initialOrders, sellableStock, type SellableStock } from "@/app/_data/cellular-dummy-data";

type SourceType = "Sales" | "Outlet";
const money = (value: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);

export function SalesOrderPage() {
  const [sourceType, setSourceType] = useState<SourceType>("Sales");
  const [source, setSource] = useState("");
  const [customer, setCustomer] = useState("");
  const [serialInput, setSerialInput] = useState("");
  const [stock, setStock] = useState<SellableStock[]>(sellableStock);
  const [orders, setOrders] = useState(initialOrders);
  const [validation, setValidation] = useState({ valid: [] as string[], invalid: [] as string[], duplicate: [] as string[] });
  const [notice, setNotice] = useState("");
  const [query, setQuery] = useState("");

  const availableStock = stock.filter((item) => item.ownerType === sourceType && (!source || item.owner === source) && item.status === "Available");
  const sources = [...new Set(stock.filter((item) => item.ownerType === sourceType).map((item) => item.owner))];
  const filteredOrders = useMemo(() => orders.filter((order) => `${order.id} ${order.source} ${order.customer} ${order.item} ${order.status}`.toLowerCase().includes(query.toLowerCase())), [orders, query]);
  const priceLines = availableStock.filter((item) => item.serialNumbers.some((serial) => validation.valid.includes(serial))).map((item) => {
    const product = products.find((candidate) => candidate.sku === item.sku);
    const priceRule = sellingPrices.find((rule) => rule.sku === item.sku && rule.channel === sourceType && rule.status === "Active");
    const quantity = item.serialNumbers.filter((serial) => validation.valid.includes(serial)).length;
    return { item: item.item, sku: item.sku, quantity, hpp: product?.hpp ?? 0, price: priceRule?.amount ?? 0, minimumMargin: priceRule?.minimumMargin ?? 0 };
  });
  const orderTotal = priceLines.reduce((total, line) => total + line.price * line.quantity, 0);

  function parseSerials() { return serialInput.split(/[\n,;]+/).map((serial) => serial.trim()).filter(Boolean); }

  function validateSerials() {
    const serials = parseSerials();
    const duplicate = [...new Set(serials.filter((serial, index) => serials.indexOf(serial) !== index))];
    const sourceSerials = availableStock.flatMap((item) => item.serialNumbers);
    const valid = [...new Set(serials.filter((serial) => sourceSerials.includes(serial) && !duplicate.includes(serial)))];
    const invalid = [...new Set(serials.filter((serial) => !sourceSerials.includes(serial)))];
    setValidation({ valid, invalid, duplicate });
    setNotice(invalid.length || duplicate.length ? "Validasi menemukan serial yang harus diperbaiki." : `${valid.length} serial valid. Harga dan margin siap dipreview.`);
  }

  function confirmOrder() {
    if (!source || !customer || !validation.valid.length || validation.invalid.length || validation.duplicate.length || priceLines.some((line) => !line.price)) { setNotice("Lengkapi sumber, customer, pricing aktif, dan pastikan semua serial valid."); return; }
    const sourceItems = availableStock.filter((item) => item.serialNumbers.some((serial) => validation.valid.includes(serial)));
    setStock((current) => current.map((item) => { if (!sourceItems.some((sourceItem) => sourceItem.id === item.id)) return item; const remaining = item.serialNumbers.filter((serial) => !validation.valid.includes(serial)); return { ...item, serialNumbers: remaining, status: remaining.length ? item.status : "Sold" }; }));
    setOrders((current) => [{ id: `SO-2026-${String(current.length + 19).padStart(4, "0")}`, sourceType, source, customer, item: [...new Set(sourceItems.map((item) => item.item))].join(", "), serialNumbers: validation.valid, total: money(orderTotal), date: "03 Okt 2026", status: "Completed" as const }, ...current]);
    setNotice(`${validation.valid.length} serial berhasil dijual dan stok ${sourceType} berkurang. Snapshot HPP dan harga tersimpan. (Dummy)`);
    setSerialInput(""); setValidation({ valid: [], invalid: [], duplicate: [] });
  }

  function handleSourceType(value: string | null) { if (value === "Sales" || value === "Outlet") { setSourceType(value); setSource(""); setValidation({ valid: [], invalid: [], duplicate: [] }); } }

  return <div className="mx-auto max-w-[1280px] space-y-8"><div><p className="text-sm font-medium text-primary">Sales / Order</p><h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground">Sales Order</h1><p className="mt-2 text-sm text-muted-foreground">Jual stok dari Sales atau Outlet dengan validasi SN/IMEI/ICCID dan harga dinamis.</p></div><div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]"><Card><CardHeader><CardTitle>Buat sales order</CardTitle><CardDescription>Stok hanya berkurang setelah serial valid dan snapshot harga dikonfirmasi.</CardDescription></CardHeader><CardContent className="space-y-5"><div className="grid gap-4 sm:grid-cols-2"><div><Label className="mb-2 text-foreground">Sumber stok *</Label><Select onValueChange={handleSourceType} value={sourceType}><SelectTrigger className="bg-white text-foreground"><SelectValue /></SelectTrigger><SelectContent><SelectItem className="text-foreground" value="Sales">Sales</SelectItem><SelectItem className="text-foreground" value="Outlet">Outlet</SelectItem></SelectContent></Select></div><div><Label className="mb-2 text-foreground">Pemilik stok *</Label><Select onValueChange={(value) => setSource(value ?? "")} value={source}><SelectTrigger className="bg-white text-foreground"><SelectValue placeholder={`Pilih ${sourceType.toLowerCase()}`} /></SelectTrigger><SelectContent>{sources.map((item) => <SelectItem className="text-foreground" key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></div></div><div><Label className="mb-2 text-foreground" htmlFor="sales-order-customer">Customer *</Label><Input className="bg-white" id="sales-order-customer" onChange={(event) => setCustomer(event.target.value)} placeholder="Nama customer" value={customer} /></div><div><Label className="mb-2 text-foreground" htmlFor="sales-order-serials">Upload/list SN/IMEI/ICCID *</Label><Input accept=".csv,.txt" className="mb-2 bg-white" onChange={(event) => { const file = event.target.files?.[0]; if (file) void file.text().then(setSerialInput); }} type="file" /><textarea className="min-h-28 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring" id="sales-order-serials" onChange={(event) => setSerialInput(event.target.value)} placeholder="Satu serial per baris atau pisahkan dengan koma" value={serialInput} /></div><div className="flex flex-wrap gap-2"><Button onClick={validateSerials} type="button" variant="outline">Validasi SN</Button><Button disabled={!validation.valid.length || validation.invalid.length > 0 || validation.duplicate.length > 0} onClick={confirmOrder} type="button">Konfirmasi order</Button></div>{validation.valid.length > 0 && <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">Valid: {validation.valid.join(", ")}</p>}{validation.invalid.length > 0 && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">Tidak ditemukan di sumber: {validation.invalid.join(", ")}</p>}{validation.duplicate.length > 0 && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">Duplikat: {validation.duplicate.join(", ")}</p>}{notice && <p className="rounded-xl bg-secondary px-4 py-3 text-sm font-medium text-secondary-foreground" role="status">{notice}</p>}</CardContent></Card><Card><CardHeader><CardTitle>Pricing snapshot</CardTitle><CardDescription>Harga mengikuti channel {sourceType} dan dikunci saat order dikonfirmasi.</CardDescription></CardHeader><CardContent className="space-y-3">{priceLines.length ? priceLines.map((line) => <div className="rounded-xl border border-border p-3" key={line.sku}><div className="flex items-center justify-between text-sm"><p className="font-semibold text-foreground">{line.item} · {line.quantity} unit</p><p className="font-semibold text-foreground">{money(line.price * line.quantity)}</p></div><p className="mt-2 text-xs text-muted-foreground">HPP {money(line.hpp)} · Harga {money(line.price)} · Margin minimum {line.minimumMargin}%</p></div>) : <p className="rounded-xl bg-muted p-4 text-sm text-muted-foreground">Validasi SN untuk melihat HPP dan harga jual.</p>}{priceLines.length > 0 && <div className="flex items-center justify-between border-t pt-3 font-semibold text-foreground"><span>Total Sales Order</span><span>{money(orderTotal)}</span></div>}</CardContent></Card></div><Card><CardHeader><CardTitle>Stok tersedia</CardTitle><CardDescription>{source ? `Stok milik ${source}` : `Pilih pemilik ${sourceType.toLowerCase()} untuk melihat detail.`}</CardDescription></CardHeader><CardContent className="space-y-3">{availableStock.length ? availableStock.map((item) => <div className="rounded-xl border border-border p-4" key={item.id}><div className="flex items-start justify-between gap-3"><div><p className="font-semibold text-foreground">{item.item}</p><p className="text-xs text-muted-foreground">{item.sku} · {item.owner}</p></div><Badge variant="outline" className="border-[#e8cf7d] bg-secondary text-[#8b6d13]">{item.serialNumbers.length} SN</Badge></div><p className="mt-3 text-xs leading-5 text-muted-foreground">{item.serialNumbers.join(", ")}</p></div>) : <p className="rounded-xl bg-muted p-4 text-sm text-muted-foreground">Tidak ada stok Available.</p>}</CardContent></Card><Card><CardHeader className="gap-4 sm:flex-row sm:items-center sm:justify-between"><div><CardTitle>Sales Order terbaru</CardTitle><CardDescription>Order dari stok Sales dan Outlet.</CardDescription></div><Input className="w-full bg-white sm:max-w-xs" onChange={(event) => setQuery(event.target.value)} placeholder="Cari order, customer, SN..." value={query} /></CardHeader><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Order</TableHead><TableHead>Sumber</TableHead><TableHead>Customer</TableHead><TableHead>Item / SN</TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody>{filteredOrders.map((order) => <TableRow key={order.id}><TableCell className="font-semibold text-foreground">{order.id}<div className="text-xs font-normal text-muted-foreground">{order.date}</div></TableCell><TableCell className="text-foreground">{order.source}<div className="text-xs text-muted-foreground">{order.sourceType}</div></TableCell><TableCell className="text-foreground">{order.customer}</TableCell><TableCell className="text-foreground">{order.item}<div className="text-xs text-muted-foreground">{order.serialNumbers.join(", ")} · {order.total}</div></TableCell><TableCell><Badge variant="outline" className="border-[#e8cf7d] bg-secondary text-[#8b6d13]">{order.status}</Badge></TableCell></TableRow>)}</TableBody></Table></CardContent></Card></div>;
}
