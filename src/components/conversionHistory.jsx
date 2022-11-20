import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import { deleteHistory } from "../utils/currencyExchangeSlice";

const ConversionHistory = () => {
  const navigate = useNavigate();
  const history = useSelector(
    (state) => state.currencyExchangeReducer.conversionHistory
  );

  const dispatch = useDispatch();

  const handleDelete = (uuid) => {
    dispatch(deleteHistory(uuid));
  };

  const handleView = (rowData) => {
    navigate(`/`, {state: { history: rowData }});
  }

  const renderedHistory = Object.keys(history)
    .map((key) => {
      const item = history[key];
      return (
        <tr key={key}>
          <td>{item.date ? item.date : "- - -"}</td>
          <td>
            Converted an amount of {item.amount} from{" "}
            {item.currencyFrom?.toUpperCase()} to {item.currencyTo?.toUpperCase()}
          </td>
          <td id="actionItems">
            <div className="primary-color flex-display">
              <button onClick={() => handleView(item) } className="primary-color row-container align-items-center">
                <RemoveRedEyeIcon />
                <p>View</p>
              </button>
              <button
                onClick={() => handleDelete(key)}
                className="warn-color row-container align-items-center"
              >
                <DeleteForeverIcon />
                <p>Delete from history</p>
              </button>
            </div>
          </td>
        </tr>
      );
    })
    .reverse();

  return (
    <section>
      <div className="card">
        <table className="w-100-p">
          <thead>
            <tr>
              <th>Date</th>
              <th>Event</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderedHistory}</tbody>
        </table>
      </div>
    </section>
  );
};

export default ConversionHistory;
