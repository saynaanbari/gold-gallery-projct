"use client";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "شنبه", price: 3450, sales: 12 },
  { day: "یکشنبه", price: 3480, sales: 18 },
  { day: "دوشنبه", price: 3420, sales: 15 },
  { day: "سه شنبه", price: 3510, sales: 22 },
  { day: "چهارشنبه", price: 3580, sales: 28 },
  { day: "پنجشنبه", price: 3550, sales: 35 },
  { day: "جمعه", price: 3620, sales: 42 },
];

export default function ComboChart() {
  return (
    <div className="border border-gray-200 shadow mb-15 py-2 px-5">
      <h3 className="font-extrabold mb-5 text-center">
        قیمت طلا (۱۸ عیار) <span className="text-amber-500">و</span> تعداد فروش
        روزانه
      </h3>
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="day" stroke="#9ca3af" />
          <YAxis
            yAxisId="left"
            label={{
              value: "قیمت (هزار تومان)",
              angle: -90,
              position: "insideLeft",
              style: { fill: "#d97706" },
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{
              value: "تعداد فروش",
              angle: 90,
              position: "insideRight",
              style: { fill: "#3b82f6" },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
          <Legend wrapperStyle={{ paddingTop: "12px" }} />
          <Bar
            yAxisId="right"
            dataKey="sales"
            name="تعداد فروش"
            fill="#3b82f6"
            radius={[8, 8, 0, 0]}
            barSize={40}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="price"
            name="قیمت طلا"
            stroke="#fbbf24"
            strokeWidth={3.5}
            dot={{ fill: "#f59e0b", r: 5, strokeWidth: 2, stroke: "white" }}
            activeDot={{ r: 7, fill: "#ea580c" }}
          />
        </ComposedChart>
      </ResponsiveContainer>
      <div className="text-xs text-gray-400 text-center mt-3">
        نوسانات قیمت طلا و تأثیر آن بر تعداد فروش روزانه
      </div>
    </div>
  );
}
