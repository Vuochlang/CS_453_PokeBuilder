const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const jsonParser = bodyParser.json();

const PokemonClass = require('./class.js');
const myPokemonList = new PokemonClass();
let index = 1; //index of Pokemon

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

async function onSearchPokemon(req, res) {
  const routeParams = req.params;
  // console.log("routeParams-->: ", req.params); //{ word: 'bulbasaur' }
  const word = routeParams.word;
  // console.log("routeParams.word-->: ", routeParams.word); //routeParams.word-->:  bulbasaur

  const query = { name: word.toLowerCase() };
  // console.log("query-->: ", query); //{ name: 'bulbasaur' }
  const result = await collection.findOne(query);
  // console.log("result-->: ", result);
  // result-->:  {
  //   _id: 6177138276d4e7ffaac8d2fb,
  //   id: 1,
  //   name: 'bulbasaur',
  //   types: [ 'Grass', 'Poison' ],
  //   hp: 45,
  //   attack: 49,
  //   defense: 49,
  //   'special-attack': 65,
  //   'special-defense': 65,
  //   speed: 45,
  //   source: 'http://pokeapi.co/api/v2/pokemon/1/'
  // } 

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
  console.log("response-->: ", response);
  res.json(response);
}
app.get('/lookup/:word', onSearchPokemo);

async function onSetTeam(req, res) {
  const definition = req.body.definition;
  console.log("getting pokemon data from client-->: ", definition);

  myPokemonList.addPokemon(index, definition);
  index += 1;
  myPokemonList.printPokemon();

  res.json({ success: true });
}
app.post('/set/', jsonParser, onSetTeam);
