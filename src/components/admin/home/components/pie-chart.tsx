"use client";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
const data = [
  { name: "انگشتر", value: 15, color: "#10b981" },
  { name: "دستبند", value: 25, color: "#ef4444" },
  { name: "گردنبند", value: 50, color: "#6FB3FF" },
  { name: "گوشواره", value: 10, color: "#F7D000" },
];

export default function AdminPanelPieChart() {
  return (
    <div className="flex flex-col h-fit items-center border border-gray-200 shadow mb-10 py-2">
      <div className="font-bold">سهم فروش و سود هر دسته </div>
      <PieChart width={350} height={350}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={120}
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
