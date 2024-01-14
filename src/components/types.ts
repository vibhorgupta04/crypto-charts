import type { ChartData, ChartOptions } from "chart.js";

// dashboard coins types
export interface IMainCoin {
  market_caps: Array<IPrice>;
  prices: Array<IPrice>;
  total_volumes: Array<IPrice>;
}

export interface IFormattedData {
  x: Date;
  y: TypeDataset;
}

export type TypeDataset = string | number;

export type IPrice = [TypeDataset, TypeDataset];

export interface LineProps {
  options: ChartOptions<"line">;
  data: ChartData<"line">;
}

export interface DurationOption {
  value: number;
  title: string;
}

export type CurrencyOptions = "INR" | "USD" | "GBP" | "EUR" | "YEN";

// types for search results
interface ICategories {
  id?: number;
  name?: string;
}
export interface ICoins {
  api_symbol?: string;
  id: string;
  large?: string;
  market_cap_rank?: number;
  name?: string;
  symbol?: string;
  thumb?: string;
}
interface IExchanges {
  id?: string;
  large?: string;
  market_type?: string;
  name?: string;
  thumb?: string;
}
interface INfts {
  id?: string;
  name?: string;
  thumb?: string;
  symbol?: string;
}
export interface ISearch {
  categories?: ICategories[];
  coins?: ICoins[];
  exchanges?: IExchanges[];
  icos?: Array<any>;
  nfts?: Array<INfts>;
}

// dropdown types

export interface DropdownState {
  chartData: string;
  cryptoData: string;
  currencyCountry: CurrencyOptions;
  daySelected: number;
  selectedCoins: string[];
}

export interface CoinSelectedState {
  coin: string;
}

export interface ApiDataState {
  market: Record<string, any>;
  trendCoin: any[];
  cryptoData: Record<string, any>;
}
