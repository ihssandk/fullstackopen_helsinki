require('dotenv').config()
const express = require('express')
const app= express()
const cors = require('cors')
let morgan = require('morgan')
app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
const Person = require('./models/person')

//Hard coded persons Phonebook
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// Request GET endpoint
    app.get('/info', (request, response) => {
        const date = new Date().toString()
        const personsLength = persons.length
        response.send(
            `
            <p>Phonebook has info for ${personsLength} people</p>
            <p>${date}</p>
            `)
      })


// Request GET persons
      app.get('/api/persons', (request, response) => {
        response.json(persons)
      })


// Request Get persons by id // Error 
      app.get('/api/persons/:id', (req,res)=>{
        const id= Number(req.params.id)
        const person = persons.find(person=> person.id===id)
        person? res.json(person): res.status(404).end()
      })


// Delete notes by Id
      app.delete('/api/persons/:id', (request, response) => {
        const id = Number(request.params.id)
        fileteredpersons = persons.filter(note => note.id !== id)
        fileteredpersons.length!== persons.length? response.status(204).end()
        :
        response.status(404).end()
    })

// // Generate Id to add new element to the end of the notes array
const generateId = () =>{
    const randomId = Math.floor(Math.random()*100000)
    return  randomId
    
}
// // // Add notes to the server
app.post('/api/persons', (request, response) => {
    const {name,number} = request.body
  
    if (!name || !number) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
    const checkExistingName = persons.filter(person=> person.name===name)
    if(checkExistingName.length>0){
        return response.status(400).json({
            error : 'name must be unique'
        })
    }
    const person = {
      id: generateId(),
      name,
      number,
    }
    morgan.token('body', request => JSON.stringify(request.body))
  
    persons = persons.concat(person)
  
    response.json(person)
  })
// Middleware  for catching requets to invalid routes
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  app.use(unknownEndpoint)

// Listening to port 3001 OR env var
const PORT = process.env.PORT
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })