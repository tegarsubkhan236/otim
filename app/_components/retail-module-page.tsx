import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const labels: Record<string, { title: string; description: string; eyebrow: string }> = {
  products: { title: "Products", description: "Kelola SKU, barcode, HPP, harga jual, batch, dan expiry retail.", eyebrow: "Retail / Master" },
  categories: { title: "Categories", description: "Kelola kategori produk swalayan dan tax class.", eyebrow: "Retail / Master" },
  brands: { title: "Brands", description: "Kelola brand produk retail.", eyebrow: "Retail / Master" },
  units: { title: "Units", description: "Kelola satuan produk dan konversi quantity.", eyebrow: "Retail / Master" },
  suppliers: { title: "Suppliers", description: "Kelola supplier dan payment term retail.", eyebrow: "Retail / Master" },
  customers: { title: "Customers", description: "Kelola customer dan member retail.", eyebrow: "Retail / Master" },
  warehouses: { title: "Warehouses", description: "Kelola gudang dan lokasi penyimpanan retail.", eyebrow: "Retail / Master" },
  outlets: { title: "Outlets", description: "Kelola toko, jam operasional, dan cashier scope.", eyebrow: "Retail / Master" },
  receiving: { title: "Receiving", description: "Terima barang berdasarkan PO dengan batch dan expiry.", eyebrow: "Retail / Inventory" },
  "stock-opname": { title: "Stock Opname", description: "Bandingkan physical count dengan quantity sistem.", eyebrow: "Retail / Inventory" },
  "stock-adjustment": { title: "Stock Adjustment", description: "Koreksi selisih stok dengan alasan dan approval.", eyebrow: "Retail / Inventory" },
  transfers: { title: "Transfers", description: "Pindahkan stok antar warehouse dan outlet.", eyebrow: "Retail / Inventory" },
  ledger: { title: "Inventory Ledger", description: "Histori stock in, stock out, sale, return, adjustment, dan transfer.", eyebrow: "Retail / Inventory" },
  transactions: { title: "POS Transactions", description: "Transaksi kasir retail dengan price snapshot dan payment.", eyebrow: "Retail / Sales" },
  returns: { title: "Sales Returns", description: "Kelola retur berdasarkan transaksi asli.", eyebrow: "Retail / Sales" },
  exchange: { title: "Exchange", description: "Kelola penukaran barang dan selisih harga.", eyebrow: "Retail / Sales" },
  "shift-closing": { title: "Shift Closing", description: "Tutup shift dan cocokkan expected cash dengan actual cash.", eyebrow: "Retail / Sales" },
  "purchase-invoice": { title: "Purchase Invoice", description: "Kelola invoice supplier dan pencocokan PO/receiving.", eyebrow: "Retail / Purchasing" },
  outstanding: { title: "Outstanding Supplier", description: "Pantau tagihan supplier yang belum dibayar.", eyebrow: "Retail / Purchasing" },
  members: { title: "Members", description: "Kelola member, tier, dan benefit customer.", eyebrow: "Retail / Customers" },
  loyalty: { title: "Loyalty Point", description: "Pantau earn, redeem, dan expiry loyalty point.", eyebrow: "Retail / Customers" },
};

export function RetailModulePage({ slug }: { slug: string }) {
  const page = labels[slug] ?? { title: slug, description: "Data retail OTIM.", eyebrow: "Retail" };
  const rows = [
    { primary: `${page.title} Demo 01`, secondary: "OTIM Retail / Jakarta", value: "12 records", status: "Active" },
    { primary: `${page.title} Demo 02`, secondary: "OTIM Retail / Bandung", value: "8 records", status: "Pending" },
    { primary: `${page.title} Demo 03`, secondary: "OTIM Retail / Surabaya", value: "5 records", status: "Active" },
  ];
  return <div className="mx-auto max-w-[1280px]"><p className="text-sm font-medium text-primary">{page.eyebrow}</p><h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground">{page.title}</h1><p className="mt-2 text-sm text-muted-foreground">{page.description}</p><section className="mt-8 grid gap-4 md:grid-cols-3">{[{ label: "Active", value: "24", detail: "Data aktif" }, { label: "Pending", value: "7", detail: "Perlu diproses" }, { label: "This month", value: "128", detail: "Bulan berjalan" }].map((stat) => <Card key={stat.label}><CardContent className="p-5"><p className="text-sm text-muted-foreground">{stat.label}</p><p className="mt-2 text-2xl font-bold text-foreground">{stat.value}</p><p className="mt-2 text-xs font-medium text-[#b28a19]">{stat.detail}</p></CardContent></Card>)}</section><Card className="mt-8"><CardHeader><CardTitle>Data retail</CardTitle><CardDescription>Data dummy berdasarkan business context Retail / Swalayan.</CardDescription></CardHeader><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Nama</TableHead><TableHead>Scope</TableHead><TableHead>Value</TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody>{rows.map((row) => <TableRow key={row.primary}><TableCell className="font-semibold text-foreground">{row.primary}</TableCell><TableCell className="text-muted-foreground">{row.secondary}</TableCell><TableCell>{row.value}</TableCell><TableCell><Badge variant="outline" className="border-[#e8cf7d] bg-secondary text-[#8b6d13]">{row.status}</Badge></TableCell></TableRow>)}</TableBody></Table></CardContent></Card></div>;
}
