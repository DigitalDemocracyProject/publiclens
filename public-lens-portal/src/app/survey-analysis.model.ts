
export interface CrosstabResult {
  title: string;
  tables: TableResult[];
}


export interface TableResult {
  subtitle: string;
  table: TableData;
}

export interface TableData {
  index: string[];   // Row headers
  columns: string[]; // Column headers
  data: (string | number | null)[][];  // The 2D array of data
}
