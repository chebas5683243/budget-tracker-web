import { Button } from "@/components/ui/button";

import { BadgeMinus, BadgePlus } from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
      <p className="text-3xl font-bold text-primary">Hello, Sebastian! 👋</p>
      <div className="flex items-center gap-3 flex-wrap">
        <Button type="button" variant="success">
          <BadgePlus className="mr-2 size-5" />
          New income
        </Button>
        <Button type="button" variant="danger">
          <BadgeMinus className="mr-2 size-5" />
          New expense
        </Button>
      </div>
    </div>
  );
}
