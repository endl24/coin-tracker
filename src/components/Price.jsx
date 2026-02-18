function Price({ data }) {
  console.log(data);

  return (
    <div>
      <h1>Price Tab</h1>
      {data?.market_data ? (
        <>
          <div>
            <h3>역대 최고가 (ATH)</h3>
            {/* CoinGecko는 ath.usd 이렇게 씁니다 */}
            <span>${data.market_data.ath.usd}</span>
          </div>

          <div>
             <h3>현재 가격</h3>
             <span>${data.market_data.current_price.usd}</span>
          </div>

          <div>
             <h3>시가총액</h3>
             <span>${data.market_data.market_cap.usd}</span>
          </div>
        </>
      ) : (
         "Loading..."
      )}
    </div>
  );
}

export default Price;