import { CategoryType } from "./categories";

export interface Transaction {
  id: string;
  user: {
    id: string;
  };
  category: {
    id: string;
    name: string;
    icon: string;
    type: CategoryType;
  };
  amount: number;
  description?: string;
  transactionDate: number;
  status: TransactionStatus;
  creationDate: number;
  lastUpdateDate: number;
}

export enum TransactionStatus {
  ACTIVE = "ACTIVE",
  DELETED = "DELETED",
}
