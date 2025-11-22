import { useState, useEffect } from "react";

import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);

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
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(oldPerson.id, personObject)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== oldPerson.id ? person : updatedPerson
              )
            );
            setNewName("");
            setNewNumber("");
            showNotification("Updated " + newName);
          }).catch(error => {
            showError(oldPerson.name + " was already removed");
            setPersons(persons.filter(n => n.id !== oldPerson.id))
          })
      }
      return;
    }

    personService.create(personObject).then((newPerson) => {
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
      showNotification("Added " + newName);
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
          showNotification("Removed " + name);
          setPersons(persons);
        });
      });
    }
  };

  const showNotification = (message) => {
    setNotificationMessage({ message, className: "notification" });
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  const showError = (message) => {
    setNotificationMessage({ message, className: "error" });
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification messageData={notificationMessage} />
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
