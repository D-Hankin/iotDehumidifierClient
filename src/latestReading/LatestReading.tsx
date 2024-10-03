
interface Props {
    latestReading: Stat
}

interface Stat {
    id: string,
    temperature: string,
    humidity: string,
    timestamp: string,
    dehumidifierStatus: boolean
  }

function LatestReading(props: Props) {
  return (
    <h4>Latest reading: Temp - {props.latestReading.temperature}°C, Humidity - {props.latestReading.humidity}%</h4>
  )
}

export default LatestReading