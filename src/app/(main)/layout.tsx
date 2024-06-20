import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
  BadgeDollarSign,
  CircleUser,
  Home,
  Menu,
  PiggyBank,
  Settings,
} from "lucide-react";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/20">
      <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6 z-10">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground hover:scale-105 transition-all"
          >
            <PiggyBank className="size-5" />
            BudgetTracker
          </Link>
          <Link
            href="/"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground hover:scale-105 transition-all"
          >
            <Home className="size-5" />
            Dashboard
          </Link>
          <Link
            href="/transactions"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground hover:scale-105 transition-all"
          >
            <BadgeDollarSign className="size-5" />
            Transactions
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground hover:scale-105 transition-all"
          >
            <Settings className="size-5" />
            Settings
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="size-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground hover:scale-105 hover:ml-1.5 transition-all"
              >
                <PiggyBank className="size-5" />
                BudgetTracker
              </Link>
              <Separator />
              <Link
                href="/"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground hover:scale-105 hover:ml-1.5 transition-all"
              >
                <Home className="size-5" />
                Dashboard
              </Link>
              <Link
                href="/transactions"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground hover:scale-105 hover:ml-1.5 transition-all"
              >
                <BadgeDollarSign className="size-5" />
                Transactions
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground hover:scale-105 hover:ml-1.5 transition-all"
              >
                <Settings className="size-5" />
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Link
          href="/"
          className="hidden xs:flex md:hidden items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground hover:scale-105 transition-all"
        >
          <PiggyBank className="size-5" />
          BudgetTracker
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="size-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </div>
      </header>
      {children}
    </div>
  );
}

export default MainLayout;
