class Pokemon {
	constructor() {
    this.tempPokemon= "";
    this.limit = 1;
    this.list = [];
    this.imageLink = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/";
	}

  update() {
    this.limit > 1 ? this.limit -= 1 : this.limit = 1;
  }
}

class Team {
  constructor() {
    this.list_id = [];
  }

  getImageLink(imagelink, listId, index) {
    let id = listId; //assume index=-1
  
    if (index > -1) {
      id = listId[index];
  
      if (id == undefined)
        return ("img/pokeball.png");
    }
  
    if (id >= 10 &&  id < 100) {
      id = "".concat("0", id);
    }
    else if (id < 10) {
      id = "".concat("00", id);
    }
    return "".concat(imagelink, id, ".png");
  }
}

const myPokemon = new Pokemon();
const teamPokemon = new Team();

async function onSearch(event) {
  event.preventDefault();
  const input = document.querySelector('#word-input');
  const word = input.value.trim();

  const results = document.querySelector('#results');
  results.classList.add('hidden');
  const result = await fetch('/lookup/' + word);
  const json = await result.json();

  myPokemon.tempPokemon = json;

  // Prep results.
  const wordDisplay = results.querySelector('#word');
  const defDisplay = results.querySelector('#definition');
  const idDisplay = results.querySelector('#id');
  const hpDisplay = results.querySelector('#hp');
  const attackDisplay = results.querySelector('#attack');
  const defenseDisplay = results.querySelector('#defense');
  const specialAttackDisplay = results.querySelector('#special-attack');
  const specialDefenseDisplay = results.querySelector('#special-defense');
  const speedDisplay = results.querySelector('#speed');
  wordDisplay.textContent = json.word.toUpperCase();
  defDisplay.textContent = json.definition;
  idDisplay.textContent = json.id;
  hpDisplay.textContent = json.hp;
  attackDisplay.textContent = json.attack;
  defenseDisplay.textContent = json.defense;
  specialAttackDisplay.textContent = json.specialAttack;
  specialDefenseDisplay.textContent = json.specialDefense;
  speedDisplay.textContent = json.speed;

  const imageDisplay = document.querySelector('#picture');
  imageDisplay.src = teamPokemon.getImageLink(myPokemon.imageLink, json.id, -1);

  // Display.
  results.classList.remove('hidden');
}

async function addPokemon(event) {
  const status = results.querySelector('#status');
  const error = results.querySelector('#error');
  error.textContent = '';
  status.textContent = '';

  event.preventDefault();
  const setTeam = results.querySelector('#pokemon-team');
  const message = {
    definition: myPokemon.tempPokemon
  };
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  };
  status.textContent = '';

  await fetch('/set/', fetchOptions);

  if (myPokemon.limit < 4) {
    myPokemon.limit += 1;
    myPokemon.list.push(JSON.stringify(myPokemon.tempPokemon.word).toUpperCase());
    
    setTeam.value = myPokemon.list.toString().replace(/ *, */g, '\n');
    teamPokemon.list_id.push(myPokemon.tempPokemon.id);

    status.textContent = 'Saved.';
  }
  else {
    error.textContent = 'MAX 3';
  }
}

async function removePokemon(event) {
  const status = results.querySelector('#status');
  status.textContent = '';
  event.preventDefault();

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: ''
  };
  await fetch('/remove/', fetchOptions);

  let removedAlert = myPokemon.list.pop();
  teamPokemon.list_id.pop();

  !removedAlert ? removedAlert = "Empty team" : removedAlert = "Removed " + removedAlert;
  
  myPokemon.update();

  const setTeam = results.querySelector('#pokemon-team');
  setTeam.value = myPokemon.list.toString().replace(/ *, */g, '\n');
  const error = results.querySelector('#error');
  error.textContent = removedAlert; 

}

async function setPokemon(event) {
  event.preventDefault();
  const status = results.querySelector('#status');
  const error = results.querySelector('#error');
  error.textContent = '';
  status.textContent = '';

  const pokemon3 = document.querySelector('#pokemon-three');
  const pokemon2 = document.querySelector('#pokemon-two');
  const pokemon1 = document.querySelector('#pokemon-one');

  pokemon1.src = teamPokemon.getImageLink(myPokemon.imageLink, teamPokemon.list_id, 0);
  pokemon2.src = teamPokemon.getImageLink(myPokemon.imageLink, teamPokemon.list_id, 1);
  pokemon3.src = teamPokemon.getImageLink(myPokemon.imageLink, teamPokemon.list_id, 2);
}

const searchForm = document.querySelector('#search');
searchForm.addEventListener('submit', onSearch);

const setForm = document.querySelector('#set'); //submit button
setForm.addEventListener('submit', addPokemon);

const removeForm = document.querySelector('#remove');
removeForm.addEventListener('submit', removePokemon);

const setTeam = document.querySelector('#set-team');
setTeam.addEventListener('submit', setPokemon);