import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import ConvertedValue from "./convertedValue";

import { addHistory } from "../utils/currencyExchangeSlice";
import { useConvertCurrencyQuery } from "../apis/services";

const CurrencyExchange = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { handler } = props;
  let historyPayload = location.state && location.state.history;

  const [amount, setAmount] = useState(1);
  const [convertedValue, setConvertedValue] = useState(0);
  const [convertCurrency, setConvertCurrency] = useState(false);
  const [currencyFrom, setCurrencyFrom] = useState("");
  const [currencyTo, setCurrencyTo] = useState("");

  const { data, error, isLoading } = useConvertCurrencyQuery(
    { currencyFrom, currencyTo },
    { skip: !convertCurrency }
  );

  useEffect(() => {
    if (data && data?.result) {
      dispatch(
        addHistory({
          currencyFrom: currencyFrom,
          currencyTo: currencyTo,
          amount: amount,
          rate: data.info.rate,
          date: data.date,
        })
      );

      setConvertedValue(data.info.rate * amount);
      setConvertCurrency(false);
    }
  }, [data]);

  const handleConvert = () => {
    if (currencyFrom && currencyTo) {
      setConvertCurrency(true);
      handler(currencyFrom, currencyTo, convertCurrency, convertedValue);
    }
  };

  const invertCurrency = () => {
    setConvertedValue(0);
    setCurrencyFrom(currencyTo);
    setCurrencyTo(currencyFrom);
    handler();
  };

  const preloadHistory = () => {
    let hCurrencyFrom = historyPayload.currencyFrom;
    let hCurrencyTo = historyPayload.currencyTo;
    let hAmount = historyPayload.amount;

    setCurrencyFrom(hCurrencyFrom);
    setCurrencyTo(hCurrencyTo);
    setAmount(hAmount);
    historyPayload = {};
    handleConvert();
  };

  if (historyPayload && !convertCurrency) {
    preloadHistory();
    navigate(location.pathname, { replace: true });
  }

  return (
    <>
      <div className="currency-exchange">
        <div className="column-container ">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            required
            type="number"
            min={1}
            value={amount}
            onChange={(event) => setAmount(Number(event.target.value))}
          />
        </div>

        <div className="column-container ">
          <label htmlFor="currency-from-value">From</label>
          <input
            id="currency-from-value"
            type="text"
            required
            placeholder="Insert currency e.g. USD"
            pattern="[a-zA-Z]+"
            value={currencyFrom}
            maxLength="3"
            minLength="3"
            onChange={(event) => setCurrencyFrom(event.target.value)}
          />
        </div>

        <button className="icon-btn" onClick={invertCurrency}>
          <CompareArrowsIcon />
        </button>

        <div className="column-container ">
          <label htmlFor="currency-to-value">to</label>
          <input
            id="currency-to-value"
            type="text"
            required
            placeholder="Insert currency e.g. EUR"
            pattern="[a-zA-Z]+"
            value={currencyTo}
            maxLength="3"
            onChange={(event) => setCurrencyTo(event.target.value)}
          />
        </div>

        <button
          className="primary-btn"
          type="submit"
          disabled={!currencyFrom || !currencyTo || !amount}
          onClick={handleConvert}
        >
          Convert
        </button>
      </div>

      <div>
        {error ? <div> Oh no, there was an error</div> : null}
        {isLoading ? <>Loading...</> : null}
        {data?.result === null && <div className="mt-24 column-container align-items-center">No results found</div>}
        {convertedValue ? (
          <>
            <ConvertedValue
              convertedValue={convertedValue}
              amount={amount}
              currencyFrom={currencyFrom.toUpperCase()}
              currencyTo={currencyTo.toUpperCase()}
            />
          </>
        ) : null}
      </div>
    </>
  );
};

export default CurrencyExchange;
