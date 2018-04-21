var squareSize = 40;
var snake;
var apple;

function setup() {
	createCanvas(800, 800);
	
	startBody = [[3, 0], [2, 0], [1, 0], [0, 0]];
	snake = new Snake(startBody);
	
	spawnApple();
	
	// noStroke();
}

function draw() {
	background(51);
	
	fill(0, 200, 0);
	for (var seg of snake.body) {
		drawSquareAt(seg[0], seg[1]);
	}
	
	if (snake.contains(apple)) {
		spawnApple();
		snake.grow();
	}
	
	fill(0, 255, 0);
	drawSquareAt(snake.body[0][0], snake.body[0][1]);
	
	fill(255, 0, 0);
	drawSquareAt(apple[0], apple[1]);
	
	// snake.chooseDirection();
	// snake.moveSnake();
}

function drawSquareAt(x, y) {
	rect(x * squareSize, y * squareSize, squareSize, squareSize);
}

function spawnApple() {
	apple = [int(random(width / squareSize)), int(random(height / squareSize))];
}

function keyPressed() {
	snake.moveSnake();
}

function getPath() {
	
}