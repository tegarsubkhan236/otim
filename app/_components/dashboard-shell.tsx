"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "./sidebar";
import { BusinessProvider, useBusiness } from "./business-context";
import { demoUser } from "@/app/_data/pos-dummy-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => { if (sessionStorage.getItem("otim-demo-auth") !== "true") router.replace("/login"); }, [router]);

  return <BusinessProvider><DashboardFrame onLogout={() => { sessionStorage.removeItem("otim-demo-auth"); router.replace("/login"); }}>{children}</DashboardFrame></BusinessProvider>;
}

function DashboardFrame({ children, onLogout }: { children: React.ReactNode; onLogout: () => void }) {
  const { business, setBusiness } = useBusiness();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  return <div className="flex min-h-screen bg-background"><Sidebar mobileOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} /><div className="min-w-0 flex-1"><header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-border bg-background/95 px-5 shadow-[0_4px_18px_-14px_rgba(59,17,20,0.6)] backdrop-blur sm:px-8"><div className="flex items-center gap-3"><button aria-label="Buka menu" className="rounded-xl p-2 text-foreground hover:bg-muted lg:hidden" onClick={() => setMobileSidebarOpen(true)} type="button"><Menu className="size-5" /></button><span className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:inline">Business</span><Select onValueChange={(value) => { if (value === "cellular" || value === "retail") { setBusiness(value); router.push(value === "retail" ? "/div_retail/dashboard" : "/div_celular/dashboard"); } }} value={business}><SelectTrigger className="h-10 w-52 bg-white text-foreground"><SelectValue /></SelectTrigger><SelectContent><SelectItem className="text-foreground" value="cellular">Selular</SelectItem><SelectItem className="text-foreground" value="retail">Retail / Swalayan</SelectItem></SelectContent></Select></div><DropdownMenu><DropdownMenuTrigger className="flex items-center gap-3 rounded-xl p-1.5 text-left outline-none transition hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"><div className="hidden sm:block"><p className="text-sm font-semibold text-foreground">{demoUser.name}</p><p className="text-xs text-muted-foreground">{demoUser.role}</p></div><Avatar className="border border-[#e8cf7d] bg-[#f8f1d9]"><AvatarFallback className="bg-[#f8f1d9] font-bold text-[#b28a19]">NP</AvatarFallback></Avatar></DropdownMenuTrigger><DropdownMenuContent align="end" className="w-64 rounded-2xl p-2"><DropdownMenuGroup><DropdownMenuLabel className="px-3 py-2"><p className="font-semibold text-foreground">{demoUser.name}</p><p className="mt-1 font-normal text-muted-foreground">{demoUser.email}</p></DropdownMenuLabel></DropdownMenuGroup><DropdownMenuSeparator /><DropdownMenuItem className="rounded-xl px-3 py-2 text-destructive focus:text-destructive" onClick={onLogout}>Keluar dari akun</DropdownMenuItem></DropdownMenuContent></DropdownMenu></header><main className="p-5 sm:p-8">{children}</main></div></div>;
}
