export type OperationStat = {
  label: string;
  value: string;
  detail: string;
};

export type OperationRow = {
  primary: string;
  secondary: string;
  value: string;
  status: string;
  statusTone: "success" | "warning" | "danger" | "neutral";
};

export const operationPages = {
  pos: {
    eyebrow: "Penjualan",
    title: "Point of Sale",
    description: "Buat transaksi baru untuk semua unit bisnis OTIM.",
    action: "Mulai transaksi",
    stats: [
      { label: "Transaksi aktif", value: "3", detail: "Kasir sedang berjalan" },
      { label: "Penjualan hari ini", value: "Rp 12,4 jt", detail: "+12,8% dari kemarin" },
      { label: "Antrian pesanan", value: "8", detail: "Perlu diproses" },
    ],
    rows: [
      { primary: "TRX-24081", secondary: "Retail · Kasir 01", value: "Rp 245.000", status: "Siap dibayar", statusTone: "warning" as const },
      { primary: "ORD-10928", secondary: "FnB · Meja 04", value: "Rp 186.500", status: "Diproses", statusTone: "neutral" as const },
      { primary: "SVC-00881", secondary: "Seluler · Paket data", value: "Rp 75.000", status: "Selesai", statusTone: "success" as const },
    ],
  },
  transactions: {
    eyebrow: "Penjualan",
    title: "Transaksi",
    description: "Pantau seluruh transaksi retail, seluler, dan FnB.",
    action: "Filter transaksi",
    stats: [
      { label: "Total transaksi", value: "1.284", detail: "Bulan ini" },
      { label: "Berhasil", value: "1.248", detail: "97,2% dari total" },
      { label: "Refund", value: "12", detail: "Perlu ditinjau" },
    ],
    rows: [
      { primary: "TRX-24081", secondary: "Nadia Putri · Retail", value: "Rp 245.000", status: "Selesai", statusTone: "success" as const },
      { primary: "TRX-24080", secondary: "Raka Wijaya · FnB", value: "Rp 128.500", status: "Selesai", statusTone: "success" as const },
      { primary: "TRX-24079", secondary: "Sinta Lestari · Seluler", value: "Rp 1.240.000", status: "Refund", statusTone: "danger" as const },
    ],
  },
  products: {
    eyebrow: "Katalog",
    title: "Produk",
    description: "Kelola produk, menu FnB, dan layanan seluler OTIM.",
    action: "Tambah produk",
    stats: [
      { label: "Total item", value: "486", detail: "Di semua unit bisnis" },
      { label: "Produk aktif", value: "452", detail: "Siap dijual" },
      { label: "Draft", value: "34", detail: "Belum dipublikasikan" },
    ],
    rows: [
      { primary: "Kopi Arabica Gayo", secondary: "FnB · Minuman", value: "Rp 32.000", status: "Aktif", statusTone: "success" as const },
      { primary: "Paket Data 25 GB", secondary: "Seluler · Digital", value: "Rp 68.000", status: "Aktif", statusTone: "success" as const },
      { primary: "Kemeja Basic Linen", secondary: "Retail · Fashion", value: "Rp 189.000", status: "Draft", statusTone: "warning" as const },
    ],
  },
  inventory: {
    eyebrow: "Operasional",
    title: "Inventori",
    description: "Pantau stok barang, bahan baku, dan kebutuhan restock.",
    action: "Catat stok masuk",
    stats: [
      { label: "Total stok", value: "8.420", detail: "Unit tersedia" },
      { label: "Stok menipis", value: "12", detail: "Perlu restock" },
      { label: "Nilai inventori", value: "Rp 284 jt", detail: "Estimasi saat ini" },
    ],
    rows: [
      { primary: "Susu Full Cream", secondary: "FnB · Bahan baku", value: "8 unit tersisa", status: "Menipis", statusTone: "danger" as const },
      { primary: "Kartu Perdana OTIM", secondary: "Seluler · Aksesoris", value: "24 unit tersisa", status: "Aman", statusTone: "success" as const },
      { primary: "Kantong Belanja M", secondary: "Retail · Packaging", value: "142 unit tersisa", status: "Aman", statusTone: "success" as const },
    ],
  },
  customers: {
    eyebrow: "Relasi pelanggan",
    title: "Pelanggan",
    description: "Kenali dan layani pelanggan OTIM dengan lebih baik.",
    action: "Tambah pelanggan",
    stats: [
      { label: "Total pelanggan", value: "2.840", detail: "+186 bulan ini" },
      { label: "Pelanggan aktif", value: "1.968", detail: "Bertransaksi 30 hari" },
      { label: "Member premium", value: "284", detail: "Program loyalti" },
    ],
    rows: [
      { primary: "Budi Santoso", secondary: "Member Premium · 24 transaksi", value: "Rp 4.820.000", status: "Premium", statusTone: "success" as const },
      { primary: "Maya Sari", secondary: "Member Regular · 8 transaksi", value: "Rp 1.280.000", status: "Regular", statusTone: "neutral" as const },
      { primary: "Toko Berkah", secondary: "Business · 42 transaksi", value: "Rp 18.240.000", status: "Business", statusTone: "warning" as const },
    ],
  },
  reports: {
    eyebrow: "Insight bisnis",
    title: "Laporan",
    description: "Pahami performa OTIM berdasarkan unit bisnis dan periode.",
    action: "Preview laporan",
    stats: [
      { label: "Pendapatan bulan ini", value: "Rp 284 jt", detail: "+18,4% dari bulan lalu" },
      { label: "Margin rata-rata", value: "32,8%", detail: "+2,1% dari bulan lalu" },
      { label: "Unit terbaik", value: "Retail", detail: "Kontribusi 48%" },
    ],
    rows: [
      { primary: "Retail", secondary: "Pendapatan bulan ini", value: "Rp 136,3 jt", status: "+18,4%", statusTone: "success" as const },
      { primary: "FnB", secondary: "Pendapatan bulan ini", value: "Rp 98,5 jt", status: "+11,2%", statusTone: "success" as const },
      { primary: "Seluler", secondary: "Pendapatan bulan ini", value: "Rp 49,2 jt", status: "+8,7%", statusTone: "success" as const },
    ],
  },
};
