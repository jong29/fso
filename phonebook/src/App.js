import { useState, useEffect } from 'react';
import pbService from './services/phonebook';


const App = () => {
  const [persons, setPersons] = useState([]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    pbService
      .getAll()
      .then(initialPhonebook => {
        console.log(initialPhonebook);
        setPersons(initialPhonebook);
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.findIndex(person => person.name === newName) !== -1) {
      window.alert(`${newName} is already added to phonebook`);
    } else {     
      const personObject = {
        id: persons.length + 1,
        name: newName,
        number: newNumber
      }

      pbService
        .create(personObject)
        .then(returnedEntry => {
          setPersons(persons.concat(returnedEntry));
          console.log(returnedEntry);
        });

      setNewName('');
      setNewNumber('');
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => {
        return(
          <div key={person.id}>{person.name} {person.number}</div>
        )
      })}
    </div>
  )
}

export default App