import Person from "./Person";

const Persons = ({ personsToShow, deleteHandler }) => {
  return (
    <ul>
      {personsToShow.map((person) => (
        <Person key={person.name} person={person} deleteHandler={deleteHandler}/>
      ))}
    </ul>
  );
};

export default Persons;
