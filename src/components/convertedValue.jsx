import React from "react";

const ConvertedValue = (props) => {

    const {convertedValue, amount, currencyFrom, currencyTo} = props;

    return (
        <div className="column-container align-items-center pt-24">
            <div className="flex-displat flex-row">
                <span className="converted-value-font ">{amount} {currencyFrom} = </span>
                <span className="converted-value-font accent-color font-bold">{convertedValue} {currencyTo}</span>
            </div>
            <div className="column-container">
                <span>1 {currencyFrom} = {(convertedValue/amount).toFixed(6)} {currencyTo}</span>
                <span>1 {currencyTo} = {(1/(convertedValue/amount)).toFixed(6)} {currencyFrom}</span>
            </div>
        </div>
    );

}

export default ConvertedValue