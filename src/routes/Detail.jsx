import { Link } from "react-router-dom";
import { useParams, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Chart from "../components/Chart"; 
import Price from "../components/Price"; 

function Detail() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [coin, setCoin] = useState({});
    
    useEffect(()=>{
        const getCoin = async () => {
        const json = await(
            await fetch(
                `https://api.coingecko.com/api/v3/coins/${id}`
            )
        ).json();
        console.log(json);
        setCoin(json);
        setLoading(false);
        };
        getCoin();
    }, [id])

    return(
        <div>
            <Link to="/">
                Home으로 가기
            </Link>
            {loading ? (
                <h1>Loading...</h1>
            ):(
                <div>
                    <img src={coin.image?.large} alt={coin.name} width="100"/>
                    <h1>{coin.name}</h1>
                    <p>Rank: {coin.market_cap_rank}</p>
                    <p>Current Price: ${coin.market_data?.current_price?.usd}</p>
                    <p>High Price: ${coin.market_data?.high_24h?.usd}</p>
                    <p>Low Price: ${coin.market_data?.low_24h?.usd}</p>
                    <p 
                        dangerouslySetInnerHTML={{
                            __html: coin.description?.en 
                        }}
                    ></p>
                    <div>
                       <Link to={`/coin/${id}/chart`}>차트 보기</Link>
                       {" | "}
                       <Link to={`/coin/${id}/price`}>가격 보기</Link>
                   </div>
                   <Routes>
                       <Route path="chart" element={<Chart />} />
                       <Route path="price" element={<Price />} />
                   </Routes>
                </div>

            )}
            
        </div>
    );
}
export default Detail;