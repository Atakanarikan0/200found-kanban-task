import { createContext, useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../../App";
import TaskDetail from "./TaskDetail";
import Column from "./Column";
import AddColumn from "./AddColumn";

import './../css/Board.css'

export const ColTaskContext = createContext();

export default function Board({ id }) {
  const addNewColRef = useRef();
  const dialogRef = useRef();
  const { data, showSidebar, setShowSidebar } = useContext(DataContext);
  const [currentTask, setCurrentTask] = useState({});
  const boardData = data.find(x => x.id == id); // useEffect içinde daha mı iyi olur diye sor
  const [columns, setColumns] = useState([]);
  const [columnCount, setColumnCount] = useState(0);
  const [noColumn, setNoColumn] = useState(false);

  useEffect(() => {
    setColumns(boardData?.columns);
  }, [id])

  useEffect(() => {
    boardData?.columns?.length > 0 ? setNoColumn(false) : setNoColumn(true)
  }, [columns])

  function openModal() {
    dialogRef.current.showModal();
  }

  function deleteTask() {
    const updatedData = data.map((board) =>
      board.id === boardData.id
        ? {
          ...board,
          columns: board.columns.map((column) =>
            column.name === currentTask.status
              ? {
                ...column,
                tasks: column.tasks.filter(task => task.id !== currentTask.id),
              }
              : column
          ),
        }
        : board
    );

    setData(updatedData);
  }

  useEffect(() => {
    setColumns(boardData?.columns);
  }, [data])

  return (
    <>
      <ColTaskContext.Provider value={{ openModal, setCurrentTask, currentTask, boardData }}>
        {
          noColumn
            ? <div className="board-no-columns" style={{
              marginLeft: showSidebar ? 251 : 0,
              transition: 'all 1s ease-in-out'
            }}>
              <p>This board is empty. Create a new column to get started.</p>
              <button className="empty-board-add-column-btn" onClick={() => { addNewColRef.current.showModal() }}>+ Add New Column</button>
            </div>
            : <div className="board-columns-cont">
              {
                columns?.map((x, i) => <Column colData={x} key={x.id} index={i} />)
              }
              <button className="board-add-column-btn" onClick={() => { addNewColRef.current.showModal() }}>+ New Column</button>
            </div>
        }
        <TaskDetail boardData={boardData} currentTask={currentTask} dialogRef={dialogRef} deleteTask={deleteTask} />
        <AddColumn addNewColRef={addNewColRef} id={id} />
      </ColTaskContext.Provider>

    </>
  )
}