import { useEffect, useState } from 'react'
import './App.css'

interface Stat {
  id: string,
  temperature: string,
  humidity: string
}

function App() {

  const [statsList, setStatsList] = useState<Stat[]>([])

  useEffect(() => {
    fetchStats();

    const interval = setInterval(fetchStats, 20000);
    
    return () => clearInterval(interval);

  }, [])

  const fetchStats = () => {
    fetch("http://localhost:8080/client-to-db-and-back")
    .then(res => res.json())
    .then(data => {
      setStatsList(data);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
  }

  return (
    <>
      <h1>Sticky Walls</h1>
      <ul>
        {statsList.map((stat) => (
          <li key={stat.id}>{stat.temperature}, {stat.humidity}</li>
        ))}
      </ul>
    </>
  )
}

export default App
