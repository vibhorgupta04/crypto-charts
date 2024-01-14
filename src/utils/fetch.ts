import axios, { AxiosResponse } from "axios";
import { CurrencyOptions } from "../components/types";

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3/";

export const fetchExchangeList = async () => {
  try {
    const { data } = await axios.get(`${COINGECKO_API_URL}exchange_rates`);
    return { data, error: false };
  } catch (error) {
    return { data: null, error: true };
  }
};

export const fetchCoinData = async ({
  coin2,
  currencyData,
  day,
}: {
  coin2: string;
  currencyData: CurrencyOptions;
  day: number;
}) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${COINGECKO_API_URL}coins/${coin2}/market_chart`,
      {
        params: {
          vs_currency: currencyData.toLowerCase(),
          days: day,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchTrending = async () => {
  try {
    const response: AxiosResponse = await axios.get(
      `${COINGECKO_API_URL}search/trending`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchMarketChart = async ({
  coin,
  currencyData,
  day,
}: {
  coin: string;
  currencyData: CurrencyOptions;
  day: number;
}) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${COINGECKO_API_URL}coins/${coin}/market_chart`,
      {
        params: {
          vs_currency: currencyData.toLowerCase(),
          days: day,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchMarketsData = async ({
  currencyData,
}: {
  currencyData: CurrencyOptions;
}) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${COINGECKO_API_URL}coins/markets`,
      {
        params: {
          vs_currency: currencyData.toLowerCase(),
          order: "market_cap_desc",
          per_page: "200",
          page: "1",
        },
      }
    );
    return response;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export const fetchSearchResult = async ({ currency }: { currency: string }) => {
  try {
    const response = await axios.get(
      `${COINGECKO_API_URL}/search?query=${currency}`
    );
    return response?.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
