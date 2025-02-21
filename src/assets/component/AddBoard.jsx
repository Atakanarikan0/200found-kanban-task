import { useContext, useEffect, useState } from "react"
import { DataContext } from "../../App";
import "../css/dialogs.css"
export default function AddBoard() {
  const [inputId, setInputId] = useState(0);
  const [inputs, setInputs] = useState([0]);
  const { addRef, data, setData, setSelectedBoardId } = useContext(DataContext);


  function addNewColumnInput(e) {
    e.preventDefault();
    setInputId(prev => prev + 1);
    setInputs([...inputs, inputs.at(-1) + 1])
  }

  function handleBoardSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    const columnObj = {
      id: crypto.randomUUID(),
      name: formObj.name,
      columns: inputs.map(x => ({
        id: crypto.randomUUID(),
        name: formObj[`columnName${x}`],
        tasks: []
      })
      )
    }
    setData((prevData) => [...prevData, columnObj]);
    addRef.current.close();
    setSelectedBoardId(columnObj.id)
  }

  useEffect(() => {
    // console.log(data);
  }, [data]);

  function handleDelete(id) {
    setInputs(inputs.filter(x => x !== id))
  }
  
  return (
    <>
      <dialog ref={addRef} className="add-board">
        <div>
          <h4>Add New Board</h4>
          <form onSubmit={(e) => handleBoardSubmit(e)}>
            <legend>Name</legend>
            <input type="text" name="name" required defaultValue="" placeholder="e.g. Web Design" />
            <legend>Columns</legend>
            {
              inputs.map(x => 
              <div className="columnn-area" key={x}>
                <input
                required
                type="text"
                defaultValue=""
                name={`columnName${x}`} />
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" onClick={() => handleDelete(x)} xmlns="http://www.w3.org/2000/svg">
                  <rect x="12.7279" width="3" height="18" transform="rotate(45 12.7279 0)" fill="#828FA3" />
                  <rect y="2.12109" width="3" height="18" transform="rotate(-45 0 2.12109)" fill="#828FA3" />
                </svg>
              </div>
            )
            }
            <button onClick={addNewColumnInput} className="addNewColumnBtn">+ Add New Column</button>
            <button type="submit" className="createNewBoardBtn">Create New Board</button>
          </form>
        </div>
      </dialog>
    </>
  )
}