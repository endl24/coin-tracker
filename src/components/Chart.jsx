import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApexCharts from "react-apexcharts";

function Chart() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const json = await (
        await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=usd&days=14`,
        )
      ).json();
      console.log(json);
      setData(json);
      setLoading(false);
    };
    getData();
  }, [id]);

  return (
    <div>
      {loading ? (
        "loading..."
      ) : (
        <ApexCharts
          type="candlestick"
          series={[
            {
              name: "Price",
              data: data?.map((price) => {
                return {
                  x: price[0],
                  y: [price[1], price[2], price[3], price[4]],
                };
              }),
            },
          ]}
          options={{
            theme: {
              mode: "dark", // 1. 다크 모드 (글자색이 흰색으로 바뀜)
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false, // 2. 우측 상단 툴바(다운로드 버튼 등) 숨기기
              },
              background: "transparent", // 3. 배경 투명하게
            },
            grid: { show: false }, // 4. 뒤에 모눈종이 선 없애기 (깔끔!)
            stroke: {
              curve: "smooth",
              width: 2,
            },
            yaxis: {
              show: false, // 5. Y축(가격) 숫자 숨기기 (너무 복잡해 보이면)
            },
            xaxis: {
              type: "datetime", // 6. X축을 시간으로 인식하게 함 (중요!)
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false }, // 7. 날짜 글자 숨기기 (심플하게)
            },
            // 👇 8. 상승/하락 색깔 지정 (빨강/파랑)
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#DF7D46", // 상승 색 (빨강 계열)
                  downward: "#3C90EB", // 하락 색 (파랑 계열)
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
