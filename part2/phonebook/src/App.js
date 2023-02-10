// import axios from 'axios'
import { useState , useEffect, useMemo} from 'react'
import Persons from './components/Persons'
import Notification from './components/Notification'
import Footer from './components/Footer'
import personService from './services/persons'

const App = () => {
  
  // defining states
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [alertMessage, setAlertMessage] = useState(null)

// searching for item
const filteredPersons = useMemo(() => 
    persons.filter(person => 
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) || person.number.includes(searchQuery)
    ), [persons, searchQuery]);

  
//Creating item or updating it 
  const addName = (event) =>{
    event.preventDefault()
    const newObj ={
      name : newName,
      number: newNumber
    }
    const foundItem = persons.filter(person=> person.name===newObj.name)
    
     foundItem.length === 0 ?(
      personService.createEntry(newObj)
        .then(phonebook => {
          setPersons(persons.concat(phonebook))
          setNewName('')
          setNewNumber('')
        })
        .then(() => {
          setAlertMessage(`Added ${newObj.name}`)
          setTimeout(() => {
            setAlertMessage(null)
          }, 5000)
        }))
        :
         window.confirm(`${foundItem[0].name} is already added to phonebook, replace the old number with a new one?`
    ) && personService.updateEntry(foundItem[0].id, newObj)
        .then(response => {
          personService.getPhonebook().then(updatedPersons => {
            setPersons(updatedPersons)
          })})
          .catch(error=>
                {setAlertMessage(`Information of ${newObj.name} has already been removed from server`)
                  setTimeout(() => {
                    setAlertMessage(null)
                  }, 5000)
              }
            )
        setNewName('')
        setNewNumber('')
  
      }

// fetching persons list from db.json at every first rerender
  useEffect(() => {
    personService
      .getPhonebook()
      .then(initialNums=>{setPersons(initialNums)})
      
  }, [alertMessage])

// controlled components form
 const handleOnchangeName = (event)=> {setNewName(event.target.value)}
 const handleOnchangeNumber = (event)=> { setNewNumber(event.target.value)}

 // returned app
 return useMemo(() => (
  <div>
    <h1>Phonebook</h1>
    <div>
      filter shown with: <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
    </div>
    <Notification message={alertMessage} />
    <h2>add a new</h2>
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleOnchangeName} />
      </div>
      <div>
        number: <input type="number" value={newNumber} onChange={handleOnchangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    <h2>Numbers</h2>
    <Persons persons={filteredPersons} setPersons={setPersons} />
    <Footer />
  </div>
), [ filteredPersons, newName, newNumber, searchQuery]);
};

export default App