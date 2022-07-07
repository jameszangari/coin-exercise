import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import Coin from "./Coin";

function App() {
  const [coins, setCoins] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(
      `http://rest-sandbox.coinapi.io/v1/assets?apikey=${process.env.REACT_APP_COINAPI}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCoins(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);
  console.log(coins);

  const [search, setSearch] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading)
    return (
      <div className="flex flex-row justify-center items-center uppercase">
        <p className="mr-2">Loading</p>
      </div>
    );
  if (!coins) return <p className="text-center">No data</p>;
  return (
    <div className="m-4 max-w-7xl mx-auto">
      <div className="flex flex-row items-center">
        <h1 className="text-xl">Search currency</h1>
        <form action="">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            onChange={handleSearch}
            className="block text-gray-700 ml-4 p-2"
          />
        </form>
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-2">
        {filteredCoins.map((coin) => {
          return (
            <Coin
              key={coin.asset_id}
              name={coin.name}
              dataQuoteStart={coin.data_quote_start}
              dataQuoteEnd={coin.data_quote_end}
              dataTradeStart={coin.data_trade_start}
              dataTradeEnd={coin.data_trade_end}
              dataSymbolsCount={coin.data_symbols_count}
              volumeDay={coin.volume_1day_usd}
              volumeHour={coin.volume_1hrs_usd}
              volumeMonth={coin.volume_1mth_usd}
              price={coin.price_usd}
              dataStart={coin.data_start}
              dataEnd={coin.data_end}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
