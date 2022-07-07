import { useState } from "react";

export default function Coin({
  name,
  dataQuoteStart,
  dataQuoteEnd,
  dataTradeStart,
  dataTradeEnd,
  dataSymbolsCount,
  volumeDay,
  volumeHour,
  volumeMonth,
  price,
  dataStart,
  dataEnd,
}: {
  name: string;
  dataQuoteStart: number;
  dataQuoteEnd: number;
  dataTradeStart: number;
  dataTradeEnd: number;
  dataSymbolsCount: number;
  volumeDay: number;
  volumeHour: number;
  volumeMonth: number;
  price: number;
  dataStart: number;
  dataEnd: number;
}) {
  const [toggle, setToggle] = useState(false);
  return (
    <button
      className="w-96 my-4 border border-gray-500 rounded-md"
      onClick={() => setToggle(!toggle)}
    >
      <div className="p-4">
        <div className="item">
          <h1 className="text-2xl font-bold">{name}</h1>
          {price && <p className="mt-4">Price USD: ${price}</p>}
        </div>
        <div className="item">
          <h1 className="mt-4 underline">Volume</h1>
          <p>
            <b>Day</b>: {volumeDay}
          </p>
          <p>
            <b>Hour</b>: {volumeHour}
          </p>
          <p>
            <b>Month</b>: {volumeMonth}
          </p>
        </div>
      </div>
      {toggle && (
        <div>
          <p>Data Quote Start: {dataQuoteStart}</p>
          <p>Data Quote End: {dataQuoteEnd}</p>
          <p>Data Trade Start: {dataTradeStart}</p>
          <p>Data Trade End: {dataTradeEnd}</p>
          <p>Data Symbols Count: {dataSymbolsCount}</p>
          <p>Data Start: {dataStart}</p>
          <p>Data End: {dataEnd}</p>
        </div>
      )}
    </button>
  );
}
