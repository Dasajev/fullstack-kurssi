const Person = ({ person, deleteHandler }) => {
  return (
    <div>
      <li>
        {person.name} {person.number}
      </li>
      <button onClick={() => deleteHandler(person.id, person.name)}>Delete</button>
    </div>
  );
};

export default Person;
