import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const SchoolGrowthChart = ({ data = [] }) => (
  <div className="h-72 w-full">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 12, fill: "var(--color-text-subtle)" }}
          axisLine={{ stroke: "var(--color-border)" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "var(--color-text-subtle)" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            borderRadius: 8,
            borderColor: "var(--color-border)",
            fontSize: 13,
          }}
        />
        <Line
          type="monotone"
          dataKey="schools"
          stroke="var(--color-success-600)"
          strokeWidth={2}
          dot={{ r: 3, fill: "var(--color-success-600)" }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default SchoolGrowthChart;
