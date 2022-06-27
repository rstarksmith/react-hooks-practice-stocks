import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {

  const [stocks, setStocks] = useState([])
  const [portfolio, setPortfolio] = useState([])
  const [sortBy, setSortBy] = useState([])
  const [filterBy, setFilterBy] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/stocks')
    .then(resp => resp.json())
    .then(stocks => setStocks(stocks))
  }, [])

  const sortByAlpha = () => {
    return [...stocks].sort(function(a, b) {
        const nameA = a.name.toUpperCase()
        const nameB = b.name.toUpperCase()
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }

        return 0;
      });
  }

  const sortByPrice = () => {
    return [...stocks].sort(function (a, b) {
      return a.price - b.price
  });
  }

  const buyStock = (boughtStock) => {
    // console.log('bought', boughtStock)
    if(!portfolio.includes(boughtStock)){
    const newStockPortfolio = [...portfolio, boughtStock]
    setPortfolio(newStockPortfolio)
    }
  }
  
  const sellStock = (soldStock) => {
    // console.log("sold", soldStock)
    const updatedPortfolio = portfolio.filter(stock => stock.id !== soldStock.id)
    setPortfolio(updatedPortfolio)
  }

  const sortStocks = (e) => {
    setSortBy(e.target.value)
    if(e.target.value === 'Alphabetically'){
      const sortedStocks = sortByAlpha()
      setStocks(sortedStocks) 
    }else{
      const sortedStocks = sortByPrice()
      setStocks(sortedStocks)
    }
  }

  const filterStocks = (e) => {
    setFilterBy(e.target.value)
  }

  const filteredStocks = stocks.filter(stock => stock.type === filterBy)
  console.log(filteredStocks)
  
    
      

  return (
    <div>
      <SearchBar sortStocks={sortStocks} sortBy={sortBy} filterStocks={filterStocks}/>
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={stocks} handleClick={buyStock}/>
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} handleClick={sellStock} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
