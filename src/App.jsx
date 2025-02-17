import { useState, useEffect, createContext } from 'react'

export const DataContext = createContext(null)

export default function App() {
  const [data, setData] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState();
  const [boards, setBoards] = useState([]) 

  useEffect(() => {
    async function getData() {
      const data = await fetxh('/data/data.json').then(r => r.json())
      setData(data.boards);
      console.log(data.boards[0].id);
      setSelectedBoardId(data.boards[0].id);
      setBoards(data.boards);
    }
    getData();
  }, [])

  function handleAddBoard() {
    setBoards([...boards, {
      "id": crypto.randomUUID(),
      "name": "new",
      "columns": []
  }])
  }




  return (
    <>
      <DataContext.Provider value={{data, setData}}>
      <Header />
        {
          boards?.map(x => <button onClick={() => setSelectedBoardId(x?.id)}>{x?.name}</button>)
        }
        <button onClick={handleAddBoard}>+ Add Board</button>
        <Board id={selectedBoardId} />
      </DataContext.Provider>
    </>
  )
}


