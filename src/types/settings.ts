export enum UserTheme {
  DEFAULT = "DEFAULT",
  LIGHT = "LIGHT",
  DARK = "DARK",
}

export enum Currency {
  EUR = "EUR",
  USD = "USD",
  PEN = "PEN",
  GBP = "GBP",
  JPY = "JPY",
  INR = "INR",
  CNY = "CNY",
  KRW = "KRW",
  BRL = "BRL",
  MXN = "MXN",
}

export enum Language {
  SPANISH = "SPANISH",
  ENGLISH = "ENGLISH",
}

export interface Settings {
  id: string;
  currency: Currency;
  language: Language;
  themePreference: UserTheme;
  user: {
    id: string;
  };
  lastUpdateDate: number;
}
