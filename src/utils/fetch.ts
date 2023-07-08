import axios from "axios";

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3/";

export const fetchExchangeList = async () => {
  try {
    // to fetch available exchange list
    const { data } = await axios.get(`${COINGECKO_API_URL}exchange_rates`);
    return { data, error: false };
  } catch (error) {
    console.log(error);
    return { data: null, error: true };
  }
};
