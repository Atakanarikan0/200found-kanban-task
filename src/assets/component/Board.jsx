import { createContext, useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../../App";
import TaskDetail from "./TaskDetail";
import Column from "./Column";
import AddColumn from "./AddColumn";

export const ColTaskContext = createContext();

export default function Board({ id }) {
  const addNewColRef = useRef();
  const dialogRef = useRef();
  const { data } = useContext(DataContext);
  const [currentTask, setCurrentTask] = useState({});
  const boardData = data.find(x => x.id == id); // useEffect içinde daha mı iyi olur diye sor
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setColumns(boardData?.columns);
  }, [id])

  function openModal() {
    dialogRef.current.showModal();
  }

  useEffect(() => {
    setColumns(boardData?.columns);
  }, [data])

  return (
    <>
    <ColTaskContext.Provider value={{ openModal, setCurrentTask, currentTask, boardData }}>
      <h2>{boardData?.name}</h2>
      <div>
        {
          columns?.map(x => <Column colData={x} key={x.id}/>)
        }
        <button onClick={() => {addNewColRef.current.showModal()}}>Add Column</button>
      </div>
      <TaskDetail boardData={boardData} currentTask={currentTask} dialogRef={dialogRef} />
      <AddColumn addNewColRef={addNewColRef} id={id} />
    </ColTaskContext.Provider>  

    </>
  )
}