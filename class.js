module.exports = class Pokemon {
	constructor() {
		this.pokemonList = {
			"1" : "",
			"2" : "",
			"3" : ""
			// "4" : "",
			// "5" : "",
			// "6" : ""
		}
		this.max = 3;
	}

	printPokemon() {
		for (const [index, eachPokemon] of Object.entries(this.pokemonList)) {
			if (!eachPokemon)
				console.log("---- debug: ", index, " -> has no entry");
			else
				console.log("---- debug: ", index, " -> ", eachPokemon);
		} 
	}

	addPokemon(index, pokemonData) {
		this.pokemonList[index] = pokemonData;
		console.log("---- debug: Added <" + JSON.stringify(pokemonData.word) + "> to Pokemon List order: " + index);
	}

}	

// const animal = {
// 	"id": 898, 
// 	"name": "calyrex", 
// 	"types": ["Psychic", "Grass"], 
// 	"hp": 100, "attack": 80, 
// 	"defense": 80, 
// 	"special-attack": 80, 
// 	"special-defense": 80, 
// 	"speed": 80, 
// 	"source": "http://pokeapi.co/api/v2/pokemon/898/"
// }

// const test = new Pokemon();
// test.addPokemon("1", animal);
// test.printPokemon();
// ooutput 
// 1  ->  {
//   id: 898,
//   name: 'calyrex',
//   types: [ 'Psychic', 'Grass' ],
//   hp: 100,
//   attack: 80,
//   defense: 80,
//   'special-attack': 80,
//   'special-defense': 80,
//   speed: 80,
//   source: 'http://pokeapi.co/api/v2/pokemon/898/'
// }