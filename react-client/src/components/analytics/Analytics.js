import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
const Analytics = () => {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    setChartData({
      labels: ["monday", "tuesday", "wednesday"],
      datasets: [
        {
          label: "level of thick",
          data: [12, 23, 55],
          backgroundColor: ["red"],
          borderWidth: 4,
        },
      ],
    });
  };
  useEffect(() => {
    chart();
  }, []);
  return (
    <div className="ui internally celled grid">
      <div className="row">
        <div className="three wide column">
          <Bar
            data={chartData}
            width={100}
            height={50}
            options={{ maintainAspectRatio: false }}
          />
        </div>
        <div className="ten wide column">
          <Line data={chartData} />
        </div>
        <div className="three wide column">
          <img />
        </div>
      </div>
      <div className="row">
        <div className="three wide column">
          <img />
        </div>
        <div className="ten wide column">
          <p />
        </div>
        <div className="three wide column">
          <img />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
