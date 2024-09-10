export interface Category {
  id: string;
  user: {
    id: string;
  };
  name: string;
  icon: string;
  type: CategoryType;
  status: CategoryStatus;
  creationDate: number;
  lastUpdateDate: number;
}

export enum CategoryType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export enum CategoryStatus {
  ACTIVE = "ACTIVE",
  DELETED = "DELETED",
}
