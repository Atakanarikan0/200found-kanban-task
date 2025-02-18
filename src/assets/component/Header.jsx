import { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../../App";
import '../css/header.css';

export default function Header({ selectedBoardId }) {
  const { data, setData } = useContext(DataContext)
  const [isActive, setIsActive] = useState(false)
  const dialogRef = useRef(null);
  const [subtask, setSubtask] = useState([{ id: 1, value: "" }]);
  const [status, setStatus] = useState('Todo')



  function toggleMenu() {
    setIsActive(!isActive)
  }
  function HandleTask() {
    dialogRef.current.showModal()
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!status.trim()) {

    }
    const formData = new FormData(e.target);

    const subtasks = formData.getAll('subtask').map(x => ({
      x,
      isCompleted: false,
    }));
    const formObj = Object.fromEntries(formData.entries());
    if (!status.trim()) return
    const newAddTask = {
      id: crypto.randomUUID(),
      statusId: crypto.randomUUID(),
      ...formObj,
      subtasks,
    };

    delete formObj.subtask;


    const currentBoard = data.find(board => board.id === selectedBoardId);
    const currentColumn = currentBoard?.columns.find(column => column.name === status);


    if (currentColumn) {
      currentColumn.tasks = [...currentColumn.tasks, newAddTask];
      console.log('render1')
      setData([...data]);
      console.log('render2')
    }

    console.log(newAddTask);
    console.log(status)
    e.target.reset()
  }

  function handleAddSubtasks() {
    setSubtask[[...subtask, { id: subtask.length + 1, value: "" }]]
    console.log('çalıştım')
  }

  function handleSubtasksChange(id, e) {
    const updatedSubtasks = subtask.map(subtask =>
      subtask.id === id ? { ...subtask, value: e.target.value } : subtask
    );
    setSubtask(updatedSubtasks);
  }


  return (
    <>
      <div className="header">
        <img src="/public/img/logo-mobil.svg" alt="" />
        <div className="header-launch">
          <h1>Platform Launch</h1>
        </div>
        <div>
          <span onClick={HandleTask}><img src="/public/img/plus-icon.svg" alt="" /></span>
          <div className="kebab" onClick={toggleMenu}>
            <figure className={isActive ? 'active' : ""}></figure>
            <figure className={isActive ? 'middle active' : 'middle'}></figure>
            <p className={isActive ? 'cross active' : 'cross'}>x</p>
            <figure className={isActive ? 'active' : ""}></figure>
            <ul className={isActive ? 'dropdown active' : 'dropdown'}>
              <li><a href="#">Edit Board</a></li>
              <li><a href="#" style={{ color: 'red' }}>Delete Board</a></li>
            </ul>
          </div>
        </div>
      </div>
      <dialog ref={dialogRef} >
        <form onSubmit={handleSubmit}>
          <h1>Add New Task</h1>
          <label>Title</label>
          <input type="text" placeholder="e.g. Take coffee break" name="title" required />
          <label>Description</label>
          <textarea rows={4} name="description" placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little." required></textarea>
          <label>Substasks</label>
          {subtask.map(x => {
            <div className="subtask" key={x.id}>
              <input type="text" value={x.value} required placeholder="e.g. Make coffee" onChange={(e) => handleSubtasksChange(x.id, e)} />
              <img src='/img/delete-icon.svg' alt="" />
            </div>
          })}
          <button className="add-new-subtask" type="button" onClick={handleAddSubtasks}>+ Add New Subtask</button>
          <label>Status</label>
          <select name="status" onChange={(e) => setStatus(e.target.value)} id="">
            <option value="Todo">Todo</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
            <option value="Now">Now</option>
          </select>
          <button className="create-task">Create Task</button>
        </form>

      </dialog>
    </>
  )
} 