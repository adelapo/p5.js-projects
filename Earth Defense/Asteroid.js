function Asteroid(angle, dist) {
	
	this.radius = random(30, 50);
	
	this.sprite = createSprite(dist * cos(angle), dist * sin(angle), this.radius, this.radius);
	this.sprite.setCollider("circle", 0, 0, this.radius);
	
	this.vertsNum = int(random(5, 10));
	this.offsets = [];
	
	for (var i = 0; i < this.vertsNum; i++) {
		this.offsets[i] = random(-this.radius / 2, this.radius / 2);
	}
	
	var myself = this; // Need to save "this" for custom draw function
	
	this.sprite.draw = function() {
		// Custom sprite draw function
		// Here, "this" refers to myself.sprite

		noFill();
		stroke("red");
		
		beginShape();
		
		for (var i = 0; i < myself.vertsNum; i++) {
			var angle = map(i, 0, myself.vertsNum, 0, 360);
			var x = (myself.radius + myself.offsets[i]) * cos(angle);
			var y = (myself.radius + myself.offsets[i]) * sin(angle);
			vertex(x, y);
		}
		
		endShape(CLOSE);
		
	
	}
	
	this.sprite.setSpeed(3, angle + 180);
}