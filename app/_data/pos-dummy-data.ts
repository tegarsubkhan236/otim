export type PosUser = {
  name: string;
  role: string;
  email: string;
};

export type PosStat = {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: string;
};

export type Transaction = {
  id: string;
  customer: string;
  date: string;
  amount: string;
  status: "Selesai" | "Diproses";
};

export type Product = {
  name: string;
  category: string;
  sold: number;
  stock: number;
  color: string;
};

export const demoUser: PosUser = {
  name: "Nadia Putri",
  role: "Kasir Utama",
  email: "nadia@otim.demo",
};

export const posStats: PosStat[] = [
  { label: "Penjualan hari ini", value: "Rp 12.480.000", change: "+12,8%", trend: "up", icon: "↗" },
  { label: "Total transaksi", value: "148", change: "+8,2%", trend: "up", icon: "▣" },
  { label: "Rata-rata transaksi", value: "Rp 84.324", change: "+4,6%", trend: "up", icon: "◉" },
  { label: "Stok menipis", value: "12 produk", change: "Perlu dicek", trend: "down", icon: "!" },
];

export const transactions: Transaction[] = [
  { id: "TRX-24081", customer: "Budi Santoso", date: "Hari ini, 14:32", amount: "Rp 245.000", status: "Selesai" },
  { id: "TRX-24080", customer: "Maya Sari", date: "Hari ini, 14:18", amount: "Rp 128.500", status: "Selesai" },
  { id: "TRX-24079", customer: "Toko Berkah", date: "Hari ini, 13:56", amount: "Rp 1.240.000", status: "Selesai" },
  { id: "TRX-24078", customer: "Rizky Ramadhan", date: "Hari ini, 13:41", amount: "Rp 87.000", status: "Diproses" },
];

export const popularProducts: Product[] = [
  { name: "Kopi Arabica Gayo", category: "Minuman", sold: 86, stock: 42, color: "bg-emerald-100 text-emerald-700" },
  { name: "Roti Croissant", category: "Bakery", sold: 64, stock: 18, color: "bg-amber-100 text-amber-700" },
  { name: "Teh Earl Grey", category: "Minuman", sold: 51, stock: 27, color: "bg-blue-100 text-blue-700" },
  { name: "Pasta Carbonara", category: "Makanan", sold: 38, stock: 9, color: "bg-rose-100 text-rose-700" },
];

export type AccessUser = {
  id: string;
  name: string;
  email: string;
  status: "Aktif" | "Nonaktif";
};

export type AccessRole = {
  id: string;
  name: string;
  description: string;
};

export type AccessPermission = {
  id: string;
  label: string;
  group: string;
};

export const accessUsers: AccessUser[] = [
  { id: "usr-001", name: "Nadia Putri", email: "nadia@otim.demo", status: "Aktif" },
  { id: "usr-002", name: "Raka Wijaya", email: "raka@otim.demo", status: "Aktif" },
  { id: "usr-003", name: "Sinta Lestari", email: "sinta@otim.demo", status: "Nonaktif" },
];

export const accessRoles: AccessRole[] = [
  { id: "role-owner", name: "Owner", description: "Akses penuh ke seluruh sistem." },
  { id: "role-manager", name: "Manager", description: "Mengelola operasional dan laporan toko." },
  { id: "role-cashier", name: "Cashier", description: "Memproses transaksi penjualan." },
];

export const accessPermissions: AccessPermission[] = [
  { id: "dashboard.view", label: "Melihat dashboard", group: "Dashboard" },
  { id: "transaction.view", label: "Melihat transaksi", group: "Transaksi" },
  { id: "transaction.create", label: "Membuat transaksi", group: "Transaksi" },
  { id: "product.manage", label: "Mengelola produk", group: "Produk" },
  { id: "report.view", label: "Melihat laporan", group: "Laporan" },
  { id: "user.manage", label: "Mengelola user", group: "User Access" },
];

export const initialRolePermissions: Record<string, string[]> = {
  "role-owner": accessPermissions.map((permission) => permission.id),
  "role-manager": ["dashboard.view", "transaction.view", "product.manage", "report.view"],
  "role-cashier": ["dashboard.view", "transaction.view", "transaction.create"],
};

export const initialUserRoles: Record<string, string[]> = {
  "usr-001": ["role-owner"],
  "usr-002": ["role-manager"],
  "usr-003": ["role-cashier"],
};
