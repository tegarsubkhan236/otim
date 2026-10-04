"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select as UiSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  accessPermissions,
  accessRoles,
  accessUsers,
  initialRolePermissions,
  initialUserRoles,
  type AccessRole,
  type AccessUser,
} from "@/app/_data/pos-dummy-data";

type AccessTab = "users" | "roles" | "acl" | "assignments";

const tabs: { id: AccessTab; label: string; description: string }[] = [
  { id: "users", label: "Add User", description: "Buat dan kelola pengguna" },
  { id: "roles", label: "Add Role", description: "Atur kelompok akses" },
  { id: "acl", label: "Role ACL", description: "Atur permission role" },
  { id: "assignments", label: "User Role", description: "Tetapkan role ke user" },
];

export function UserAccessPanel() {
  const [activeTab, setActiveTab] = useState<AccessTab>("users");
  const [users, setUsers] = useState<AccessUser[]>(accessUsers);
  const [roles, setRoles] = useState<AccessRole[]>(accessRoles);
  const [rolePermissions, setRolePermissions] = useState(initialRolePermissions);
  const [userRoles, setUserRoles] = useState(initialUserRoles);
  const [selectedRole, setSelectedRole] = useState(accessRoles[0].id);
  const [selectedUser, setSelectedUser] = useState(accessUsers[0].id);
  const [notice, setNotice] = useState("");

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2500);
  }

  function addUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    if (!name || !email) return;

    setUsers((current) => [...current, { id: `usr-${Date.now()}`, name, email, status: "Aktif" }]);
    event.currentTarget.reset();
    showNotice("User berhasil ditambahkan ke data dummy.");
  }

  function addRole(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const description = String(form.get("description") ?? "").trim();
    if (!name || !description) return;

    const role = { id: `role-${Date.now()}`, name, description };
    setRoles((current) => [...current, role]);
    setRolePermissions((current) => ({ ...current, [role.id]: [] }));
    setSelectedRole(role.id);
    event.currentTarget.reset();
    showNotice("Role berhasil ditambahkan ke data dummy.");
  }

  function togglePermission(permissionId: string) {
    setRolePermissions((current) => {
      const selected = current[selectedRole] ?? [];
      const next = selected.includes(permissionId) ? selected.filter((id) => id !== permissionId) : [...selected, permissionId];
      return { ...current, [selectedRole]: next };
    });
  }

  function toggleUserRole(roleId: string) {
    setUserRoles((current) => {
      const selected = current[selectedUser] ?? [];
      const next = selected.includes(roleId) ? selected.filter((id) => id !== roleId) : [...selected, roleId];
      return { ...current, [selectedUser]: next };
    });
  }

  return (
    <div>
      <Tabs className="w-full" onValueChange={(value) => setActiveTab(value as AccessTab)} value={activeTab}>
        <TabsList className="grid h-auto w-full grid-cols-2 gap-1 bg-muted p-1 md:grid-cols-4">
        {tabs.map((tab) => (
          <TabsTrigger className="h-auto min-h-16 flex-col items-start px-4 py-3 text-left data-active:bg-white data-active:text-primary" key={tab.id} value={tab.id}><span className="text-sm font-bold">{tab.label}</span><span className="mt-1 text-xs font-normal text-muted-foreground">{tab.description}</span></TabsTrigger>
        ))}
        </TabsList>
      </Tabs>
      {notice && <p className="mt-5 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700" role="status">{notice}</p>}
      <Card className="mt-6">
        <CardContent className="p-5 sm:p-6">
        {activeTab === "users" && <UserTab users={users} onSubmit={addUser} />}
        {activeTab === "roles" && <RoleTab roles={roles} onSubmit={addRole} />}
        {activeTab === "acl" && <AclTab roles={roles} selectedRole={selectedRole} permissions={rolePermissions[selectedRole] ?? []} onRoleChange={setSelectedRole} onToggle={togglePermission} />}
        {activeTab === "assignments" && <AssignmentTab users={users} roles={roles} selectedUser={selectedUser} assignedRoles={userRoles[selectedUser] ?? []} onUserChange={setSelectedUser} onToggle={toggleUserRole} />}
        </CardContent>
      </Card>
    </div>
  );
}

function UserTab({ users, onSubmit }: { users: AccessUser[]; onSubmit: (event: React.FormEvent<HTMLFormElement>) => void }) {
  const [query, setQuery] = useState("");
  const filteredUsers = users.filter((user) => `${user.name} ${user.email}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <PanelHeading title="Tambah user baru" description="Buat akun pengguna untuk mengakses sistem OTIM." />
      <form className="mt-5 grid items-end gap-3 rounded-xl bg-slate-50 p-3 md:grid-cols-[1fr_1fr_auto]" onSubmit={onSubmit}>
        <Field label="Nama lengkap" name="name" placeholder="Budi Santoso" />
        <Field label="Email" name="email" placeholder="budi@otim.demo" type="email" />
        <SubmitButton label="Tambah user" />
      </form>
      <ListHeader title="User terdaftar" count={users.length} query={query} onQueryChange={setQuery} placeholder="Cari nama atau email..." />
      <div className="divide-y divide-slate-100">
        {filteredUsers.length > 0 ? filteredUsers.map((user) => <div className="flex items-center justify-between gap-4 py-3" key={user.id}><div><p className="text-sm font-semibold text-foreground">{user.name}</p><p className="text-xs text-muted-foreground">{user.email}</p></div><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${user.status === "Aktif" ? "bg-emerald-50 text-emerald-600" : "bg-muted text-muted-foreground"}`}>{user.status}</span></div>) : <EmptyState />}
      </div>
    </div>
  );
}

