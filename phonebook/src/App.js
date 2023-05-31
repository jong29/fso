import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ 
    id: 1 ,
    name: 'Arto Hellas', 
    number: "010-1234-5678"
  }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault();
    console.log(persons.findIndex(person => person.name));
    if (persons.findIndex(person => person.name === newName) !== -1) {
      window.alert(`${newName} is already added to phonebook`);
    } else {     
      const personObject = {
        id: persons.length + 1,
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value);
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