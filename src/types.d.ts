export interface QuoteType {
  id: string;
  author: string;
  category: string;
  text: string;
}

export type QuoteApi = Omit<QuoteType, 'id'>

export interface QuoteList {
  [id: string]: QuoteType;
}