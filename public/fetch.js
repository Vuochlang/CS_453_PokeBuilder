let tempPokemon = "";

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

  // Display.
  results.classList.remove('hidden');
}

async function onSet(event) {
  event.preventDefault();
  const setTeam = results.querySelector('#pokemon-team');
  const word = tempPokemon.name;

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
  const status = results.querySelector('#status');
  status.textContent = '';
  await fetch('/set/', fetchOptions);

  if (setTeam.value == "") {
    setTeam.value = JSON.stringify(tempPokemon.word).toUpperCase();
  }
  else {
    setTeam.value = setTeam.value + "\n" + JSON.stringify(tempPokemon.word).toUpperCase();
  }

  status.textContent = 'Saved.';
}

const searchForm = document.querySelector('#search');
searchForm.addEventListener('submit', onSearch);

const setForm = document.querySelector('#set');
setForm.addEventListener('submit', onSet);
