import { DataContext } from "../../App";

export default function TaskDetail({ boardData, currentTask, dialogRef }) {
  return(
    <>
    <dialog onClick={() => dialogRef.current.close()} ref={dialogRef}>
        <div>
          <h3>{currentTask?.title}</h3>
          <p>{currentTask?.description}</p>
          <p>{currentTask?.subtasks?.filter(z => z?.isCompleted == true).length} of {currentTask?.subtasks?.length} subtasks</p>
          <div>
            {
              currentTask?.subtasks?.map(x => <label htmlFor=""><input type="checkbox" defaultChecked={x.isCompleted} />{x.title}</label>)
            }
          </div>
          <select name="">
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