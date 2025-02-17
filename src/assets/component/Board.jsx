import { createContext, useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../../App";
import TaskDetail from "./Task-detail";
import Column from "./Column";

export const ColTaskContext = createContext();

export default function Board({ id }) {
  const dialogRef = useRef();
  const { data } = useContext(DataContext);
  const [currentTask, setCurrentTask] = useState({});
  // const [boardData, setBoardData] = useState([])
  const boardData = data.find(x => x.id == id);
  const [columns, setColumns] = useState([])

  useEffect(() => {
    setColumns(boardData?.columns)
  }, [id])

  function openModal() {
    dialogRef.current.showModal();
  }

  function addColumn() {
    
  }

  return (
    <>
    <ColTaskContext.Provider value={{ openModal, setCurrentTask }}>
      <h2>{boardData?.name}</h2>
      <div>
        {
          columns?.map(x => <Column colData={x} key={x.id}/>)
        }
        <button onClick={addColumn}></button>
      </div>
      <TaskDetail boardData={boardData} currentTask={currentTask} dialogRef={dialogRef} />
    </ColTaskContext.Provider>  

    </>
  )
}