import { useContext, useEffect, useState } from "react"
import { ColTaskContext } from "./Board"
import { DataContext } from "../../App";

export default function EditTask({ editTaskRef }) {
  const { currentTask, boardData } = useContext(ColTaskContext);
  const { data, setData } = useContext(DataContext)
  const [subtasks, setSubtasks] = useState([]);
  // const currentColumn = boardData.columns.find(x => x.name == currentTask.status)
  // console.log("col",currentColumn)
  useEffect(() => {
    // setSubtasks(currentTask.subtasks ?? [0]);
    currentTask.subtasks && setSubtasks(currentTask.subtasks.map(x => ({
      id: x.id,
      name: x.title
    })))

    
  
  console.log(subtasks)

  }, [currentTask])

  function addNewSubtask(e) {
    e.preventDefault();
    const newSubtask = {
      id: crypto.randomUUID(),
      name: ""
    }
    setSubtasks([...subtasks, newSubtask])
    console.log(subtasks)
  }

  function handleSubtaskSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    console.log(formObj)

    const updatedSubtasks = subtasks.map(st => ({
      name: formObj[`subtask-${st.id}`],
      isCompleted: false
    }));

    // const updatedTask = boardData.columns.map(column => 
    //   column.name == currentTask.status
    //   ? {...column, tasks: updatedSubtasks}
    //   : column
    // )

    const updatedTask = {
      
    }

    setData(updatedTask)
    editTaskRef.current.close();


  }



  const columns = boardData?.columns;

  return (
    <>
      <dialog ref={editTaskRef}>
        <form onSubmit={handleSubtaskSubmit}>
          <p>Title</p>
          <input type="text" name="title" defaultValue={currentTask?.title} />
          <p>Description</p>
          <textarea name="description" defaultValue={currentTask?.description}></textarea>
          <p>Subtasks</p>
          <div className="edit-task-subtasks">
            {
              subtasks.map(x => <div>
                <input 
                type="text" 
                name={`subtask-${x.id ?? crypto.randomUUID()}`}
                defaultValue={x.name} />
                <button type="button">X</button>
                </div>)
            }
            
          </div>
          <button type="button" onClick={(e) => addNewSubtask(e)}>+ Add New Subtask</button>
          <p>Status</p>
          <select name="status" id="">
            {
              columns?.map(x => <option selected={x.name == currentTask.status} key={x.id} value={x.name}>{x.name}</option>)
            }
          </select>
          <button type="submit">Save Changes</button>
        </form>
      </dialog>
    </>
  )
}

