"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const monthlyData = [
  { month: "آبان", sales: 210, profit: 42 },
  { month: "آذر", sales: 285, profit: 57 },
  { month: "دی", sales: 258, profit: 51 },
  { month: "بهمن", sales: 342, profit: 68 },
  { month: "اسفند", sales: 398, profit: 79 },
];

const COLORS = {
  sales: "#ec4899",
  profit: "#06b6d4",
};

export default function GroupedBarChart() {
  return (
    <div className="border border-gray-200 shadow py-2 px-4">
      <h3 className="font-extrabold mb-5 text-center">
        مقایسه فروش و سود ماهانه
      </h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
          <XAxis dataKey="month" />
          <YAxis
            yAxisId="left"
            label={{
              value: "فروش (میلیون)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{
              value: "سود (میلیون)",
              angle: 90,
              position: "insideRight",
            }}
          />
          <Tooltip formatter={(value) => `${value} میلیون تومان`} />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey="sales"
            name="فروش"
            fill={COLORS.sales}
            radius={[8, 8, 0, 0]}
            barSize={50}
          />
          <Bar
            yAxisId="right"
            dataKey="profit"
            name="سود"
            fill={COLORS.profit}
            radius={[8, 8, 0, 0]}
            barSize={50}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="text-xs text-gray-400 text-center mt-3">
        * مقایسه فروش خالص و سود خالص در ماه‌های اخیر
      </div>
    </div>
  );
}
