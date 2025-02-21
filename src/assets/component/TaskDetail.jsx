import { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../../App";
import EditTask from "./EditTask";
import "../css/dialogs.css"

export default function TaskDetail({ boardData, currentTask, dialogRef, deleteTask }) {
  const { updateTaskStatus } = useContext(DataContext);
  const [increase, setIncrease] = useState(0)
  const editTaskRef = useRef();
  const [isActive, setIsActive] = useState(false) // headerdaki state tekrar olusturuldu

  function handleStatusChange(e) {
    const newStatus = e.target.value;
    updateTaskStatus(boardData.id, currentTask.id, newStatus);
    dialogRef.current.close();
  }

  useEffect(() => {

    setIncrease(currentTask?.subtasks?.filter(z => z?.isCompleted).length);
  }, [currentTask?.subtasks]);




  function handleSubtaskChange(e, subtask) {
    subtask.isCompleted = e.target.checked;
    const completedSubtasks = currentTask.subtasks.filter(subtask => subtask.isCompleted).length;
    setIncrease(completedSubtasks);
  }

  function toggleMenu() {
    setIsActive(!isActive)
  }

  return (
    <>
      <dialog ref={dialogRef} className="input-dialog" >
        <div className="input-todos">
          <div className="kebab-container">
            <div className="kebab" onClick={toggleMenu}>
              <figure className={isActive ? 'active' : ""}></figure>
              <figure className={isActive ? 'middle active' : 'middle'}></figure>
              <p className={isActive ? 'cross active' : 'cross'}>x</p>
              <figure className={isActive ? 'active' : ""}></figure>
              <ul className={isActive ? 'dropdown active' : 'dropdown'}>
                <li><a href="#" onClick={() => { dialogRef.current.close(); editTaskRef.current.showModal() }}>Edit Task</a></li>

                <li><a href="#" style={{ color: 'red' }} onClick={() => { dialogRef.current.close(); deleteTask(); }}>Delete Task</a></li>
              </ul>
            </div>

            <h3>{currentTask?.title}</h3>
          </div>
          <p className="input-description" >{currentTask?.description}</p>
          <p className="input-subtasks" >{increase} of {currentTask?.subtasks?.length} subtasks</p>
          <div className="checkbox-subtasks" >
            {currentTask?.subtasks?.map(x => (
              <label key={x.title}>
                <input type="checkbox" onChange={(e) => handleSubtaskChange(e, x)} // Handle subtask change
                  checked={x.isCompleted} />
                {x.title}
              </label>
            ))}
          </div>
          <h4>Current Status</h4>
          <select className="status-change" onChange={handleStatusChange} value={currentTask.status}>
            {boardData?.columns?.map(x => (
              <option key={x.name} value={x.name}>
                {x.name}
              </option>
            ))}
          </select>
          {/* <button onClick={() => { dialogRef.current.close(); editTaskRef.current.showModal() }}>edit task</button>
          <button onClick={() => { dialogRef.current.close(); deleteTask(); }}>delete task</button> */}
        </div>
      </dialog >
      <EditTask editTaskRef={editTaskRef} />
    </>
  )
}