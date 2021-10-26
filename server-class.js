module.exports = class ServerPokemon {
	constructor() {
		this.pokemonList = [];
		this.index = 0;
	}

	printPokemon() {
		console.log("debug <class> printing..");
		for(var i = 0; i < this.pokemonList.length ; i++){
			console.log(this.pokemonList[i].word);
		} 
	}

	addPokemon(pokemonData) {
		if (this.index > 2) return;
		this.pokemonList.push(pokemonData);
		this.index += 1;
		console.log("debug <class>: added <" + JSON.stringify(pokemonData.word));
	}

	remove() {
		this.pokemonList.pop();
		console.log("debug <class>: removed last pokemon");
	}

}	