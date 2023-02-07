import React  from 'react'
import personService from '../services/persons'
export default function Persons({persons, setPersons}) {
  if(persons.length!==0){return (
    <div>
    <ul>
    {persons.map(person=><li key={person.id}>{person.name} {person.number} 
      <button onClick={()=> {
          window.confirm(`do you want to delete this ${person.name}`);
          personService.deleteEntry(person.id).then(setPersons(persons.filter(item=> item.id!== person.id)));
    
        }
      }>delete</button>
      </li>)}
      </ul>
    </div>
  )}else{return <p>Contacts yet to be added, enter your first contact...</p> }
}