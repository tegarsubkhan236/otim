import type { PosStat } from "@/app/_data/pos-dummy-data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function StatCard({ stat }: { stat: PosStat }) {
  const isPositive = stat.trend === "up";

  return (
    <Card>
      <CardContent className="p-5">
      <div className="flex items-start justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-lg font-bold text-secondary-foreground">{stat.icon}</span>
        <Badge variant="outline" className={isPositive ? "border-emerald-200 bg-emerald-50 text-emerald-600" : "border-amber-200 bg-amber-50 text-amber-600"}>{stat.change}</Badge>
      </div>
      <p className="mt-5 text-sm text-slate-500">{stat.label}</p>
      <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">{stat.value}</p>
      </CardContent>
    </Card>
  );
}
