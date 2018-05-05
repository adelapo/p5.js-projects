var squareSize = 40;
var snake;
var apple;

var path = [];

function setup() {
	createCanvas(800, 800);
	
	startBody = [[3, 0], [2, 0], [1, 0], [0, 0]];
	snake = new Snake(startBody);
	
	spawnApple();
	path = getPath(apple);
	
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
		path = getPath(apple);
	}
	
	for (var sq of path) {
		fill("orange");
		drawSquareAt(sq[0], sq[1]);
	}
	
	fill(0, 255, 0);
	drawSquareAt(snake.body[0][0], snake.body[0][1]);
	
	fill(255, 0, 0);
	drawSquareAt(apple[0], apple[1]);
	
	nextInPath = path.shift();
	
	if (nextInPath == undefined) {
		nextInPath = [head];
		path = getPath(apple);
	}
	
	head = snake.body[0];
	
	if (head[0] == nextInPath[0] && head[1] - 1 == nextInPath[1]) {
		snake.direction = "up";
	} else if (head[0] == nextInPath[0] && head[1] + 1 == nextInPath[1]) {
		snake.direction = "down";
	} else if (head[0] - 1 == nextInPath[0] && head[1] == nextInPath[1]) {
		snake.direction = "left";
	} else if (head[0] + 1 == nextInPath[0] && head[1] == nextInPath[1]) {
		snake.direction = "right";
	}

	snake.moveSnake();
}

function drawSquareAt(x, y) {
	rect(x * squareSize, y * squareSize, squareSize, squareSize);
}

function spawnApple() {
	apple = [int(random(width / squareSize)), int(random(height / squareSize))];
}

function getDist(a, b) {
	return abs(a[0] - b[0]) + abs(a[1] - b[1]);
}

function getPath(apple) {
	if (snake.contains(apple)) {
		console.log("Already have apple since it's at (" + apple[0] + ", " + apple[1] + ").");
		return [head];
	}
	
	
	head = snake.body[0];
	
	// Dijkstra's algorithm
	
	pq = new Queue(); // Create a new queue	
	src = new QItem(head, 0); // The snake's head is the source node
	pq.enqueue(src); // Add the snake's head to the queue
	
	visitedNodes = [];
	parents = new Map(); // they keys will be string versions of the coordinates (sorry)
	
	parents.set("" + head, "none");
	
	while (pq.items.length > 0 && pq.items.length < 400) { // Algorithm terminates if the queue is empty
		minItem = pq.dequeue(); // Take the element with the least priority off the queue
		minElem = minItem.element; // Get its position
		
		if (minElem[0] == apple[0] && minElem[1] == apple[1]) {
			path = [apple];
			current = apple;
			while (parents.get("" + current) != "none") {
				current = parents.get("" + current);
				path.unshift(current);
			}
			path.shift();
			return path;
		}
		
		visitedNodes.push(minElem); // Mark expanded node as visited
		
		// Get adjacent nodes		
		north = [minElem[0], minElem[1] - 1];
		south = [minElem[0], minElem[1] + 1];
		west = [minElem[0] - 1, minElem[1]];
		east = [minElem[0] + 1, minElem[1]];
		
		adj = [];
		for (var dir of [north, south, west, east]) {
			visited = false;
			for (var node of visitedNodes) {
				if (dir[0] == node[0] && dir[1] == node[1]) {
					visited = true;
				}
			}
			if (!visited && !snake.contains(dir)) {
				adj.push(dir);
			}
		}
		
		for (var adjacentNode of adj) {
			// If the adjacent node isn't part of the snake,
			// and either we haven't seen it yet or it's closer than previously seen,
			// then enqueue the adjacent node.
			if (minItem.priority + 1 < pq.getPriorityOfArray(adjacentNode)) {
				qitem = new QItem(adjacentNode, minItem.priority + 1);
				pq.enqueue(qitem);
				parents.set("" + adjacentNode, minElem);
			}
		}
		
	}
	
	console.log("Failed queue length is " + pq.items.length + " and apple pos is (" + apple[0] + ", " + apple[1] + ").");
	
	return [head];
}