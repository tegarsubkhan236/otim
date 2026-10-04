import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { outstandingPurchaseOrders } from "@/app/_data/cellular-dummy-data";

export function PurchaseOrderOutstanding() {
  return <Card className="mt-8"><CardHeader><CardTitle>Outstanding PO</CardTitle><CardDescription>SN yang belum diterima sekarang tampil langsung di halaman Purchase Orders.</CardDescription></CardHeader><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>PO</TableHead><TableHead>Supplier</TableHead><TableHead>Item</TableHead><TableHead>Progress</TableHead><TableHead>SN outstanding</TableHead><TableHead className="text-right">Status</TableHead></TableRow></TableHeader><TableBody>{outstandingPurchaseOrders.map((po) => <TableRow key={po.poId}><TableCell className="font-semibold text-foreground">{po.poId}</TableCell><TableCell className="text-muted-foreground">{po.supplier}</TableCell><TableCell>{po.item}</TableCell><TableCell>{po.receivedQuantity}/{po.expectedQuantity} received</TableCell><TableCell><div className="max-w-xs space-y-1 text-xs text-muted-foreground">{po.outstandingSerialNumbers.map((serial) => <p key={serial}>{serial}</p>)}</div></TableCell><TableCell className="text-right"><Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">Outstanding</Badge></TableCell></TableRow>)}</TableBody></Table></CardContent></Card>;
}
