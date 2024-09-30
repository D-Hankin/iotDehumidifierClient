import { useEffect, useState } from 'react'
import './App.css'
import Header from './header/Header'
import StatsGraph from './statsGraph/StatsGraph'
import DehumidifierStatus from './dehumidifierStatus/DehumidifierStatus'

interface Stat {
  id: string,
  temperature: string,
  humidity: string,
  timestamp: string,
  dehumidifierStatus: boolean
}

interface Price {
  SEK_per_kWh: number,
  time_start: string
}

interface MergedData extends Stat {
  price: string | null
}

function App() {

  const [statsList, setStatsList] = useState<Stat[]>([])
  const [currentDehumidifierStatus, setCurrentDehumidifierStatus] = useState<boolean>(false)
  const [elPrice, setElPrice] = useState<Price[]>([]);
  const [mergedData, setMergedData] = useState<MergedData[]>([]);

  useEffect(() => {
    fetchStats();
    fetchElPrice();
    const interval = setInterval(() => {fetchStats(), fetchElPrice()}, 120000);
    
    return () => clearInterval(interval);

  }, [])

  useEffect(() => {
    const merged = statsList.map(stat => {
      const statHour = new Date(stat.timestamp).toISOString().substring(0, 13); 
      const matchingPrice = elPrice.find(price => 
        price.time_start.startsWith(statHour) 
      );

      return {
        ...stat,
        price: matchingPrice ? (matchingPrice.SEK_per_kWh * 100).toFixed(0) : null, 
      };
    });

    setMergedData(merged);
  }, [statsList, elPrice]);

  const fetchElPrice = () =>  {
    fetch("https://www.elprisetjustnu.se/api/v1/prices/2024/09-30_SE4.json")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const prices: Price[] = data;
        setElPrice(prices);
      })
  }

  const fetchStats = () => {
    fetch("https://localhost:8080/get-data")
    .then(res => res.json())
    .then(data => {
      setStatsList(data);
      setCurrentDehumidifierStatus(data[data.length - 1].dehumidifierStatus);
      console.log(data);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
  }

  return (
    <>
      <Header header={"Sticky Walls"} />
      <DehumidifierStatus currentDehumidifierStatus={currentDehumidifierStatus} />
      <StatsGraph statsList={mergedData} />
    </>
  )
}

export default App
