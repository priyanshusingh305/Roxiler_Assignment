"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function BarChartStat({ data }: { data: any }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey="range" />
        <YAxis />
        <Tooltip cursor={{ fill: "transparent" }} />
        <Bar dataKey="count" fill="#82ca9d" animationDuration={1500} />
      </BarChart>
    </ResponsiveContainer>
  );
}
