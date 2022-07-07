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
      `https://rest.coinapi.io/v1/assets?apikey=${process.env.REACT_APP_COINAPI}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCoins(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);
  console.log(coins);

  // Search
  const [search, setSearch] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  // Compare
  const [baseSelected, setBaseSelected] = useState("");
  const handleBaseSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBaseSelected(e.currentTarget.value);
  };
  const baseSelectedCoins = coins.filter((coin) =>
    coin.name.includes(baseSelected)
  );

  const [selected, setSelected] = useState("");
  const handleSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.currentTarget.value);
  };
  const selectedCoins = coins.filter((coin) => coin.name.includes(selected));

  if (isLoading)
    return (
      <div className="flex flex-row justify-center items-center uppercase">
        <p className="mr-2">Loading</p>
      </div>
    );
  if (!coins) return <p className="text-center">No data</p>;
  return (
    <div className="m-4 p-4 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl text-center">Compare Currencies</h1>
        <div className="flex flex-row justify-center">
          <select
            value={baseSelected}
            name="baseSelected"
            id="baseSelected"
            onChange={handleBaseSelected}
            className="form-select appearance-none block w-16 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          >
            <option value="default" defaultValue={"default"} selected>
              Select currency
            </option>
            {coins.map((coin) => (
              <option
                className="text-black"
                key={coin.asset_id}
                value={coin.asset_id}
              >
                {coin.name}
              </option>
            ))}
          </select>
          <select
            value={selected}
            name="selected"
            id="selected"
            onChange={handleSelected}
            className="form-select appearance-none block w-16 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          >
            <option value="default" defaultValue={"default"} selected>
              Select currency
            </option>
            {coins.map((coin) => (
              <option
                className="text-black"
                key={coin.asset_id}
                value={coin.asset_id}
              >
                {coin.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-row justify-center gap-2">
          {baseSelected &&
            baseSelectedCoins.map((coin) => {
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
          {selectedCoins &&
            selectedCoins.map((coin) => {
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
      <div className="flex flex-row items-center justify-center">
        <h1 className="text-3xl mr-4">Search currency</h1>
        <form action="">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            onChange={handleSearch}
            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
