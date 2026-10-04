import type { Product } from "@/app/_data/pos-dummy-data";
import { Badge } from "@/components/ui/badge";

export function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="space-y-4">
      {products.map((product, index) => (
        <div key={product.name} className="flex items-center gap-3">
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${product.color}`}>0{index + 1}</span>
          <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-foreground">{product.name}</p><p className="mt-0.5 text-xs text-muted-foreground">{product.category} · {product.sold} terjual</p></div>
          <Badge variant="outline" className={product.stock < 15 ? "border-red-200 bg-red-50 text-red-600" : "border-border text-muted-foreground"}>{product.stock} stok</Badge>
        </div>
      ))}
    </div>
  );
}
