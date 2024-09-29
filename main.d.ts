import "@tanstack/react-table";

declare module "@tanstack/table-core" {
  // eslint-disable-next-line
  interface ColumnMeta<TData extends RowData, TValue> {
    style: {
      textAlign: "left" | "center" | "right";
    };
  }
}

declare global {
  type SetState<T> = (value: T | ((prevState: T) => T)) => void;
}
