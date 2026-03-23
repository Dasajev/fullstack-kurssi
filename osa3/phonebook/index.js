const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h2>Hello World!</h2>");
});

app.get("/info", (request, response) => {
  response.send(
    "Phonebook has info for " + persons.length + " people<br><br>" + new Date(),
  );
});

app.get("/api/persons/:id", (request, response) => {
  response.json(persons.find((person) => person.id === request.params.id));
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.delete("/api/persons/:id", (request, response) => {
  persons = persons.filter((person) => person.id !== request.params.id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const person = request.body;
  persons.push(person);
  response.status(201).json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
