function getPokemon(name) {
	var pk;
	
	function onResponse() {
		var data = JSON.parse(this.responseText);
		id = data.id;
		console.log(data.sprites);
		img = data.sprites.front_default;
		
		pk = new Pokemon(name, id, img);
	}
	
	var req = new XMLHttpRequest();
	req.addEventListener("load", onResponse);
	req.open("GET", "https://pokeapi.co/api/v2/pokemon/" + name + "/", false);
	req.send();
	
	return pk;
}