let tempPokemon = "";
let limit = 1;
let list = [];
let imageLink = "https://raw.githubusercontent.com/PokeApi/sprites/master/sprites/pokemon/";

async function onSearch(event) {
  event.preventDefault();
  const input = document.querySelector('#word-input');
  const word = input.value.trim();

  const results = document.querySelector('#results');
  results.classList.add('hidden');
  const result = await fetch('/lookup/' + word);
  const json = await result.json();

  tempPokemon = json;

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
  const sourceDisplay = results.querySelector('#source');
  wordDisplay.textContent = json.word.toUpperCase();
  defDisplay.textContent = json.definition;
  idDisplay.textContent = json.id;
  hpDisplay.textContent = json.hp;
  attackDisplay.textContent = json.attack;
  defenseDisplay.textContent = json.defense;
  specialAttackDisplay.textContent = json.specialAttack;
  specialDefenseDisplay.textContent = json.specialDefense;
  speedDisplay.textContent = json.speed;
  sourceDisplay.textContent = json.source;

  const imageDisplay = document.querySelector('#picture');
  let temp = "";
  temp = temp.concat(imageLink, json.id, ".png");
  imageDisplay.src = temp;

  // Display.
  results.classList.remove('hidden');
}

async function addPokemon(event) {
  const status = results.querySelector('#status');
  const error = results.querySelector('#error');
  error.textContent = '';

  event.preventDefault();
  const setTeam = results.querySelector('#pokemon-team');
  const message = {
    definition: tempPokemon
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

  if (limit < 4) {
    limit += 1;
    list.push(JSON.stringify(tempPokemon.word).toUpperCase());
    setTeam.value = list.toString().replace(/ *, */g, '\n');

    status.textContent = 'Saved.';
  }
  else {
    error.textContent = 'MAX 3';
  }
}

async function removePokemon(event) {
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

  let removedAlert = list.pop();

  !removedAlert ? removedAlert = "Empty team" : removedAlert = "Removed " + removedAlert;
  
  limit > 1 ? limit -= 1 : limit = 1;

  const setTeam = results.querySelector('#pokemon-team');
  setTeam.value = list.toString().replace(/ *, */g, '\n');
  const error = results.querySelector('#error');
  error.textContent = removedAlert; 
}

const searchForm = document.querySelector('#search');
searchForm.addEventListener('submit', onSearch);

const setForm = document.querySelector('#set');
setForm.addEventListener('submit', addPokemon);

const removeForm = document.querySelector('#remove');
removeForm.addEventListener('submit', removePokemon);