const PersonForm = ({
  addName,
  newName,
  onNameChanged,
  newNumber,
  onNumberChanged,
}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={onNameChanged} />
      </div>
      <div>
        number: <input value={newNumber} onChange={onNumberChanged} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
