interface QuoteType {
  id: string;
  author: string;
  category: string;
  text: string;
}

export interface QuoteList {
  [id: string]: QuoteType;
}