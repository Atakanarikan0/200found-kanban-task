import { useContext, useEffect, useState } from "react"
import { ColTaskContext } from "./Board"

export default function EditTask({ editTaskRef }) {
  const { currentTask } = useContext(ColTaskContext);
  const [subtasks, setSubtasks] = useState([]);

  useEffect(() => {
    setSubtasks(currentTask.subtasks);
  }, [])


  console.log(currentTask.subtasks);

  return (
    <>
    <dialog ref={editTaskRef}>
      <form action="">
        <p>Title</p>
        <input type="text" name="title" defaultValue={currentTask?.title} />
        <p>Description</p>
        <textarea name="description" defaultValue={currentTask?.description}></textarea>
        <p>Subtasks</p>
        <div><input type="text" /><button type="button">X</button></div>
        <button type="button">+ Add New Subtask</button>
        <p>Status</p>
        <select name="" id="">
          <option value="">Todo</option>
        </select>
        <button type="submit">Save Changes</button>
      </form>
    </dialog>
    </>
  )
}

