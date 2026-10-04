"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { BrandLogo } from "@/app/_components/brand-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const demoCredentials = { email: "operator@otim.demo", password: "otim123" };

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    setIsLoading(true);
    window.setTimeout(() => {
      if (email !== demoCredentials.email || password !== demoCredentials.password) {
        setError("Email atau password belum sesuai dengan akun demo.");
        setIsLoading(false);
        return;
      }

      sessionStorage.setItem("otim-demo-auth", "true");
      router.push("/div_celular/dashboard");
    }, 500);
  }

  return (
    <main className="flex min-h-screen bg-background">
      <section className="hidden flex-1 flex-col justify-between overflow-hidden bg-sidebar p-10 text-white lg:flex">
        <BrandLogo />
        <div className="relative max-w-lg"><div className="absolute -left-12 -top-12 h-64 w-64 rounded-full bg-primary/10 blur-3xl" /><p className="relative text-5xl font-bold leading-tight tracking-tight">Kelola bisnis lebih mudah, setiap hari.</p><p className="relative mt-6 max-w-md text-lg leading-8 text-sidebar-foreground/65">Satu platform untuk mengelola retail, seluler, dan FnB OTIM.</p></div>
        <p className="text-sm text-sidebar-foreground/50">© 2026 OTIM. Built for growing businesses.</p>
      </section>
      <section className="flex w-full items-center justify-center p-6 sm:p-10 lg:max-w-xl">
        <div className="w-full max-w-md">
          <div className="mb-10 lg:hidden"><Image src="/img.png" alt="OTIM logo" width={64} height={64} className="rounded-2xl bg-white object-contain p-1" /><p className="mt-4 text-xl font-bold text-foreground">OTIM</p></div>
          <p className="text-sm font-semibold text-primary">Selamat datang kembali</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">Masuk ke akun kamu</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Gunakan akun demo untuk melihat platform OTIM.</p>
          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div><Label className="mb-2 text-foreground" htmlFor="email">Email</Label><Input className="mt-2 h-11 bg-white" id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="operator@otim.demo" /></div>
            <div><div className="mb-2 flex items-center justify-between"><Label className="text-foreground" htmlFor="password">Password</Label><Button className="h-auto p-0 text-xs text-primary" variant="link" type="button">Lupa password?</Button></div><Input className="h-11 bg-white" id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" /></div>
            {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">{error}</p>}
            <Button className="h-11 w-full text-sm" disabled={isLoading} type="submit">{isLoading ? "Memeriksa akun..." : "Masuk ke dashboard"}</Button>
          </form>
          <div className="mt-6 rounded-xl border border-[#e8cf7d] bg-secondary p-4 text-xs leading-5 text-secondary-foreground"><p className="font-bold">Akun demo OTIM</p><p>Email: {demoCredentials.email}</p><p>Password: {demoCredentials.password}</p></div>
        </div>
      </section>
    </main>
  );
}
