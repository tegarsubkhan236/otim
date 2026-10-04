import { UserAccessPanel } from "@/app/_components/user-access-panel";

export default function UserAccessPage() {
  return (
    <div className="mx-auto max-w-[1180px]">
      <div><p className="text-sm font-medium text-primary">Administration</p><h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground">User Access</h1><p className="mt-2 text-sm text-muted-foreground">Kelola pengguna, role, dan permission sistem OTIM.</p></div>
      <div className="mt-8"><UserAccessPanel /></div>
    </div>
  );
}
