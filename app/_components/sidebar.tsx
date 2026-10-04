"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { BrandLogo } from "./brand-logo";
import { useBusiness } from "./business-context";

const sharedNavigation = [{ label: "Reports", href: "/reports", icon: "R" }, { label: "User Access", href: "/user-access", icon: "U" }];
const cellularMaster = [{ label: "Products", href: "/div_celular/master/products" }, { label: "Suppliers", href: "/div_celular/master/suppliers" }, { label: "Warehouse", href: "/div_celular/master/warehouse" }, { label: "Sales", href: "/div_celular/master/sales" }, { label: "Outlets", href: "/div_celular/master/outlets" }];
const cellularInventory = [{ label: "Purchase Orders", href: "/div_celular/inventory/purchase-orders" }, { label: "Receiving", href: "/div_celular/inventory/receipts" }, { label: "Distribution", href: "/div_celular/inventory/distribution" }, { label: "Mutasi Stok", href: "/div_celular/inventory/distribution/mutations" }];
const paymentNavigation = [{ label: "Payment Transactions", href: "/payments/transactions" }, { label: "Income", href: "/payments/income" }, { label: "Expenses", href: "/payments/expenses" }, { label: "Cashflow", href: "/payments/cashflow" }, { label: "Refunds", href: "/payments/refunds" }, { label: "Reconciliation", href: "/payments/reconciliation" }];

export function Sidebar({ mobileOpen = false, onClose }: { mobileOpen?: boolean; onClose?: () => void }) {
  return <><aside className="sticky top-0 z-30 hidden h-screen w-72 shrink-0 flex-col overflow-hidden border-r border-sidebar-border bg-sidebar px-5 py-6 shadow-[4px_0_18px_-12px_rgba(59,17,20,0.55)] lg:flex"><SidebarContent /></aside>{mobileOpen && <div className="fixed inset-0 z-50 bg-[#3b1114]/35 lg:hidden" onClick={onClose}><aside className="flex h-full w-[min(19rem,88vw)] flex-col overflow-hidden bg-sidebar px-5 py-6 shadow-2xl" onClick={(event) => event.stopPropagation()}><SidebarContent mobile onClose={onClose} /></aside></div>}</>;
}

function SidebarContent({ mobile = false, onClose }: { mobile?: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  const { business } = useBusiness();
  const isRetail = business === "retail";
  const [masterOpen, setMasterOpen] = useState(true);
  const [inventoryOpen, setInventoryOpen] = useState(true);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const close = mobile ? onClose : undefined;
  const homeHref = isRetail ? "/div_retail/dashboard" : "/div_celular/dashboard";

  return <><div className="mb-8 flex shrink-0 items-center justify-between px-2"><BrandLogo />{mobile && <button aria-label="Tutup menu" className="rounded-lg p-2 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground" onClick={onClose} type="button"><X className="size-5" /></button>}</div><nav className="min-h-0 flex-1 space-y-1 overflow-y-auto pr-1 [scrollbar-width:thin]"><NavigationLink active={pathname === homeHref} close={close} href={homeHref} icon="H" label={isRetail ? "Retail Home" : "Selular Home"} />{!isRetail && <><MenuGroup active={pathname.startsWith("/div_celular/master")} close={close} items={cellularMaster} label="Master" open={masterOpen} pathname={pathname} setOpen={setMasterOpen} /><MenuGroup active={pathname.startsWith("/div_celular/inventory")} close={close} items={cellularInventory} label="Inventory" open={inventoryOpen} pathname={pathname} setOpen={setInventoryOpen} /><NavigationLink active={pathname === "/div_celular/sales-orders"} close={close} href="/div_celular/sales-orders" icon="SO" label="Sales Order" /></>}<MenuGroup active={pathname.startsWith("/payments")} close={close} items={paymentNavigation} label="Payments" open={paymentOpen} pathname={pathname} setOpen={setPaymentOpen} />{sharedNavigation.map((item) => <NavigationLink active={pathname === item.href} close={close} href={item.href} icon={item.icon} label={item.label} key={item.href} />)}</nav></>;
}

function MenuGroup({ active, close, items, label, open, pathname, setOpen }: { active: boolean; close?: () => void; items: { label: string; href: string }[]; label: string; open: boolean; pathname: string; setOpen: (open: boolean) => void }) { return <><button className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${active ? "bg-sidebar-accent text-sidebar-foreground" : "text-sidebar-foreground/65 hover:bg-sidebar-accent hover:text-sidebar-foreground"}`} onClick={() => setOpen(!open)} type="button"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-xs font-semibold">{label.slice(0, 1)}</span><span className="flex-1 text-left">{label}</span>{open ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}</button>{open && <div className="ml-10 space-y-1 border-l border-sidebar-border pl-3">{items.map((item) => <Link className={`block rounded-lg px-3 py-2 text-xs transition ${pathname === item.href ? "bg-primary text-primary-foreground" : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"}`} href={item.href} key={item.href} onClick={close}>{item.label}</Link>)}</div>}</>; }
function NavigationLink({ active, close, href, icon, label }: { active: boolean; close?: () => void; href: string; icon: string; label: string }) { return <Link className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${active ? "bg-primary text-primary-foreground shadow-lg shadow-red-950/20" : "text-sidebar-foreground/65 hover:bg-sidebar-accent hover:text-sidebar-foreground"}`} href={href} onClick={close}><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-xs font-semibold">{icon}</span>{label}</Link>; }
