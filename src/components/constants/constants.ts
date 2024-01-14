import { CurrencyOptions, DurationOption } from "../types";

export const durationOptions: DurationOption[] = [
  { value: 1, title: "1D" },
  { value: 7, title: "1W" },
  { value: 30, title: "1M" },
  { value: 90, title: "3M" },
  { value: 180, title: "6M" },
  { value: 364, title: "1Y" },
];

export const options: any = {
  elements: {
    point: {
      radius: 0,
    },
  },
};

export const optionsLineMarker: any = {
  elements: {
    point: {
      radius: 1,
    },
  },
};

export const optionsBar: any = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: false,
        },
      },
    ],
  },
};

export const currencyOptions: CurrencyOptions[] = [
  "INR",
  "USD",
  "GBP",
  "EUR",
  "YEN",
];

export const chartTypeOptions = ["Bar", "Line", "Line with Markers"];
