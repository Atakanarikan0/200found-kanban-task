import { createContext, useContext, useRef, useState } from "react";
import { DataContext } from "../../App";
import TaskDetail from "./Task-detail";
import Column from "./Column";

export const ColTaskContext = createContext()

export default function Board({ id }) {
  const dialogRef = useRef();
  const { data } = useContext(DataContext);
  const [currentTask, setCurrentTask] = useState({});
  const boardData = data.find(x => x.id == id);

  function openModal() {
    dialogRef.current.showModal();
  }

  return (
    <>
    <ColTaskContext.Provider value={{ openModal, setCurrentTask }}>
      <h2>{boardData?.name}</h2>
      <div>
        {
          boardData?.columns?.map(x => <Column colData={x} key={x.id}/>)
        }
      </div>
      <TaskDetail boardData={boardData} currentTask={currentTask} dialogRef={dialogRef} />
    </ColTaskContext.Provider>  

    </>
  )
}