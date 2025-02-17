import { useState, useEffect, createContext } from 'react'
import './App.css'
export const DataContext = createContext(null)

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await fetxh('/data/data.json').then(r => r.json())
      setData(data.boards);
    }
    getData()
  }, [])


  return (
    <>
      <DataContext.Provider value={{data, setData}}>

      </DataContext.Provider>
    </>
  )
}

 
