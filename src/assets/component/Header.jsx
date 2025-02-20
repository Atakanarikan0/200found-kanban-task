import { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../../App";
import '../css/header.css';

export default function Header() {
  const { data, setData, selectedBoardId, setSelectedBoardId, boards, addRef, screenSize, addNewColRef, showSidebar } = useContext(DataContext)
  const [isActive, setIsActive] = useState(false)
  const [isDown, setIsDown] = useState(false)
  const dialogRef = useRef(null);
  const boardRef = useRef(null);
  const editRef = useRef(null)
  const deleteRef = useRef(null)
  const [subtask, setSubtask] = useState([{ id: 1, value: "" }]);
  const [status, setStatus] = useState('Todo')
  const [editBoard, setEditBoard] = useState([])
  const [lastScrollTop, setLastScrollTop] = useState(0); const [hidden, setHidden] = useState(false); useEffect(() => { const handleScroll = () => { const currentScrollTop = window.scrollY; if (currentScrollTop > lastScrollTop) { setHidden(true); } else { setHidden(false); } setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop); }; window.addEventListener("scroll", handleScroll); return () => { window.removeEventListener("scroll", handleScroll); }; }, [lastScrollTop]);

  const currentBoard = data.find(board => board.id === selectedBoardId)

  useEffect(() => {
    if (currentBoard) {
      setEditBoard(currentBoard.name);
    }
  }, [currentBoard]);


  function handleNav() {
    boardRef.current.showModal()
    setIsDown(!isDown)
  }

  function toggleMenu() {
    setIsActive(!isActive)
  }

  function handleTask() {
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
    dialogRef.current.close()
  }

  function handleAddSubtasks() {
    setSubtask([...subtask, { id: subtask.length + 1, value: "" }])
    console.log('çalıştım')
  }

  function handleSubtasksChange(id, e) {
    const updatedSubtasks = subtask.map(subtask =>
      subtask.id === id ? { ...subtask, value: e.target.value } : subtask
    );
    setSubtask(updatedSubtasks);
  }

  function handleDelete(id) {
    setSubtask(subtask.filter(x => x.id !== id))
  }

  function handleDeleteBoard() {
    setData(data.filter(x => x.id !== selectedBoardId))
    setSelectedBoardId(null)
    deleteRef.current.close();

  }


  return (
    <>
      {screenSize ?
        <div className={`header ${hidden ? "hidden-header" : ""}`}>
          <img src="/img/logo-mobil.svg" alt="" />
          <div className={isDown ? 'arrow-up' : 'header-launch'}>
            <h1 onClick={handleNav} style={{
              marginLeft: showSidebar ? 56 : 0,
              transition: 'all 1s ease-in-out'
            }}>Platform Launch</h1>
            <dialog ref={boardRef} className="nav-ref">
              <div className="nav-ref-content">
                <h3>ALL BOARDS({data.length})</h3>
                {boards?.map(x => (
                  <div key={x?.id}>
                    <button className={selectedBoardId === x?.id ? 'active' : ''} onClick={() => setSelectedBoardId(x?.id)}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.846133 0.846133C0.304363 1.3879 0 2.12271 0 2.88889V13.1111C0 13.8773 0.304363 14.6121 0.846133 15.1538C1.3879 15.6957 2.12271 16 2.88889 16H13.1111C13.8773 16 14.6121 15.6957 15.1538 15.1538C15.6957 14.6121 16 13.8773 16 13.1111V2.88889C16 2.12271 15.6957 1.3879 15.1538 0.846133C14.6121 0.304363 13.8773 0 13.1111 0H2.88889C2.12271 0 1.3879 0.304363 0.846133 0.846133ZM1.33333 13.1111V8.44448H9.77781V14.6667H2.88889C2.03022 14.6667 1.33333 13.9698 1.33333 13.1111ZM9.77781 7.11111V1.33333H2.88889C2.47633 1.33333 2.08067 1.49723 1.78895 1.78895C1.49723 2.08067 1.33333 2.47633 1.33333 2.88889V7.11111H9.77781ZM11.1111 5.77778H14.6667V10.2222H11.1111V5.77778ZM14.6667 11.5555H11.1111V14.6667H13.1111C13.5236 14.6667 13.9194 14.5028 14.2111 14.2111C14.5028 13.9194 14.6667 13.5236 14.6667 13.1111V11.5555ZM14.6667 2.88889V4.44445H11.1111V1.33333H13.1111C13.5236 1.33333 13.9194 1.49723 14.2111 1.78895C14.5028 2.08067 14.6667 2.47633 14.6667 2.88889Z" fill={selectedBoardId === x?.id ? '#FFF' : '#828FA3'} />
                      </svg>
                      {x?.name}
                    </button>
                  </div>
                ))}
                <button onClick={() => { addRef.current.showModal(), boardRef.current.close() }}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.846133 0.846133C0.304363 1.3879 0 2.12271 0 2.88889V13.1111C0 13.8773 0.304363 14.6121 0.846133 15.1538C1.3879 15.6957 2.12271 16 2.88889 16H13.1111C13.8773 16 14.6121 15.6957 15.1538 15.1538C15.6957 14.6121 16 13.8773 16 13.1111V2.88889C16 2.12271 15.6957 1.3879 15.1538 0.846133C14.6121 0.304363 13.8773 0 13.1111 0H2.88889C2.12271 0 1.3879 0.304363 0.846133 0.846133ZM1.33333 13.1111V8.44448H9.77781V14.6667H2.88889C2.03022 14.6667 1.33333 13.9698 1.33333 13.1111ZM9.77781 7.11111V1.33333H2.88889C2.47633 1.33333 2.08067 1.49723 1.78895 1.78895C1.49723 2.08067 1.33333 2.47633 1.33333 2.88889V7.11111H9.77781ZM11.1111 5.77778H14.6667V10.2222H11.1111V5.77778ZM14.6667 11.5555H11.1111V14.6667H13.1111C13.5236 14.6667 13.9194 14.5028 14.2111 14.2111C14.5028 13.9194 14.6667 13.5236 14.6667 13.1111V11.5555ZM14.6667 2.88889V4.44445H11.1111V1.33333H13.1111C13.5236 1.33333 13.9194 1.49723 14.2111 1.78895C14.5028 2.08067 14.6667 2.47633 14.6667 2.88889Z" fill="#828FA3" />
                </svg> + Create New Board</button>
                <div className="theme">
                  <img src="/img/sun-icon.svg" alt="" />
                  <input type="checkbox" name="" id="" className="switch" />
                  <img src="/img/moon-icon.svg" alt="" />

                </div>
              </div>
            </dialog>
          </div>
          <div>
            <span onClick={handleTask}><img src="/img/plus-icon.svg" alt="" /></span>
            <div className="kebab" onClick={toggleMenu}>
              <figure className={isActive ? 'active' : ""}></figure>
              <figure className={isActive ? 'middle active' : 'middle'}></figure>
              <p className={isActive ? 'cross active' : 'cross'}>x</p>
              <figure className={isActive ? 'active' : ""}></figure>
              <ul className={isActive ? 'dropdown active' : 'dropdown'}>
                <li><a href="#" onClick={() => { console.log("yo"); addNewColRef.current.showModal() }}>Edit Board</a></li>
                <dialog ref={editRef}>
                  {/* <div>
                  <h4>Add New Board</h4>
                  <form onSubmit={(e) => handleBoardSubmit(e)}>
                    <legend>Name</legend>
                    <input type="text" name="name" defaultValue="aaa" placeholder="e.g. Web Design" />
                    <legend>Columns</legend>
                    {
                      inputs.map(x =>
                        <input
                          key={x.id}
                          type="text"
                          defaultValue="bbb"
                          name={`columnName${x}`} />)
                    }
                    <button onClick={addNewColumnInput}>+ Add New Column</button>
                    <button type="submit">Create New Board</button>
                  </form>
                </div> */}
                </dialog>
                <li><a href="#" style={{ color: 'red' }}>Delete Board</a></li>
              </ul>
            </div>
          </div>
        </div> :
        <div className={`header ${hidden ? "hidden-header" : ""}`}>
          <img src="/img/logo-desktop-light.png" alt="" />
          <hr />
          <div className="board-name">
            <h1 style={{
              marginLeft: showSidebar ? 56 : 0,
              transition: 'all 1s ease-in-out'
            }}>{data.find(x => x.id === selectedBoardId)?.name}</h1>
          </div>

          <div>
            <span onClick={handleTask}><img src="/img/plus-icon.svg" alt="" /> Add New Task</span>
            <div className="kebab" onClick={toggleMenu}>
              <figure className={isActive ? 'active' : ""}></figure>
              <figure className={isActive ? 'middle active' : 'middle'}></figure>
              <p className={isActive ? 'cross active' : 'cross'}>x</p>
              <figure className={isActive ? 'active' : ""}></figure>
              <ul className={isActive ? 'dropdown active' : 'dropdown'}>
                <li><a href="#" onClick={() => editRef.current.showModal()}>Edit Board</a></li>
                <dialog ref={editRef}>
                  {/* <div>
                      <h4>Add New Board</h4>
                      <form onSubmit={(e) => handleBoardSubmit(e)}>
                        <legend>Name</legend>
                        <input type="text" name="name" defaultValue="aaa" placeholder="e.g. Web Design" />
                        <legend>Columns</legend>
                        {
                          inputs.map(x =>
                            <input
                              key={x.id}
                              type="text"
                              defaultValue="bbb"
                              name={`columnName${x}`} />)
                        }
                        <button onClick={addNewColumnInput}>+ Add New Column</button>
                        <button type="submit">Create New Board</button>
                      </form>
                    </div> */}
                </dialog>
                <li onClick={() => deleteRef.current.showModal()}><a href="#" style={{ color: 'red' }}>Delete Board</a></li>
              </ul>
            </div>
          </div>
        </div>

      }
      <div>
        <dialog className="delete-check" ref={deleteRef}>
          <h2 >Delete this board?</h2>
          <p>Are you sure you want to delete the "{data.find(x => x.id === selectedBoardId)?.name}" board? This action will remove all columns and tasks and cannot be reversed.</p>
          <button className="delete-btn" onClick={handleDeleteBoard}>Delete</button>
          <button onClick={() => deleteRef.current.close()} className="cancel-btn">Cancel</button>
        </dialog>
      </div>

      <dialog ref={dialogRef} >
        <form onSubmit={handleSubmit}>
          <h1>Add New Task</h1>
          <label>Title</label>
          <input type="text" placeholder="e.g. Take coffee break" name="title" required />
          <label>Description</label>
          <textarea rows={4} name="description" placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little." required></textarea>
          <label>Substasks</label>
          {subtask.map(x => (
            <div className="subtask" key={x.id}>
              <input type="text" value={x.value} placeholder="e.g. Make coffee" onChange={(e) => handleSubtasksChange(x.id, e)} />
              <img src='/img/delete-icon.svg' onClick={() => handleDelete(x.id)} alt="" />
            </div>
          ))}

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





