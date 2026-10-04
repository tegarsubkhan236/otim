import Image from "next/image";

export function StillThinkingPage() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
      <section className="w-full max-w-2xl rounded-3xl border border-[#e8cf7d] bg-[#fffdf7] p-6 text-center shadow-[0_18px_50px_-28px_rgba(59,17,20,0.45)] sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b28a19]">OTIM</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#3b1114] sm:text-5xl">Still Thinking</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
          Kami sedang menyiapkan halaman ini. Sementara itu, biarkan si kucing ikut berpikir dulu.
        </p>
        <Image
          alt="Kucing lucu yang sedang berpikir"
          className="mx-auto mt-8 h-auto w-full max-w-md"
          height={420}
          priority
          src="/still-thinking.svg"
          width={640}
        />
      </section>
    </div>
  );
}
