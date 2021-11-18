const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const jsonParser = bodyParser.json();

const PokemonClass = require('./server-class.js');
const myPokemonList = new PokemonClass();

app.use(express.static('public'));

const DATABASE_NAME = 'buildpokemon';
const MONGO_URL = `mongodb://localhost:27017/${DATABASE_NAME}`;

let db = null;
let collection = null;

async function startServer() {
  // Set the db and collection variables before starting the server.
  db = await MongoClient.connect(MONGO_URL);
  collection = db.collection('pokemon');
  // Now every route can safely use the db and collection objects.
  await app.listen(3000);
  console.log('Listening on port 3000');
}
startServer();

////////////////////////////////////////////////////////////////////////////////

async function findPokemon(req, res) {
  const routeParams = req.params;
  const word = routeParams.word;

  const query = { name: word.toLowerCase() };
  const result = await collection.findOne(query);

  const response = {
    word: word,
    definition: result ? result.types : '',
    id: result ? result.id : '',
    hp: result ? result.hp : '',
    attack: result ? result.attack : '',
    defense: result ? result.defense : '',
    specialAttack: result ? result["special-attack"] : '',
    specialDefense: result ? result["special-defense"] : '',
    speed: result ? result.speed : '',
    source: result ? result.source : ''
  };

  console.log("debug: found ", response.word, " sending to client");
  res.json(response);
}
app.get('/lookup/:word', findPokemon);

async function addToTeam(req, res) {
  const definition = req.body.definition;
  console.log("debug: requested to add ", definition.word, " to the team");

  myPokemonList.addPokemon(definition);
  myPokemonList.printPokemon();

  res.json({ success: true });
}
app.post('/set/', jsonParser, addToTeam);

async function removePokemon(req, res) {
  myPokemonList.remove();
  myPokemonList.printPokemon();
  res.json({ success: true });
}
app.post('/remove/', jsonParser, removePokemon);
