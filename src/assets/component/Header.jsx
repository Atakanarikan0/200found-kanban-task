import { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../../App";
import '../css/header.css';

export default function Header() {
  const { data } = useContext(DataContext)
  const [isActive, setIsActive] = useState(false)
  const dialogRef = useRef(null);
  const [subtask, setSubtask] = useState([]);
  const [status,setStatus] = useState('')
  // const newStatus = data.find(x=> x.id === selectedBoardId)?.columns || [];
  // console.log(newStatus);

 
  function toggleMenu() {
    setIsActive(!isActive)
  }
  function HandleTask() {
    dialogRef.current.showModal()
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const subtasks = formData.getAll('subtask').map(x => ({
      x,
      isCompleted: false,
    }))
    const formObj = Object.fromEntries(formData.entries());
    delete formObj.subtask
    const newAddTask = [
      {
        id: crypto.randomUUID(),
        statusId: crypto.randomUUID(),
        ...formObj,
        subtasks,
      }
    ]
    const currentName = data.find(x => x.id === selectedBoardId)?.columns || []
    // console.log(currentName);
    const currentColumnsName = currentName.find(y => y.name === status)?.tasks || []
    
    // console.log(currentColumnsName);
    //  currentColumnsName.tasks.push(newAddTask)
     setData({...currentColumnsName, newAddTask})
     setData([...data])
     console.log(data);

    
    
  }

  return(
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
              <li><a href="#" style={{color: 'red'}}>Delete Board</a></li>
            </ul>
          </div>
        </div>
      </div>
      <dialog ref={dialogRef} >
        <form onSubmit={handleSubmit}>
          <button onClick={() => dialogRef.current.close()}>x</button>
          <h1>Add New Task</h1>
          <label>Title</label>
          <input type="text" placeholder="e.g. Take coffee break" name="title"/>
          <label>Description</label>
          <textarea rows={4} name="description" placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little."></textarea>
          <label>Substasks</label>
          <div className="subtask">
            <input type="text" name="subtask"  placeholder="e.g. Make coffee"/> <img src="/public/img/delete-icon.svg" alt="" />
          </div>
          <div className="subtask">
            <input type="text" name="subtask" placeholder="e.g. Drink coffee & smile"/> <img src="/public/img/delete-icon.svg" alt="" />
          </div>
          <button className="add-new-subtask">+ Add New Subtask</button>
          <label>Status</label>
          <select name="status" onClick={(e) => setStatus(e.target.value)} id="">
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