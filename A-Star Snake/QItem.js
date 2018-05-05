function QItem(element, gScore, hScore) {
	this.element = element;
	this.gScore = gScore;
	this.hScore = hScore;
	
	this.getPriority = function() {
		return this.gScore + this.hScore;
	}
}