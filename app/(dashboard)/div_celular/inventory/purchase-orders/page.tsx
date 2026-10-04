import { CellularDataPage } from "@/app/_components/cellular-data-page";
import { CellularForm } from "@/app/_components/cellular-form";
import { SerialNumberPanel } from "@/app/_components/serial-number-panel";
import { PurchaseOrderOutstanding } from "@/app/_components/purchase-order-outstanding";
import { purchaseOrders } from "@/app/_data/cellular-dummy-data";
export default function CellularPurchaseOrdersPage() { return <CellularDataPage eyebrow="Selular / Inventory / Procurement" title="Purchase Orders" description="Buat dan pantau permintaan barang ke supplier seluler." stats={[{ label: "Open PO", value: "12", detail: "4 menunggu approval" }, { label: "Dalam pengiriman", value: "5", detail: "Estimasi minggu ini" }, { label: "Nilai PO", value: "Rp 229 jt", detail: "Bulan berjalan" }]} rows={purchaseOrders.map((po) => ({ primary: po.id, secondary: `${po.supplier} · ${po.expected}`, value: po.total, status: po.status }))}><CellularForm kind="po" /><SerialNumberPanel mode="po" /><PurchaseOrderOutstanding /></CellularDataPage>; }
