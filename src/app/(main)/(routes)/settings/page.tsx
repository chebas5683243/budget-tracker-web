import { CategoryGroup } from "./_components/category-group";
import { CurrencyPicker } from "./_components/currency-picker";
import { Separator } from "@/components/ui/separator";
import { CategoryType } from "@/types/categories";

function SettingsPage() {
  return (
    <main>
      <div className="container flex flex-col py-8">
        <h2 className="text-3xl font-bold">Settings</h2>
        <p className="text-muted-foreground text-sm">
          Manage your account settings and categories
        </p>
      </div>
      <Separator className="w-full" />
      <div className="flex flex-col gap-4 container py-4">
        <CurrencyPicker />
        <CategoryGroup type={CategoryType.INCOME} />
        <CategoryGroup type={CategoryType.EXPENSE} />
      </div>
    </main>
  );
}

export default SettingsPage;
