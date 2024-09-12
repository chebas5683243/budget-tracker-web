export interface Transaction {
  id: string;
  user: {
    id: string;
  };
  category: {
    id: string;
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
