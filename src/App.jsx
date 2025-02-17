import { useState, useEffect, createContext, useRef } from 'react'
import Board from './assets/component/Board';
import Header from './assets/component/Header';
import AddBoard from './assets/component/AddBoard';
export const DataContext = createContext(null)

// todo
// dialog için kebap butonu 
// board değiştirme
// board editleme dialogları/componentleri
// sidebar
// task add/edit dialogları/componentleri
// column ekleme

export default function App() {
  const [data, setData] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState();
  const [boards, setBoards] = useState([]) 
  const addRef = useRef()

  useEffect(() => {
    async function getData() {
      const data = await fetch('/data/data.json').then(r => r.json());
      setData(data.boards);
      setSelectedBoardId(data.boards[0].id);
      setBoards(data.boards);
    }
    getData();
  }, [])

  useEffect(() => {
    setBoards(data)
  }, [data])

  return (
    <>
      <DataContext.Provider value={{ data, setData, addRef, selectedBoardId }}>
        <Header />
        {
          boards?.map(x => <button onClick={() => setSelectedBoardId(x?.id)}>{x?.name}</button>)
        }
        <button onClick={() => addRef.current.showModal()}>+ Add Board</button>
        <Board id={selectedBoardId} />
        <AddBoard />
      </DataContext.Provider>
    </>
  )
}


