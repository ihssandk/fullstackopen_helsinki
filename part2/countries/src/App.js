import React from 'react'
import {useState, useMemo, useEffect} from 'react'
import getCountries from './services/countries'
const App = () => {
  const [countries, setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  // searching for item
const filteredCountries = useMemo(() => 
countries.filter(country => 
 { country.name.common.toLowerCase().includes(searchQuery.toLowerCase()) ||country.name.official.toLowerCase().includes(searchQuery.toLowerCase())
  setCountries(countries.concat(country))}
  )
 
  , 
  [countries, searchQuery]);

  useEffect(() => {
    getCountries().
    then(initialNums=>
      {setCountries(initialNums)})
      
  }, [])
  return(
    <div>
        <div>
            find countries: <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <p>
       {console.log(countries)}
        Found: {filteredCountries.name}</p>
  </div>
  )
}

export default App
