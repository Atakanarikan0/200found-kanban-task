import { useContext } from "react";
import { DataContext } from "../../App";
import { ColTaskContext } from "./Board";
import Task from "./Task";

export default function Column({ colData }) {
  const { openModal, setCurrentTask } = useContext(ColTaskContext)

  return (
    <>
      <div className="single-column">
        <div className="column-header">
          {dotSvg}
          <h3>{colData?.name} ({colData?.tasks?.length ?? 0})</h3>

        </div>
        <ul className={colData?.tasks?.length > 0 ? "" : "empty-single-column" }>
          {colData?.tasks?.map(y => <Task key={y.id} taskData={y} colData={colData} />)}
        </ul>
      </div>
    </>
  )
}

const dotSvg = <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="7.5" cy="7.5" r="7.5" fill="#49C4E5" />
</svg>