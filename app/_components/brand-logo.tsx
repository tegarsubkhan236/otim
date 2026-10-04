import Image from "next/image";

type BrandLogoProps = {
  compact?: boolean;
};

export function BrandLogo({ compact = false }: BrandLogoProps) {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/img.png"
        alt="OTIM logo"
        width={compact ? 42 : 52}
        height={compact ? 42 : 52}
        className="rounded-xl bg-white p-1 object-contain"
        priority
      />
      {!compact && (
        <div>
          <p className="text-lg font-bold tracking-tight text-white">OTIM</p>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">Retail Platform</p>
        </div>
      )}
    </div>
  );
}
