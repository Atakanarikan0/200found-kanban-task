import { useState, useEffect, createContext, useRef } from 'react'
import Board from './assets/component/Board';
import Header from './assets/component/Header';
import AddBoard from './assets/component/AddBoard';
import Sidebar from './assets/component/Sidebar';
export const DataContext = createContext(null)

// todo
// task add/edit dialogları/componentleri
// css & responsive

export default function App() {
  const [data, setData] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState();
  const [boards, setBoards] = useState([])
  const addRef = useRef()
  const [screenSize, setScreenSize] = useState(window.innerWidth < 525);
  const [showSidebar, setShowSidebar] = useState(false)

  useEffect(() => {
    async function getData() {
      const data = await fetch('/data/data.json').then(r => r.json())
      setData(data.boards);
      setSelectedBoardId(data.boards[0].id);
      setBoards(data.boards);
    }
    getData();
  }, [])

  useEffect(() => {
    setBoards(data)
  }, [data])

  useEffect(() => {
    window.addEventListener("resize", () => setScreenSize(window.innerWidth < 525));
  }, [])



  return (
    <>
      <DataContext.Provider value={{ data, setData, addRef, selectedBoardId, setSelectedBoardId, boards, screenSize, showSidebar, setShowSidebar }}>
        <Header />
        {screenSize ? '' : <Sidebar />}
        <Board id={selectedBoardId} />
        <AddBoard />
      </DataContext.Provider>
    </>
  )
}


