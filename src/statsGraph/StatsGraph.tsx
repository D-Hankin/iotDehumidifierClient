import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface Props {
    statsList: Stat[]
}

interface Stat {
    id: string,
    temperature: string,
    humidity: string,
    timestamp: string
}

function StatsGraph(props: Props) {
  return (
    <>
        <h2>Current Statistics</h2>
        <LineChart width={600} height={600} data={props.statsList}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="temperature" stroke="#ff7300" />
            <Line type="monotone" dataKey="humidity" stroke="#387908" />
        </LineChart>
    </>
  )
}

export default StatsGraph