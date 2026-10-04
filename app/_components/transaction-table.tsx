import type { Transaction } from "@/app/_data/pos-dummy-data";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function TransactionTable({ transactions }: { transactions: Transaction[] }) {
  return (
    <Table>
        <TableHeader><TableRow><TableHead>ID transaksi</TableHead><TableHead>Pelanggan</TableHead><TableHead>Waktu</TableHead><TableHead className="text-right">Total</TableHead><TableHead className="text-right">Status</TableHead></TableRow></TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id} className="text-muted-foreground"><TableCell className="font-semibold text-foreground">{transaction.id}</TableCell><TableCell>{transaction.customer}</TableCell><TableCell>{transaction.date}</TableCell><TableCell className="text-right font-semibold text-foreground">{transaction.amount}</TableCell><TableCell className="text-right"><Badge variant="outline" className={transaction.status === "Selesai" ? "border-emerald-200 bg-emerald-50 text-emerald-600" : "border-amber-200 bg-amber-50 text-amber-600"}>{transaction.status}</Badge></TableCell></TableRow>
          ))}
        </TableBody>
    </Table>
  );
}
