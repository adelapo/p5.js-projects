function Snake(startBody) {
	this.body = startBody;
	this.direction = "right";
	this.counter = 0;
	
	this.moveSnake = function() {
		nextSegment = this.getSegment(this.direction);
		
		snake.body.unshift(nextSegment);
		if (this.counter > 0) {
			this.counter = this.counter - 1;
		} else {
			snake.body.pop();
		}
	}
	
	this.grow = function() {
		this.counter += 1;
	}
	
	this.getSegment = function(direc) {
		dx = 0;
		dy = 0
		if (direc == "right") {
			dx = 1;
		} else if (direc == "left") {
			dx = -1;
		} else if (direc == "up") {
			dy = -1;
		} else if (direc == "down") {
			dy = 1;
		}
		
		head = this.body[0];
		return [head[0] + dx, head[1] + dy];
	}
	
	this.contains = function(sq) {
		for (var segment of this.body) {
			if (segment[0] == sq[0] && segment[1] == sq[1]) {
				return true;
			}
		}
		return false;
	}
}