function RoleTab({ roles, onSubmit }: { roles: AccessRole[]; onSubmit: (event: React.FormEvent<HTMLFormElement>) => void }) {
  const [query, setQuery] = useState("");
  const filteredRoles = roles.filter((role) => `${role.name} ${role.description}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <PanelHeading title="Tambah role baru" description="Buat role untuk mengelompokkan permission pengguna." />
      <form className="mt-5 grid items-end gap-3 rounded-xl bg-slate-50 p-3 md:grid-cols-[1fr_1.5fr_auto]" onSubmit={onSubmit}>
        <Field label="Nama role" name="name" placeholder="Supervisor" />
        <Field label="Deskripsi" name="description" placeholder="Tanggung jawab role" />
        <SubmitButton label="Tambah role" />
      </form>
      <ListHeader title="Role tersedia" count={roles.length} query={query} onQueryChange={setQuery} placeholder="Cari role..." />
      <div className="grid gap-3 md:grid-cols-3">
        {filteredRoles.length > 0 ? filteredRoles.map((role) => <div className="rounded-xl bg-muted p-4" key={role.id}><p className="text-sm font-bold text-foreground">{role.name}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{role.description}</p></div>) : <EmptyState />}
      </div>
    </div>
  );
}

function AclTab({ roles, selectedRole, permissions, onRoleChange, onToggle }: { roles: AccessRole[]; selectedRole: string; permissions: string[]; onRoleChange: (id: string) => void; onToggle: (id: string) => void }) {
  return <div><PanelHeading title="Atur permission role" description="Pilih permission yang dapat digunakan oleh setiap role." /><Select label="Pilih role" value={selectedRole} onChange={onRoleChange} options={roles.map((role) => ({ value: role.id, label: role.name }))} /><div className="mt-6 grid gap-3 md:grid-cols-2">{accessPermissions.map((permission) => <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-4 transition hover:border-primary" key={permission.id}><input checked={permissions.includes(permission.id)} className="h-4 w-4 accent-[#e51c2a]" onChange={() => onToggle(permission.id)} type="checkbox" /><span><span className="block text-sm font-semibold text-foreground">{permission.label}</span><span className="mt-1 block text-xs text-muted-foreground">{permission.group}</span></span></label>)}</div><p className="mt-5 text-xs text-muted-foreground">Perubahan ACL tersimpan sementara di state browser.</p></div>;
}

function AssignmentTab({ users, roles, selectedUser, assignedRoles, onUserChange, onToggle }: { users: AccessUser[]; roles: AccessRole[]; selectedUser: string; assignedRoles: string[]; onUserChange: (id: string) => void; onToggle: (id: string) => void }) {
  return <div><PanelHeading title="Tetapkan role ke user" description="Atur role yang dimiliki oleh setiap pengguna." /><Select label="Pilih user" value={selectedUser} onChange={onUserChange} options={users.map((user) => ({ value: user.id, label: `${user.name} · ${user.email}` }))} /><div className="mt-6 space-y-3">{roles.map((role) => <label className="flex cursor-pointer items-center justify-between rounded-xl border border-border p-4 transition hover:border-primary" key={role.id}><span><span className="block text-sm font-semibold text-foreground">{role.name}</span><span className="mt-1 block text-xs text-muted-foreground">{role.description}</span></span><input checked={assignedRoles.includes(role.id)} className="h-4 w-4 accent-[#e51c2a]" onChange={() => onToggle(role.id)} type="checkbox" /></label>)}</div><p className="mt-5 text-xs text-muted-foreground">Assignment tersimpan sementara di state browser.</p></div>;
}

function PanelHeading({ title, description }: { title: string; description: string }) { return <div><h2 className="text-lg font-bold text-foreground">{title}</h2><p className="mt-1 text-sm text-muted-foreground">{description}</p></div>; }
function ListHeader({ title, count, query, onQueryChange, placeholder }: { title: string; count: number; query: string; onQueryChange: (query: string) => void; placeholder: string }) { return <div className="mt-6 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between"><h3 className="text-sm font-bold text-foreground">{title} <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{count}</span></h3><Input aria-label={placeholder} className="h-9 w-full bg-white text-xs sm:max-w-xs" onChange={(event) => onQueryChange(event.target.value)} placeholder={placeholder} value={query} /> </div>; }
function EmptyState() { return <p className="py-8 text-center text-sm text-slate-400">Data tidak ditemukan.</p>; }
function Field({ label, name, placeholder, type = "text" }: { label: string; name: string; placeholder: string; type?: string }) { return <div><Label className="mb-1.5 text-xs text-muted-foreground" htmlFor={name}>{label}</Label><Input className="mt-1.5 h-10 bg-white" id={name} name={name} placeholder={placeholder} required type={type} /></div>; }
function SubmitButton({ label }: { label: string }) { return <Button type="submit">{label}</Button>; }
function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: { value: string; label: string }[] }) { return <div className="mt-6 max-w-xl"><Label className="mb-2 text-sm text-foreground" htmlFor={label}>{label}</Label><UiSelect onValueChange={(nextValue) => { if (nextValue) onChange(nextValue); }} value={value}><SelectTrigger className="mt-2 h-11 w-full bg-white text-foreground"><SelectValue placeholder={label} /></SelectTrigger><SelectContent>{options.map((option) => <SelectItem className="text-foreground" key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectContent></UiSelect></div>; }
