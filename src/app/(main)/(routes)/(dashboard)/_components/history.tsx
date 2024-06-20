"use client";

import { Card } from "@/components/ui/card";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    day: "01",
    income: 4000,
    expense: 2400,
    balance: 2400,
  },
  {
    day: "02",
    income: 3000,
    expense: 1398,
    balance: 2210,
  },
  {
    day: "03",
    income: 2000,
    expense: 3800,
    balance: 2290,
  },
  {
    day: "04",
    income: 2780,
    expense: 3908,
    balance: 2000,
  },
  {
    day: "05",
    income: 1890,
    expense: 4800,
    balance: 2181,
  },
  {
    day: "06",
    income: 2390,
    expense: 3800,
    balance: 2500,
  },
  {
    day: "07",
    income: 3490,
    expense: 4300,
    balance: 2100,
  },
  {
    day: "08",
    income: 0,
    expense: 0,
    balance: 0,
  },
  {
    day: "09",
    income: 0,
    expense: 0,
    balance: 0,
  },
  {
    day: "10",
    income: 0,
    expense: 0,
    balance: 0,
  },
  {
    day: "11",
    income: 0,
    expense: 0,
    balance: 0,
  },
  {
    day: "12",
    income: 0,
    expense: 0,
    balance: 0,
  },
  {
    day: "13",
    income: 0,
    expense: 0,
    balance: 0,
  },
  {
    day: "14",
    income: 0,
    expense: 0,
    balance: 0,
  },
  {
    day: "15",
    income: 0,
    expense: 0,
    balance: 0,
  },
  {
    day: "16",
    income: 0,
    expense: 0,
    balance: 0,
  },
  {
    day: "17",
    income: 0,
    expense: 0,
    balance: 0,
  },
  {
    day: "18",
    income: 0,
    expense: 0,
    balance: 0,
  },
  {
    day: "19",
    income: 0,
    expense: 0,
    balance: 0,
  },
  {
    day: "20",
    income: 0,
    expense: 0,
    balance: 0,
  },
  {
    day: "21",
    income: 0,
    expense: 0,
    balance: 0,
  },
  {
    day: "22",
    income: 0,
    expense: 0,
    balance: 0,
  },
  {
    day: "23",
    income: 0,
    expense: 0,
    balance: 0,
  },
  {
    day: "24",
    income: 0,
    expense: 0,
    balance: 0,
  },
  {
    day: "25",
    income: 0,
    expense: 0,
    balance: 0,
  },
  {
    day: "26",
    income: 0,
    expense: 0,
    balance: 0,
  },
  {
    day: "27",
    income: 0,
    expense: 0,
    balance: 0,
  },
  {
    day: "28",
    income: 0,
    expense: 0,
    balance: 0,
  },
  {
    day: "29",
    income: 0,
    expense: 0,
    balance: 0,
  },
  {
    day: "30",
    income: 0,
    expense: 0,
    balance: 0,
  },
  {
    day: "31",
    income: 0,
    expense: 0,
    balance: 0,
  },
];

export function History() {
  return (
    <div className="container">
      <div className="py-6">
        <h2 className="text-3xl font-bold">History</h2>
      </div>
      <Card className="flex items-center gap-3 p-2">
        {/* <CardContent className="min-h-64 bg-slate-50 w-full"> */}
        <ResponsiveContainer width="100%" height={300}>
          <BarChart height={300} width={500} data={data}>
            <defs>
              <linearGradient id="incomeBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#10b981" stopOpacity="1" />
                <stop offset="1" stopColor="#10b981" stopOpacity="0.1" />
              </linearGradient>

              <linearGradient id="expenseBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ef4444" stopOpacity="1" />
                <stop offset="1" stopColor="#ef4444" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray={4} opacity={0.3} />
            <XAxis
              axisLine={false}
              tickLine={false}
              dataKey="day"
              className="text-xs"
            />
            <YAxis axisLine={false} tickLine={false} className="text-xs" />
            <Tooltip
              cursor={{ className: "opacity-10" }}
              // eslint-disable-next-line
              content={({ payload }) => {
                const payloadData = payload?.[0]?.payload;

                return (
                  <Card className="flex flex-col p-2">
                    <span>Day: {payloadData?.day}</span>
                    <span>Income: {payloadData?.income}</span>
                    <span>Expense: {payloadData?.expense}</span>
                    <span>Balance: {payloadData?.balance}</span>
                  </Card>
                );
              }}
            />
            <Bar
              dataKey="income"
              fill="url(#incomeBar)"
              radius={4}
              label="Income"
            />
            <Bar
              dataKey="expense"
              label="Expense"
              fill="url(#expenseBar)"
              radius={4}
            />
          </BarChart>
        </ResponsiveContainer>
        {/* </CardContent> */}
      </Card>
    </div>
  );
}
