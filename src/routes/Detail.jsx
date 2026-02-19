import { Link } from "react-router-dom";
import { useParams, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Chart from "../components/Chart";
import Price from "../components/Price";
import { Helmet } from "react-helmet-async";
import { formatPrice } from "../utils";
import "./Detail.css";

function Detail({ isKrw, toggleCurrency }) {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [coin, setCoin] = useState({});
  const [isReadMore, setIsReadMore] = useState(false);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  useEffect(() => {
    const getCoin = async () => {
      const json = await (
        await fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
      ).json();
      console.log(json);
      setCoin(json);
      setLoading(false);
    };
    getCoin();
  }, [id]);

  return (
    <div className="container">
      <div className="nav-header">
        <Link to="/">Home으로 가기</Link>
        <button className="currency-toggle-btn" onClick={toggleCurrency}>
          {isKrw ? "USD로 보기" : "KRW로 보기"}
        </button>
      </div>
      <Helmet>
        <title>
          {loading ? "Loading..." : `${coin.name} | Crypto Tracker`}
        </title>
      </Helmet>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <header className="header">
            <img src={coin.image?.large} alt={coin.name} width="100" />
            <h1 className="title">{coin.name}</h1>
          </header>
          <div className="overview">
            <div className="overview-item">
              <span>Rank</span>
              <span>{coin.market_cap_rank}</span>
            </div>
            <div className="overview-item">
              <span>Current Price</span>
              <span>{formatPrice(coin.market_data?.current_price, isKrw)}</span>
            </div>
          </div>
          <div
            className={`description-wrapper ${isReadMore ? "expanded" : "collapsed"}`}
          >
            <p
              className="description"
              dangerouslySetInnerHTML={{
                __html: coin.description?.ko,
              }}
            ></p>
          </div>
          {coin.description?.ko && (
            <button onClick={toggleReadMore} className="read-more-btn">
              {isReadMore ? "접기 ▲" : "더보기 ▼"}
            </button>
          )}

          <div className="overview">
            <div className="overview-item">
              <span>High price</span>
              <span>{formatPrice(coin.market_data?.high_24h, isKrw)}</span>
              <span>Low Price</span>
              <span>{formatPrice(coin.market_data?.low_24h, isKrw)}</span>
            </div>
          </div>

          <div className="tabs">
            <div className="tab">
              <Link to={`/coin/${id}/chart`}>차트 보기</Link>
            </div>
            <div className="tab">
              <Link to={`/coin/${id}/price`}>가격 보기</Link>
            </div>
          </div>
          <Routes>
            <Route path="chart" element={<Chart />} />
            <Route path="price" element={<Price data={coin} isKrw={isKrw} />} />
          </Routes>
        </div>
      )}
    </div>
  );
}
export default Detail;
