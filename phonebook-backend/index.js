const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());

morgan.token('data', (req, res) => {
    return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));

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

app.get('/info', (request, response) => {
    const responseString = `<p>Phonebook has info for ${persons.length} people</p><p>${Date()}</p>`
    response.send(responseString)
});

app.get('/api/persons', (request,response) => {
    response.json(persons)
});

app.get('/api/persons/:id', (request,response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);

    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);

    response.status(204).end();
});

const generateID = () => {
    const rnd = Math.floor(Math.random()*999999);
    return rnd;
};

app.post('/api/persons', (request, response) => {
    const person = request.body;
    person.id = generateID();

    if (person.name && person.number) {
        if (persons.some(p => p.name === person.name)) {
            return response.status(400).json({
                error: 'name must be unique'
            })
        } else {
            persons = persons.concat(person);
            response.json(person);
        }
    } else {
        response.status(400).json({
            error: 'name or number missing'
        })
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});