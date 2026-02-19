import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { formatPrice } from "../utils";
import "./Home.css";

function Home({ isKrw, toggleCurrency }) {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [keyword, setKeyword] = useState("");

  const onChange = (event) => {
    setKeyword(event.target.value);
  };

  useEffect(() => {
    const getCoins = async () => {
      const json = await (
        await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${isKrw ? "krw" : "usd"}&order=market_cap_desc&per_page=100&page=1`,
        )
      ).json();
      setCoins(json);
      setLoading(false);
    };
    getCoins();
  }, [isKrw]);
  return (
    <div className="container">
      <Helmet>
        <title>All Coins | Crypto Tracker</title>
      </Helmet>
      <button className="currency-toggle-btn" onClick={toggleCurrency}>
        {isKrw ? "USD로 보기" : "KRW로 보기"}
      </button>
      <h1 className="header">Coin ({coins.length})</h1>
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          value={keyword}
          onChange={onChange}
          placeholder="Coin Search..."
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            border: "none",
            width: "80%",
            fontSize: "16px",
          }}
        />
      </div>
      {loading ? (
        <strong className="loader">Loading...</strong>
      ) : (
        <ul className="coins-list">
          {coins
            .filter((coin) =>
              coin.name.toLowerCase().includes(keyword.toLowerCase()),
            )
            .map((coin) => (
              <li key={coin.id} className="coin">
                <Link to={`/coin/${coin.id}`}>
                  {coin.name} ({coin.symbol}) :{" "}
                  {formatPrice(coin.current_price, isKrw)}
                </Link>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
