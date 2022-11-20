import React, { useState } from "react";
import CurrencyExchange from "../components/currencyExchange";
import ExchangeHistory from "../components/exchangeHistory";

const ConversionPage = () => {
  const [baseCurrency, setBaseCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [conversionFlag, setConversionFlag] = useState("");

  const handler = ( base, target, conversion ) => {
    setBaseCurrency(base);
    setTargetCurrency(target);
    setConversionFlag(conversion);
  };
  return (
    <div className="conversion-page column-container">
      <div className="page-title">I want to convert</div>
      <CurrencyExchange handler={handler} />
      <hr className="solid mt-48 mb-24" />
      {( baseCurrency && targetCurrency ) && (
        <ExchangeHistory
          baseCurrency={baseCurrency.toUpperCase()}
          targetCurrency={targetCurrency.toUpperCase()}
          conversionFlag={conversionFlag}
        />
      )}
    </div>
  );
};

export default ConversionPage;
