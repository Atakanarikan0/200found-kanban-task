import { useState, useEffect, createContext } from 'react'
export const DataContext = createContext(null)
import Header from "./assets/component/Header.jsx"

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await fetch('/data/data.json').then(r => r.json())
      setData(data.boards);
    }
    getData()
  }, [])


  return (
    <>
      <DataContext.Provider value={{data, setData}}>
        <Header />
        
      </DataContext.Provider>
    </>
  )
}

 
