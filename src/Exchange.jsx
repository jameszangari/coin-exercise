import { useState, useEffect } from "react";
import "./App.css";

function App({ assetBase, assetQuote }) {
  const [coins, setCoins] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(
      `http://rest-sandbox.coinapi.io/v1/exchangerate/${assetBase}/${assetQuote}?apikey=${process.env.REACT_APP_COINAPI}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCoins(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);
  console.log(coins);

  if (isLoading)
    return (
      <div className="flex flex-row justify-center items-center uppercase">
        <p className="mr-2">Loading</p>
      </div>
    );
  if (!coins) return <p className="text-center">No data</p>;
  return <div className="m-4"></div>;
}

export default App;
