import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { OperationRow, OperationStat } from "@/app/_data/operations-dummy-data";

type OperationPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  action: string;
  stats: OperationStat[];
  rows: OperationRow[];
};

const statusStyles = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  danger: "border-red-200 bg-red-50 text-red-700",
  neutral: "border-border bg-muted text-muted-foreground",
};

export function OperationPage({ eyebrow, title, description, action, stats, rows }: OperationPageProps) {
  return (
    <div className="mx-auto max-w-[1280px]">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><p className="text-sm font-medium text-primary">{eyebrow}</p><h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground">{title}</h1><p className="mt-2 text-sm text-muted-foreground">{description}</p></div>
        <Button size="lg">{action}</Button>
      </div>
      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {stats.map((stat) => <Card key={stat.label}><CardContent className="p-5"><p className="text-sm text-muted-foreground">{stat.label}</p><p className="mt-2 text-2xl font-bold text-foreground">{stat.value}</p><p className="mt-2 text-xs font-medium text-[#b28a19]">{stat.detail}</p></CardContent></Card>)}
      </section>
      <Card className="mt-8">
        <CardHeader className="flex flex-row items-start justify-between gap-4 border-b"><div><CardTitle>Data terbaru</CardTitle><CardDescription className="mt-1">Data dummy untuk prototype OTIM.</CardDescription></div><Button variant="link" className="text-primary">Lihat semua</Button></CardHeader>
        <CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Nama</TableHead><TableHead>Detail</TableHead><TableHead className="text-right">Nilai</TableHead><TableHead className="text-right">Status</TableHead></TableRow></TableHeader><TableBody>{rows.map((row) => <TableRow key={row.primary}><TableCell className="font-semibold text-foreground">{row.primary}</TableCell><TableCell className="text-muted-foreground">{row.secondary}</TableCell><TableCell className="text-right font-semibold text-foreground">{row.value}</TableCell><TableCell className="text-right"><Badge variant="outline" className={statusStyles[row.statusTone]}>{row.status}</Badge></TableCell></TableRow>)}</TableBody></Table></CardContent>
      </Card>
    </div>
  );
}
