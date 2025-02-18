import { useContext } from "react";
import { DataContext } from "../../App";

export default function TaskDetail({ boardData, currentTask, dialogRef }) {
  const { data } = useContext(DataContext);
  console.log(boardData);

  function handleStatusChange() {
    console.log()
  }

  return (
    <>
    <dialog ref={dialogRef}>
    {/* <dialog style={{zIndex:-1}} onClick={() => dialogRef.current.close()} ref={dialogRef}> */}

        <div style={{width:"100%", height:"100%", zIndex:"999"}}>
          <h3>{currentTask?.title}</h3>
          <p>{currentTask?.description}</p>
          <p>{currentTask?.subtasks?.filter(z => z?.isCompleted == true).length} of {currentTask?.subtasks?.length} subtasks</p>
          <h4>Subtasks</h4>
          <div>
            {
              currentTask?.subtasks?.map(x => <label htmlFor=""><input type="checkbox" defaultChecked={x.isCompleted} />{x.title}</label>)
            }
          </div>
          <h4>Current Status</h4>
          <select onChange={handleStatusChange} name="">
            {
              boardData?.columns?.map(x => <option
                selected={currentTask.status == x.name && "selected"}
                value={x.name}>
                {x.name}
              </option>)
            }
          </select>
        </div>
      </dialog>
    </>
  )
}