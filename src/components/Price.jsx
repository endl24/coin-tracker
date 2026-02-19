import { formatPrice } from "../utils";

function Price({ data, isKrw }) {
  console.log(data);

  return (
    <div>
      <h1>Price Tab</h1>
      {data?.market_data ? (
        <>
          <div>
            <h3>역대 최고가 (ATH)</h3>
            <span>{formatPrice(data.market_data?.ath, isKrw)}</span>
          </div>

          <div>
             <h3>현재 가격</h3>
             <span>{formatPrice(data.market_data?.current_price, isKrw)}</span>
          </div>

          <div>
             <h3>시가총액</h3>
             <span>{formatPrice(data.market_data?.market_cap, isKrw)}</span>
          </div>
        </>
      ) : (
         "Loading..."
      )}
    </div>
  );
}

export default Price;