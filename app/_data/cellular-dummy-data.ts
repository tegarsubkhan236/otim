export type CellularSupplier = { id: string; name: string; contact: string; phone: string; status: "Active" | "Inactive" };
export type PurchaseOrder = { id: string; supplier: string; date: string; expected: string; total: string; status: "Draft" | "Approved" | "Sent" | "Partially Received" | "Completed" };
export type OutstandingPurchaseOrder = { poId: string; supplier: string; item: string; expectedQuantity: number; receivedQuantity: number; outstandingQuantity: number; outstandingSerialNumbers: string[] };
export type WarehouseItem = { sku: string; name: string; category: "Device" | "SIM" | "Accessory"; identifier: string; location: string; quantity: number; status: "Available" | "Reserved" | "In Transit" | "Sold" };
export type CellularOutlet = { id: string; name: string; city: string; manager: string; status: "Active" | "Inactive" };
export type StockTransfer = { id: string; destination: string; destinationType: "Outlet" | "Sales"; item: string; quantity: number; date: string; status: "Draft" | "In Transit" | "Received" };
export type SalesAllocation = { id: string; sales: string; item: string; identifier: string; quantity: number; status: "Allocated" | "Sold" };
export type MutationStatus = "Draft" | "Requested" | "Approved" | "In Transit" | "Received" | "Rejected" | "Cancelled";
export type StockMutation = { id: string; sourceType: "Sales" | "Outlet"; source: string; destinationType: "Sales" | "Outlet"; destination: string; serialNumbers: string[]; item: string; date: string; reason: string; status: MutationStatus; reference?: string };
export type SalesOrderStatus = "Draft" | "Submitted" | "Confirmed" | "Partially Validated" | "Completed" | "Cancelled" | "Rejected";
export type SellableStock = { id: string; ownerType: "Sales" | "Outlet"; owner: string; item: string; sku: string; serialNumbers: string[]; status: "Available" | "Sold" };
export type SalesOrder = { id: string; sourceType: "Sales" | "Outlet"; source: string; customer: string; item: string; serialNumbers: string[]; total: string; date: string; status: SalesOrderStatus };
export type ProductStatus = "Active" | "Inactive";
export type Product = { sku: string; name: string; category: "Device" | "SIM" | "Accessory"; identifier: "IMEI" | "Serial" | "ICCID" | "None"; unit: string; hpp: number; status: ProductStatus };
export type ProductCost = { id: string; sku: string; amount: number; currency: "IDR"; source: "PO" | "Freight" | "Import" | "Bundling" | "Adjustment"; effectiveFrom: string; status: "Draft" | "Pending Approval" | "Approved" | "Rejected" | "Expired" };
export type SellingPrice = { id: string; sku: string; channel: "Sales" | "Outlet" | "Direct"; owner?: string; customerSegment?: string; amount: number; minimumMargin: number; effectiveFrom: string; status: "Draft" | "Pending Approval" | "Active" | "Scheduled" | "Expired" | "Cancelled" };
export type PaymentStatus = "Pending" | "Authorized" | "Paid" | "Partially Paid" | "Failed" | "Expired" | "Refunded" | "Cancelled";
export type Payment = { id: string; orderId: string; customer: string; method: "Cash" | "Bank Transfer" | "QRIS" | "E-Wallet" | "Card" | "Credit/Tempo"; amount: number; total: number; status: PaymentStatus; settlement: "Unsettled" | "Settled" | "Settlement Failed" | "Reconciled"; reference: string; paidAt?: string };
export type CashEntry = { id: string; type: "Income" | "Expense"; category: string; party: string; amount: number; date: string; status: "Draft" | "Pending Approval" | "Approved" | "Received" | "Paid" | "Reversed" | "Cancelled"; account: string; reference: string };

export const cellularSuppliers: CellularSupplier[] = [
  { id: "sup-001", name: "PT Selular Nusantara", contact: "Andi Pratama", phone: "021-555-0188", status: "Active" },
  { id: "sup-002", name: "Global Device Distribution", contact: "Maya Sari", phone: "021-555-0234", status: "Active" },
  { id: "sup-003", name: "Aksesori Prima", contact: "Rudi Hartono", phone: "021-555-0312", status: "Inactive" },
];

export const purchaseOrders: PurchaseOrder[] = [
  { id: "PO-2026-0042", supplier: "PT Selular Nusantara", date: "12 Jun 2026", expected: "18 Jun 2026", total: "Rp 84.500.000", status: "Sent" },
  { id: "PO-2026-0041", supplier: "Global Device Distribution", date: "10 Jun 2026", expected: "15 Jun 2026", total: "Rp 126.750.000", status: "Partially Received" },
  { id: "PO-2026-0040", supplier: "Aksesori Prima", date: "08 Jun 2026", expected: "14 Jun 2026", total: "Rp 18.200.000", status: "Completed" },
];

export const purchaseOrderSerialNumbers: Record<string, string[]> = {
  "PO-2026-0042": ["356789104221101", "356789104221102", "356789104221103", "356789104221104", "356789104221105"],
  "PO-2026-0041": ["896210260001", "896210260002", "896210260003", "896210260004"],
};

