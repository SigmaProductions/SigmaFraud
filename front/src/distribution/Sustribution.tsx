import React, { useEffect, useState } from "react";
import { getDistribution } from "../services/reports.service";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styled from "styled-components";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Props = {};

export default function Sustribution({}: Props) {
  const [distribution, setDistribution] = useState<number[]>();

  useEffect(() => {
    let req = getDistribution();
    req.catch((e) => {});
    req.then((res) => setDistribution(res));
  }, []);

  const options = {
    responsive: true,
    plugins: {
      maintainAspectRatio: false,
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Sussness od czasu",
      },
    },
  };

  var dateOffset = 24 * 60 * 60 * 1000;
  const nOfDays = 31;
  const labels = Array.from(Array(nOfDays).keys()).map((n) => {
    var d = new Date();
    d.setTime(d.getTime() - dateOffset * n);
    return d.toLocaleDateString();
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Incydenty",
        data: distribution,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const LineWrapper = styled.div`
    width: 80%;
    margin: auto;
  `;

  return (
    <LineWrapper>
      {distribution && options && <Line options={options} data={data} />}
    </LineWrapper>
  );
}
