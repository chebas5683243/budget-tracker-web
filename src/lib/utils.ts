import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(params: { amount: number; currency: string }) {
  const { amount, currency } = params;
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);
  } catch (e) {
    return `PEN ${amount}`;
  }
}

export function getLanguageName(langCode: string) {
  const displayNames = new Intl.DisplayNames([langCode], { type: "language" });
  return displayNames.of(langCode);
}

export function getMonthName(month: number) {
  const formatter = new Intl.DateTimeFormat("en", {
    month: "long",
  });

  return formatter.format(new Date(0, month, 1));
}

export function leftFillNum(num: number, targetLength: number, char = "0") {
  return num.toString().padStart(targetLength, char);
}
