import { useState, useEffect } from 'react';
import pbService from './services/phonebook';
import './index.css';

const Notification = ({ message }) => {
  if (message === null){
    return null;
  }
  
  return(
    <div className='notification'>{message}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [addedMessage, setAddedMessage] = useState(null);

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
      setAddedMessage(`Added ${personObject.name}`);
      setTimeout(() => {
        setAddedMessage(null);
      }, 3000);
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)){
      pbService.deletePerson(id)
        .then(response => {
          console.log(response);
          setPersons(persons.filter(p => p.id !== id));
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addedMessage} />
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
          <div key={person.id}>{person.name} {person.number} <button onClick={() => {handleDelete(person.id)}}>delete</button>
          </div>
        )
      })}
    </div>
  )
}

export default App