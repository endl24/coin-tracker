// src/utils.js

export const formatPrice = (priceData, isKrw) => {
  // 1. 데이터가 아예 없으면 방어
  if (priceData === undefined || priceData === null) return "로딩중...";

  // 2. 최종적으로 포장할 '숫자'를 담을 변수
  let targetPrice = priceData; 

  // 3. 만약 들어온 데이터가 숫자(Home)가 아니라 객체(Detail)라면?
  // 유틸 함수 안에서 알아서 원화/달러 숫자를 쏙 골라냅니다!
  if (typeof priceData === "object") {
    targetPrice = isKrw ? priceData.krw : priceData.usd;
  }

  // 데이터는 있는데 해당 화폐 가격만 비어있을 경우 방어
  if (targetPrice === undefined) return "정보 없음";

  // 4. 깔끔하게 포장해서 반환
  return isKrw
    ? targetPrice.toLocaleString("ko-KR", { style: "currency", currency: "KRW" })
    : targetPrice.toLocaleString("en-US", { style: "currency", currency: "USD" });
};