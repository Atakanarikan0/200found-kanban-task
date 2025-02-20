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

  return (
    <>
      <dialog ref={addRef} className="add-board">
        <div>
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
            <button onClick={addNewColumnInput} className="addNewColumnBtn">+ Add New Column</button>
            <button type="submit" className="createNewBoardBtn">Create New Board</button>
          </form>
        </div>
      </dialog>
    </>
  )
}