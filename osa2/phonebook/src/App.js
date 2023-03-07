import { useState, useEffect } from "react";

import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const personsToShow = !filter
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      );

  const addName = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    const oldPerson = persons.find((i) => i.name === newName);
    if (oldPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService.update(oldPerson.id, personObject).then((updatedPerson) => {
          setPersons(persons.map(person => person.id !== oldPerson.id ? person : updatedPerson));
          setNewName("");
          setNewNumber("");
        });
      }
      return;
    }

    personService.create(personObject).then((newPerson) => {
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const onNameChanged = (event) => {
    setNewName(event.target.value);
  };

  const onNumberChanged = (event) => {
    setNewNumber(event.target.value);
  };

  const onFilterChanged = (event) => {
    setFilter(event.target.value);
  };

  const onDeleteName = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id).then(() => {
        personService.getAll().then((persons) => {
          setPersons(persons);
        });
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onFilterChanged={onFilterChanged} />
      <h3>add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        onNameChanged={onNameChanged}
        newNumber={newNumber}
        onNumberChanged={onNumberChanged}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deleteHandler={onDeleteName} />
    </div>
  );
};

export default App;
