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
    const today = new Date().toISOString().substring(0, 10);
  
    const merged = statsList
      .filter(stat => new Date(stat.timestamp).toISOString().substring(0, 10) === today)
      .map(stat => {
        const statHour = new Date(stat.timestamp).toISOString().substring(0, 13); 
        
        const matchingPrice = elPrice.find(price => 
          new Date(price.time_start).toISOString().substring(0, 13) === statHour
        );
  
        return {
          ...stat,
          price: matchingPrice ? (matchingPrice.SEK_per_kWh * 100).toFixed(0) : null,
        };
      });
  
    setMergedData(merged);
    console.log(mergedData);
  }, [statsList, elPrice]);
  

  const fetchElPrice = () =>  {
    const today = new Date().toISOString();
    console.log(today);
    const elPriceUrl = "https://www.elprisetjustnu.se/api/v1/prices/" + today.slice(0, 4) + "/" + today.slice(5, 7) + "-" + today.slice(8,10) + "_SE4.json";
    console.log(elPriceUrl);
    fetch(elPriceUrl)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const prices: Price[] = data;
        setElPrice(prices);
      })
  }

  const fetchStats = () => {
    fetch("http://localhost:8080/get-data")
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
