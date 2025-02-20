import { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../../App";

export default function AddColumn({ addNewColRef, id, type }) {
  const [inputId, setInputId] = useState(0);
  const [inputs, setInputs] = useState([]);
  const { data, setData, isEdit, setIsEdit } = useContext(DataContext);
  const boardData = data.find((x) => x.id == id); // useEffect içinde daha mı iyi olur diye sor
  const resetRef = useRef();

  useEffect(() => {
    if (boardData?.columns) {
      setInputs(boardData.columns.map((column) => ({
        id: column.id,
        name: column.name,
      })));
    }
  }, [boardData]);

  function addNewColumnInput(e) {
    e.preventDefault();
    const newInput = {
      id: crypto.randomUUID(),
      name: "",
    };
    setInputs([...inputs, newInput]);
  }

  function handleColumnSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);

    const updatedColumns = inputs.map((input) => ({
      id: input.id,
      name: formObj[`columnName${input.id}`],
      tasks: boardData?.columns?.find(x => x.id == input.id)?.tasks,
    }));


    const updatedData = data.map((board) =>
      board.id === id
        ? { ...board, name: formObj.name, columns: updatedColumns }
        : board
    );

    setData(updatedData);
    addNewColRef.current.close();
    resetRef.current.reset();
  }

  function handleDelete(id) {
    setInputs(inputs.filter(x => x.id !== id))
  }




  return (
    <>
      <dialog ref={addNewColRef} className="add-column">
        <div>
          <h4>{!isEdit ? 'Add new Column' : 'Edit Board'}</h4>
          <form ref={resetRef} onSubmit={handleColumnSubmit}>
            <legend>Board Name</legend>
            <input
              disabled={!isEdit}
              type="text"
              name="name"
              defaultValue={boardData?.name}
              placeholder="e.g. Web Design"
            />
            <legend>Columns</legend>
            {inputs.map((input) => (
              <div className="columnn-area">
                <input
                  key={input.id}
                  type="text"
                  defaultValue={input.name}
                  required
                  name={`columnName${input.id}`}
                />
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" onClick={() => handleDelete(input.id)} xmlns="http://www.w3.org/2000/svg">
                  <rect x="12.7279" width="3" height="18" transform="rotate(45 12.7279 0)" fill="#828FA3" />
                  <rect y="2.12109" width="3" height="18" transform="rotate(-45 0 2.12109)" fill="#828FA3" />
                </svg>
              </div>
            ))}
            <button onClick={addNewColumnInput} className="addNewColumnBtn">+ Add New Column</button>
            <button type="submit" className="saveChBtn">Save Changes</button>
          </form>
        </div>
      </dialog>
    </>
  );
}