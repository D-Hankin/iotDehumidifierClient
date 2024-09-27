import { useEffect, useState } from 'react'
import './App.css'
import Header from './header/Header'
import StatsGraph from './statsGraph/StatsGraph'

interface Stat {
  id: string,
  temperature: string,
  humidity: string,
  timestamp: string
}

function App() {

  const [statsList, setStatsList] = useState<Stat[]>([])

  useEffect(() => {
    fetchStats();

    const interval = setInterval(fetchStats, 10000);
    
    return () => clearInterval(interval);

  }, [])

  const fetchStats = () => {
    fetch("http://localhost:8080/get-data")
    .then(res => res.json())
    .then(data => {
      setStatsList(data);
      console.log(data);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
  }

  return (
    <>
      <Header header={"Sticky Walls"} />
      {/* <ul>
        {statsList.map((stat) => (
          <li key={stat.id}>Temp : {stat.temperature}, Humidity: {stat.humidity}%, Timestamp: {stat.timestamp}</li>
        ))}
      </ul> */}
      <StatsGraph statsList={statsList} />
    </>
  )
}

export default App
