import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

import { UserButton } from "@clerk/nextjs";
import { BadgeDollarSign, Home, Menu, PiggyBank, Settings } from "lucide-react";

interface SidebarItemProps {
  className?: string;
  icon: React.ReactNode;
  label: string;
  href: string;
}

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/20">
      <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6 z-10">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <SidebarItem
            icon={<PiggyBank className="size-5" />}
            label="BudgetTracker"
            href="/"
          />
          <SidebarItem
            icon={<Home className="size-5" />}
            label="Dashboard"
            href="/"
          />
          <SidebarItem
            icon={<BadgeDollarSign className="size-5" />}
            label="Transactions"
            href="/transactions"
          />
          <SidebarItem
            icon={<Settings className="size-5" />}
            label="Settings"
            href="/settings"
          />
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
              <SheetClose asChild>
                <SidebarItem
                  className="hover:ml-1.5"
                  icon={<PiggyBank className="size-5" />}
                  label="BudgetTracker"
                  href="/"
                />
              </SheetClose>
              <Separator />
              <SheetClose asChild>
                <SidebarItem
                  className="hover:ml-1.5"
                  icon={<Home className="size-5" />}
                  label="Dashboard"
                  href="/"
                />
              </SheetClose>
              <SheetClose asChild>
                <SidebarItem
                  className="hover:ml-1.5"
                  icon={<BadgeDollarSign className="size-5" />}
                  label="Transactions"
                  href="/transactions"
                />
              </SheetClose>
              <SheetClose asChild>
                <SidebarItem
                  className="hover:ml-1.5"
                  icon={<Settings className="size-5" />}
                  label="Settings"
                  href="/settings"
                />
              </SheetClose>
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
          <UserButton />
        </div>
      </header>
      {children}
    </div>
  );
}

function SidebarItem({ className, icon, label, href }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground hover:scale-105 transition-all",
        className,
      )}
    >
      {icon}
      {label}
    </Link>
  );
}

export default MainLayout;
