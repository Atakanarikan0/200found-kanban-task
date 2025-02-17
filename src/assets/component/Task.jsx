import { useContext } from "react";
import { DataContext } from "../../App";
import { ColTaskContext } from "./Board";

export default function Task({ taskData }) {
  const { openModal, setCurrentTask } = useContext(ColTaskContext)
  
  return (
    <>
      <li onClick={() => { setCurrentTask(taskData); openModal(); }}>
        <h4>{taskData.title}</h4>
        <p>{taskData.subtasks.filter(z => z.isCompleted == true).length} of {taskData.subtasks.length} subtasks</p>
      </li>
    </>
  )
}