export const warehouseReceipts = [
  { id: "RCV-0042", poId: "PO-2026-0042", receivedSerialNumbers: ["356789104221101", "356789104221102", "356789104221103"], status: "Partial Received" as const },
  { id: "RCV-0041", poId: "PO-2026-0041", receivedSerialNumbers: ["896210260001", "896210260002", "896210260003", "896210260004"], status: "Full Received" as const },
];

export const outstandingPurchaseOrders: OutstandingPurchaseOrder[] = [
  { poId: "PO-2026-0042", supplier: "PT Selular Nusantara", item: "OTIM Phone A55", expectedQuantity: 5, receivedQuantity: 3, outstandingQuantity: 2, outstandingSerialNumbers: ["356789104221104", "356789104221105"] },
];

export const warehouseItems: WarehouseItem[] = [
  { sku: "DEV-A55", name: "OTIM Phone A55", category: "Device", identifier: "IMEI 356789104221001", location: "WH-A / Rack 01", quantity: 24, status: "Available" },
  { sku: "SIM-25GB", name: "SIM OTIM 25GB", category: "SIM", identifier: "ICCID 896210260001", location: "WH-B / Rack 04", quantity: 240, status: "Available" },
  { sku: "ACC-USB-C", name: "USB-C Fast Charger", category: "Accessory", identifier: "Batch ACC-0626", location: "WH-C / Rack 02", quantity: 18, status: "Reserved" },
  { sku: "DEV-X12", name: "OTIM Phone X12", category: "Device", identifier: "IMEI 356789104221089", location: "Outlet Jakarta", quantity: 8, status: "In Transit" },
];

export const cellularOutlets: CellularOutlet[] = [
  { id: "out-001", name: "OTIM Jakarta Pusat", city: "Jakarta", manager: "Raka Wijaya", status: "Active" },
  { id: "out-002", name: "OTIM Bandung Dago", city: "Bandung", manager: "Sinta Lestari", status: "Active" },
  { id: "out-003", name: "OTIM Surabaya Tunjungan", city: "Surabaya", manager: "Dimas Hadi", status: "Active" },
];

export const stockTransfers: StockTransfer[] = [
  { id: "TRF-0019", destination: "OTIM Jakarta Pusat", destinationType: "Outlet", item: "OTIM Phone X12", quantity: 8, date: "14 Jun 2026", status: "In Transit" },
  { id: "TRF-0018", destination: "Raka Wijaya", destinationType: "Sales", item: "SIM OTIM 25GB", quantity: 50, date: "13 Jun 2026", status: "Received" },
  { id: "TRF-0017", destination: "OTIM Bandung Dago", destinationType: "Outlet", item: "USB-C Fast Charger", quantity: 12, date: "12 Jun 2026", status: "Received" },
];

export const salesAllocations: SalesAllocation[] = [
  { id: "ALL-0042", sales: "Raka Wijaya", item: "SIM OTIM 25GB", identifier: "Batch SIM-0626", quantity: 50, status: "Allocated" },
  { id: "ALL-0041", sales: "Nadia Putri", item: "OTIM Phone A55", identifier: "IMEI 356789104221001", quantity: 2, status: "Sold" },
  { id: "ALL-0040", sales: "Dimas Hadi", item: "USB-C Fast Charger", identifier: "Batch ACC-0626", quantity: 10, status: "Allocated" },
];

export const salesPeople = ["Raka Wijaya", "Nadia Putri", "Dimas Hadi", "Fajar Nugroho"];

export const stockMutations: StockMutation[] = [
  { id: "MUT-0007", sourceType: "Sales", source: "Raka Wijaya", destinationType: "Outlet", destination: "OTIM Jakarta Pusat", serialNumbers: ["896210260001", "896210260002"], item: "SIM OTIM 25GB", date: "15 Jun 2026", reason: "Salah distribusi warehouse ke sales", status: "Received", reference: "TRF-0018" },
  { id: "MUT-0006", sourceType: "Outlet", source: "OTIM Bandung Dago", destinationType: "Outlet", destination: "OTIM Jakarta Pusat", serialNumbers: ["356789104221089"], item: "OTIM Phone X12", date: "14 Jun 2026", reason: "Koreksi kebutuhan outlet", status: "In Transit", reference: "TRF-0019" },
  { id: "MUT-0005", sourceType: "Sales", source: "Nadia Putri", destinationType: "Sales", destination: "Dimas Hadi", serialNumbers: ["356789104221001"], item: "OTIM Phone A55", date: "13 Jun 2026", reason: "Perubahan area penjualan", status: "Requested" },
];

export const sellableStock: SellableStock[] = [
  { id: "SS-001", ownerType: "Sales", owner: "Raka Wijaya", item: "SIM OTIM 25GB", sku: "SIM-25GB", serialNumbers: ["896210260001", "896210260002", "896210260003"], status: "Available" },
  { id: "SS-002", ownerType: "Sales", owner: "Nadia Putri", item: "OTIM Phone A55", sku: "DEV-A55", serialNumbers: ["356789104221001", "356789104221002"], status: "Available" },
  { id: "OS-001", ownerType: "Outlet", owner: "OTIM Bandung Dago", item: "OTIM Phone X12", sku: "DEV-X12", serialNumbers: ["356789104221089", "356789104221090"], status: "Available" },
  { id: "OS-002", ownerType: "Outlet", owner: "OTIM Jakarta Pusat", item: "USB-C Fast Charger", sku: "ACC-USB-C", serialNumbers: ["ACC-0626-001", "ACC-0626-002", "ACC-0626-003"], status: "Available" },
];

export const salesOrders: SalesOrder[] = [
  { id: "SO-2026-0018", sourceType: "Sales", source: "Raka Wijaya", customer: "Budi Santoso", item: "SIM OTIM 25GB", serialNumbers: ["896210260004"], total: "Rp 75.000", date: "15 Jun 2026", status: "Completed" },
  { id: "SO-2026-0017", sourceType: "Outlet", source: "OTIM Jakarta Pusat", customer: "CV Maju Bersama", item: "USB-C Fast Charger", serialNumbers: ["ACC-0626-004"], total: "Rp 450.000", date: "14 Jun 2026", status: "Submitted" },
];

export const products: Product[] = [
  { sku: "DEV-A55", name: "OTIM Phone A55", category: "Device", identifier: "IMEI", unit: "Unit", hpp: 2850000, status: "Active" },
  { sku: "SIM-25GB", name: "SIM OTIM 25GB", category: "SIM", identifier: "ICCID", unit: "Kartu", hpp: 42000, status: "Active" },
  { sku: "ACC-USB-C", name: "USB-C Fast Charger", category: "Accessory", identifier: "Serial", unit: "Unit", hpp: 85000, status: "Active" },
  { sku: "DEV-X12", name: "OTIM Phone X12", category: "Device", identifier: "IMEI", unit: "Unit", hpp: 4100000, status: "Inactive" },
];

export const productCosts: ProductCost[] = [
  { id: "COST-001", sku: "DEV-A55", amount: 2850000, currency: "IDR", source: "PO", effectiveFrom: "2026-06-12", status: "Approved" },
  { id: "COST-002", sku: "SIM-25GB", amount: 42000, currency: "IDR", source: "PO", effectiveFrom: "2026-06-10", status: "Approved" },
];

export const sellingPrices: SellingPrice[] = [
  { id: "PRICE-001", sku: "DEV-A55", channel: "Sales", amount: 3299000, minimumMargin: 8, effectiveFrom: "2026-06-01", status: "Active" },
  { id: "PRICE-002", sku: "DEV-A55", channel: "Outlet", amount: 3399000, minimumMargin: 10, effectiveFrom: "2026-06-01", status: "Active" },
  { id: "PRICE-003", sku: "SIM-25GB", channel: "Sales", amount: 75000, minimumMargin: 15, effectiveFrom: "2026-06-01", status: "Active" },
  { id: "PRICE-004", sku: "ACC-USB-C", channel: "Outlet", amount: 150000, minimumMargin: 12, effectiveFrom: "2026-06-01", status: "Active" },
];

export const payments: Payment[] = [
  { id: "PAY-2026-0018", orderId: "SO-2026-0018", customer: "Budi Santoso", method: "QRIS", amount: 75000, total: 75000, status: "Paid", settlement: "Reconciled", reference: "QR-OTIM-0018", paidAt: "15 Jun 2026 10:32" },
  { id: "PAY-2026-0017", orderId: "SO-2026-0017", customer: "CV Maju Bersama", method: "Credit/Tempo", amount: 0, total: 450000, status: "Pending", settlement: "Unsettled", reference: "TERM-30D" },
  { id: "PAY-2026-0016", orderId: "SO-2026-0016", customer: "Sari Dewi", method: "Bank Transfer", amount: 1000000, total: 1250000, status: "Partially Paid", settlement: "Settled", reference: "TRF-88421", paidAt: "14 Jun 2026 16:20" },
];

export const cashEntries: CashEntry[] = [
  { id: "INC-2026-0018", type: "Income", category: "Sales Order", party: "Budi Santoso", amount: 75000, date: "15 Jun 2026", status: "Received", account: "QRIS OTIM", reference: "SO-2026-0018" },
  { id: "EXP-2026-0017", type: "Expense", category: "Supplier / PO", party: "PT Selular Nusantara", amount: 84500000, date: "14 Jun 2026", status: "Pending Approval", account: "Bank OTIM", reference: "PO-2026-0042" },
  { id: "EXP-2026-0016", type: "Expense", category: "Warehouse", party: "Jasa Logistik Prima", amount: 1850000, date: "13 Jun 2026", status: "Paid", account: "Bank OTIM", reference: "INV-LOG-0626" },
  { id: "INC-2026-0015", type: "Income", category: "Pelunasan Piutang", party: "CV Maju Bersama", amount: 450000, date: "12 Jun 2026", status: "Received", account: "Bank OTIM", reference: "SO-2026-0017" },
];
