import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: 'Page D',
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: 'Page E',
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: 'Page F',
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

export default function LinearChart(props) {
  const data = [];

  for (let i = 0; i < props.days?.length; i++) {
    data.push({
      name: props.days[i],
      count: props.data[i]
    })
  }

  return (
    <ResponsiveContainer width="100%" height="110%">
      <LineChart width={400} height={200} style={{ marginLeft: '35%', marginTop: '-12%' }} data={data}>
        <Line type="monotone" dataKey="count" stroke="#205AB1" strokeWidth={2}  dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}