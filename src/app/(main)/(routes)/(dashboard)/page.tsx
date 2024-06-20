import { DashboardHeader } from "./_components/header";
import { History } from "./_components/history";
import { Overview } from "./_components/overview";
import { Separator } from "@/components/ui/separator";

function DashboardPage() {
  return (
    <main>
      <DashboardHeader />
      <Separator className="w-full" />
      <Overview />
      <div className="mt-6" />
      <History />
    </main>
  );
}

export default DashboardPage;
