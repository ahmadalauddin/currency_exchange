import React, { useState } from "react";
import moment from "moment";
import { Chart, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import { useGetTimeseriesQuery } from "../apis/services";
import "../sass/_exchange_History.scss";

moment().format();

const ExchangeHistory = (props) => {
  const { baseCurrency, targetCurrency, conversionFlag } = props;
  let defaultStartDate = moment().subtract(6, "days").format("YYYY-MM-DD");

  const [dataViewType, setDataViewType] = useState("table");
  const [duration, setDuration] = useState(7); //default 7 days
  const [startDate, setStartDate] = useState(defaultStartDate); //initially setting up the end date to 7 days before today
  const endDate = moment().format("YYYY-MM-DD"); //getting current date in yyyy-mm-dd

  const { data, error, isLoading } = useGetTimeseriesQuery(
    { startDate, endDate, baseCurrency, targetCurrency },
    { skip: conversionFlag }
  );

  var exchangeHistory = [];

  if (data) {
    Object.entries(data?.rates).map(([key, value]) => {
      if (Object.keys(value).length !== 0) {
        exchangeHistory.push({ date: key, rate: value[targetCurrency] });
      } else {
        exchangeHistory.push({
          date: key,
          rate: exchangeHistory[exchangeHistory.length - 1].rate,
        });
      }
    });
  }

  const chartData = {
    labels: exchangeHistory.map((obj) => obj.date),
    datasets: [
      {
        label: `Exchange History -  ${baseCurrency} to ${targetCurrency}`,
        data: exchangeHistory.map((obj) => obj.rate),
      },
    ],
  };

  var max = 0;
  var min = exchangeHistory[0]?.rate;
  exchangeHistory.forEach((ele) => {
    if (ele.rate > max) max = ele.rate;
    if (ele.rate < min) min = ele.rate;
  });

  var average =
    exchangeHistory.reduce((total, next) => total + next.rate, 0) /
    exchangeHistory.length;

  const handleChange = (event) => {
    setDuration(event.target.value);
    setStartDate(
      moment()
        .subtract(event.target.value - 1, "days")
        .format("YYYY-MM-DD")
    );
  };

  return (
    <>
      {error ? <>Oh no, there was an error</> : null}
      {isLoading ? <>Loading...</> : null}
      {( exchangeHistory  !== []) &&
      <>
      <span className="section-title">Exchange History</span>
      <div className="column-container mt-24">
        <div className="row-container align-items-end">
          <div className="duration-selection">
            <label htmlFor="duration">Duration</label>
            <select
              id="duration"
              placeholder="Choose a duration"
              value={duration}
              onChange={handleChange}
            >
              <option default value={7}>
                7 days
              </option>
              <option value={14}>14 days</option>
              <option value={30}>30 days</option>
            </select>
          </div>

          <div className="ml-16">
            <input
              type="radio"
              id="table"
              name="table"
              value="table"
              checked={dataViewType === "table"}
              onClick={() => {
                setDataViewType("table");
              }}
            />
            <span htmlFor="table">Table</span>

            <input
              type="radio"
              id="chart"
              name="chart"
              value="chart"
              className="ml-16"
              checked={dataViewType === "chart"}
              onClick={() => {
                setDataViewType("chart");
              }}
            />
            <span htmlFor="chart">Chart</span>
          </div>
        </div>

        <div className="row-container ">
          {dataViewType === "table" ? (
            <div className="card">
              <table id="exchange-history">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Exchange rate</th>
                  </tr>
                </thead>
                <tbody>
                  {exchangeHistory
                    .map((ele) => {
                      return (
                        <tr key={ele.date}>
                          <td>{ele.date ? ele.date : "NaN"}</td>
                          <td>{ele.rate ? ele.rate : "NaN"}</td>
                        </tr>
                      );
                    })
                    .reverse()}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="card p-16">
              <Line data={chartData} />
            </div>
          )}
          <div className="card">
            <table id="statistics">
              <thead>
                <tr>
                  <th>Statistics</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Lowest</td>
                  <td>{min ? min : "NaN"}</td>
                </tr>
                <tr>
                  <td>Highest</td>
                  <td>{max ? max : "NaN"}</td>
                </tr>
                <tr>
                  <td>Average</td>
                  <td>{average ? average : "NaN"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div></> }
    </>
  );
};

export default ExchangeHistory;
