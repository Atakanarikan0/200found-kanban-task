import { useState, useEffect, createContext, useRef } from 'react'
import Board from './assets/component/Board';
import Header from './assets/component/Header';
import AddBoard from './assets/component/AddBoard';
import Sidebar from './assets/component/Sidebar';
import AddColumn from './assets/component/AddColumn';
export const DataContext = createContext(null)

// todo
// task add/edit dialogları/componentleri
// css & responsive

export default function App() {
  const addNewColRef = useRef();
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


  function updateTaskStatus(boardId, taskId, newStatus) {
    setData((prevData) => {
      return prevData.map((board) => {
        if (board.id === boardId) {
          let taskToMove = null;
          const updatedColumns = board.columns.map((column) => {
            const taskIndex = column.tasks.findIndex((task) => task.id === taskId);
            if (taskIndex !== -1) {
              taskToMove = column.tasks[taskIndex];
              return {
                ...column,
                tasks: column.tasks.filter((task) => task.id !== taskId),
              };
            }
            return column;
          });
          const finalColumns = updatedColumns.map((column) => {
            if (column.name === newStatus) {
              return {
                ...column,
                tasks: [...column.tasks, { ...taskToMove, status: newStatus }],
              };
            }
            return column;
          });
          return {
            ...board,
            columns: finalColumns,
          };
        }
        return board;
      });
    });
  }

  return (
    <>
      <DataContext.Provider value={{ data, setData, addRef, selectedBoardId, setSelectedBoardId, boards, screenSize, showSidebar, setShowSidebar, updateTaskStatus, addNewColRef }}>
        <Header />
        {screenSize ? '' : <Sidebar />}
        <Board id={selectedBoardId} />
        <AddBoard />
        <AddColumn addNewColRef={addNewColRef} id={selectedBoardId} />
      </DataContext.Provider>
    </>
  )
}


