import { useContext } from "react";
import { DataContext } from "../../App";
import { ColTaskContext } from "./Board";
import Task from "./Task";

export default function Column({ colData }) {
  const { openModal, setCurrentTask } = useContext(ColTaskContext)

  return (
    <>
      <div>
        <h3>{colData?.name} ({colData?.tasks?.length})</h3>
        <ul>
          {colData?.tasks?.map(y => <Task key={y.id} taskData={y} colData={colData} />)}
        </ul>
      </div>
    </>
  )
}