import { useState, useEffect, createContext } from 'react'
import Board from './assets/component/Board';
export const DataContext = createContext(null)

// todo
// dialog için kebap butonu 
// board değiştirme
// board ekleme/editleme dialogları/componentleri
// sidebar
// task add/edit dialogları/componentleri

export default function App() {
  const [data, setData] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState();

  useEffect(() => {
    async function getData() {
      const data = await fetch('/data/data.json').then(r => r.json());
      setData(data.boards);
      console.log(data.boards[0].id);
      setSelectedBoardId(data.boards[0].id);
    }
    getData();
  }, [])


  return (
    <>
      <DataContext.Provider value={{ data, setData }}>
        {
          data?.map(x => <button onClick={() => setSelectedBoardId(x?.id)}>{x?.name}</button>)
        }
        <Board id={selectedBoardId} />
      </DataContext.Provider>
    </>
  )
}


