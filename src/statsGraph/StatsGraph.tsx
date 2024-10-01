import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Label } from 'recharts';

interface Props {
    statsList: Stat[]
}

interface Stat {
    id: string,
    temperature: string,
    humidity: string,
    timestamp: string,
    dehumidifierStatus: boolean,
    price: string | null
}

function StatsGraph(props: Props) {

  return (
    <>
        <h2>Todays Statistics</h2>
        <LineChart width={1000} height={600} margin={{ top: 60, right: 20, left: 20, bottom: 60 }} data={props.statsList}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="timestamp"
              tickFormatter={(timestamp) => {
                const date = new Date(timestamp);
                const timeLabel = date.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' }); 
                return timeLabel;
              }}
              label={{ value: new Date(props.statsList[0].timestamp).toLocaleDateString('sv-SE'), position: "insideBottomRight", offset: -10 }}
            />
            <YAxis>
              <Label value="Temp °C / Humidity % / Spot Price Öre" angle={-90} position="insideLeft" />
            </YAxis>
            <Tooltip />
            <Line type="monotone" dataKey="temperature" stroke="#ff7300" />
            <Line type="monotone" dataKey="humidity" stroke="#387908" />
            <Line type="monotone" dataKey="price" stroke="#0000ff" />
        </LineChart>
    </>
  )
}

export default StatsGraph