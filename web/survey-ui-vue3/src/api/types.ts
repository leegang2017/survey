export interface ListPage<T> {
  count: number;
  page: number;
  pageSize: number;
  content: T[];
}

export interface Survey {
  category: string;
  name: string;
  code: string;
  status: string;
  questions: [object];
  conclusions: [object];
  created: string;
}
