"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { payments as initialPayments, type Payment } from "@/app/_data/cellular-dummy-data";

const money = (value: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);

export function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const filtered = payments.filter((payment) => `${payment.id} ${payment.orderId} ${payment.customer} ${payment.reference} ${payment.status}`.toLowerCase().includes(query.toLowerCase()));

  function reconcile(paymentId: string) {
    setPayments((current) => current.map((payment) => payment.id === paymentId ? { ...payment, settlement: "Reconciled" } : payment));
    setNotice(`${paymentId} berhasil direkonsiliasi. (Dummy)`);
  }

  function refund(paymentId: string) {
    setPayments((current) => current.map((payment) => payment.id === paymentId ? { ...payment, status: "Refunded" } : payment));
    setNotice(`Refund untuk ${paymentId} dibuat sebagai record baru. (Dummy)`);
  }

  return <div className="mx-auto max-w-[1280px] space-y-8"><div><p className="text-sm font-medium text-primary">Finance / Payments</p><h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground">Payments</h1><p className="mt-2 text-sm text-muted-foreground">Pantau pembayaran, settlement, refund, dan rekonsiliasi dari Sales Order.</p></div><section className="grid gap-4 md:grid-cols-3"><Metric title="Paid" value={money(payments.filter((payment) => payment.status === "Paid").reduce((sum, payment) => sum + payment.amount, 0))} detail="Sudah dibayar" /><Metric title="Outstanding" value={money(payments.reduce((sum, payment) => sum + Math.max(payment.total - payment.amount, 0), 0))} detail="Sisa tagihan" /><Metric title="Perlu rekonsiliasi" value={String(payments.filter((payment) => payment.settlement !== "Reconciled").length)} detail="Payment belum selesai" /></section><Card><CardHeader className="gap-4 sm:flex-row sm:items-center sm:justify-between"><div><CardTitle>Payment terbaru</CardTitle><CardDescription>Total payment mengikuti snapshot Sales Order.</CardDescription></div><Input className="w-full bg-white sm:max-w-xs" onChange={(event) => setQuery(event.target.value)} placeholder="Cari payment, order, customer..." value={query} /></CardHeader><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Payment</TableHead><TableHead>Order / Customer</TableHead><TableHead>Metode</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead><TableHead>Action</TableHead></TableRow></TableHeader><TableBody>{filtered.map((payment) => <TableRow key={payment.id}><TableCell className="font-semibold text-foreground">{payment.id}<div className="text-xs font-normal text-muted-foreground">{payment.reference}</div></TableCell><TableCell>{payment.orderId}<div className="text-xs text-muted-foreground">{payment.customer}</div></TableCell><TableCell>{payment.method}</TableCell><TableCell>{money(payment.amount)}<div className="text-xs text-muted-foreground">of {money(payment.total)}</div></TableCell><TableCell><Badge variant="outline" className="border-[#e8cf7d] bg-secondary text-[#8b6d13]">{payment.status}</Badge><div className="mt-1 text-xs text-muted-foreground">{payment.settlement}</div></TableCell><TableCell><div className="flex gap-2">{payment.settlement !== "Reconciled" && <Button onClick={() => reconcile(payment.id)} size="sm" variant="outline">Reconcile</Button>}{payment.status === "Paid" && <Button onClick={() => refund(payment.id)} size="sm" variant="outline">Refund</Button>}</div></TableCell></TableRow>)}</TableBody></Table></CardContent></Card>{notice && <p className="rounded-xl bg-secondary px-4 py-3 text-sm font-medium text-secondary-foreground" role="status">{notice}</p>}</div>;
}

function Metric({ title, value, detail }: { title: string; value: string; detail: string }) { return <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">{title}</p><p className="mt-2 text-2xl font-bold text-foreground">{value}</p><p className="mt-2 text-xs font-medium text-[#b28a19]">{detail}</p></CardContent></Card>; }
