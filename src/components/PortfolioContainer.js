import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ portfolio, stocks, handleClick}) {
  return (
    <div>
      <h2>My Portfolio</h2>
      {portfolio.map(stock => <Stock key={stock.id} stock={stock} handleClick={() => handleClick(stock)} />)}
    </div>
  );
}

export default PortfolioContainer;
