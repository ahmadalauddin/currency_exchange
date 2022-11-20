import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const exchangeRateApi = createApi({
  reducerPath: "exchangeRateApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.exchangerate.host/" }),
  endpoints: (builder) => ({
    convertCurrency: builder.query({
      query: (queryArg) => {
        const { currencyFrom, currencyTo } = queryArg;
        return `convert?from=${currencyFrom}&to=${currencyTo}`;
      },
    }),
    getTimeseries: builder.query({
      query: (queryArg) => {
        const { startDate, endDate, baseCurrency, targetCurrency } = queryArg;
        return `timeseries?start_date=${startDate}&end_date=${endDate}&base=${baseCurrency}&symbols=${targetCurrency}`;
      },
    }),
  }),
})

export const { useConvertCurrencyQuery, useGetTimeseriesQuery } = exchangeRateApi;
