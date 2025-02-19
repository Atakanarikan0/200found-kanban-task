import { useContext, useEffect, useRef, useState } from "react"
import { ColTaskContext } from "./Board"
import { DataContext } from "../../App";

export default function EditTask({ editTaskRef }) {
  const { currentTask, boardData } = useContext(ColTaskContext);
  const { data, setData } = useContext(DataContext);
  const [subtasks, setSubtasks] = useState([]);
  const editTaskFormRef = useRef();

  useEffect(() => {
    editTaskFormRef.current.reset();
    if (currentTask?.subtasks) {
      setSubtasks(
        currentTask.subtasks.map((x) => ({
          id: x.id,
          title: x.title,
        }))
      );
    }
  }, [currentTask]);

  function addNewSubtask(e) {
    e.preventDefault();
    const newSubtask = {
      id: crypto.randomUUID(),
      title: '',
      isCompleted: false,
    };
    setSubtasks([...subtasks, newSubtask]);
  }

  function handleSubtaskSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);

    const updatedSubtasks = subtasks.map((st) => ({
        id: st.id,
        title: formObj[`subtask-${st.id}`] || st.title, 
        isCompleted: st.isCompleted,
    }));

    setSubtasks(updatedSubtasks); 

    const updatedTask = {
        ...currentTask,
        title: formObj.title,
        description: formObj.description,
        status: formObj.status,
        subtasks: updatedSubtasks,
    };

    const updatedBoardData = data.map((board) =>
        board.id === boardData.id
            ? {
                ...board,
                columns: board.columns.map((column) =>
                    column.name === currentTask.status
                        ? {
                            ...column,
                            tasks: column.tasks.map((task) =>
                                task.id === currentTask.id ? updatedTask : task
                            ),
                        }
                        : column
                ),
            }
            : board
    );

    setData(updatedBoardData);
    editTaskRef.current.close();
}


  function handleSubtasksChange(id, e) {
    const updatedSubtasks = subtasks.map((subtask) =>
      subtask.id === id ? { ...subtask, title: e.target.value } : subtask
    );
    setSubtasks(updatedSubtasks);
  }

  function handleDelete(id) {
    setSubtasks(subtasks.filter((x) => x.id !== id));
  }

  const columns = boardData?.columns;

  return (
    <>
      <dialog ref={editTaskRef}>
        <form ref={editTaskFormRef} onSubmit={handleSubtaskSubmit}>
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
                defaultValue={x.title}
                onChange={(e) => handleSubtasksChange(x.id, e)} />
                <button onClick={() => handleDelete(x.id)} type="button">X</button>
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

