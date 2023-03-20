import { ApiRequestConfig } from './api.types';
import api from './api';

export type Quote = {
  id: string;
  quote: string;
  author: string;
};

export type TopQuotesResponse = {
  quotes: Quote[];
};

export const fetchTopQuotes = (config: ApiRequestConfig = {}) =>
  api
    .get<TopQuotesResponse>('api/quotes/top_quotes', config)
    .then((res) => res.data.quotes);

export const postQuote = (quote: Omit<Quote, 'id'>) =>
  api.post('api/quotes', quote);

export const resetQuotes = () => api.post('api/quotes/reset', {});

export type QuotesData = {
  quotes: Quote[];
  hasMore?: boolean;
};

export const fetchQuotesByPage = (page: number) =>
  api
    .get<QuotesData>('api/quotes', { params: { page } })
    .then((res) => res.data);

export type QuotesDataWithCursor = {
  quotes: Quote[];
  nextCursor: number | null;
};

export const fetchQuotesByCursor = (cursor: number) =>
  api
    .get<QuotesDataWithCursor>('api/quotes', { params: { cursor } })
    .then((res) => res.data);
