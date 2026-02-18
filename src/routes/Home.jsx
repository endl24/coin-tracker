import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const getCoins = async () => {
      const json = await (
        await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1",
        )
      ).json();
      setCoins(json);
      setLoading(false);
    };
    getCoins();
  }, []);
  return (
    <div className="container">
      <h1 className="header">Coin ({coins.length})</h1>
      
      {loading ? (
        <strong className="loader">Loading...</strong>
      ) : (
        <ul className="coins-list">
          {coins.map((coin) => (
            <li key={coin.id} className="coin">
              <Link to={`/coin/${coin.id}`}>
                {coin.name} ({coin.symbol}) : ${coin.current_price}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
