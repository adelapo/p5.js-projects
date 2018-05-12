var pokemon;

var x;
var y;

function setup() {
	createCanvas(800, 600);
	
	pokemon = getPokemon("pikachu");
	console.log(pokemon.name + "'s id is #" + pokemon.id);
	
	pkImage = loadImage(pokemon.imgLink);
	
	x = 0;
	y = 0;
}

function draw() {
	background(51);
	
	if (keyIsDown(LEFT_ARROW)) {
		x -= 10;
	}
	if (keyIsDown(RIGHT_ARROW)) {
		x += 10;
	}
	if (keyIsDown(UP_ARROW)) {
		y -= 10;
	}
	if (keyIsDown(DOWN_ARROW)) {
		y += 10;
	}
	
	image(pkImage, x, y, pkImage.width * 2, pkImage.height * 2);
}