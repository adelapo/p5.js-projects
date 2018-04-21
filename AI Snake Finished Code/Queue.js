function Queue() {
	this.items = [];
	
	this.enqueue = function(item) {
		index = 0;
		if (this.items.length > 0) {
			while (item.priority > this.items[index].priority) {
				index += 1;
			}
		}
		this.items.splice(index, 0, item);		
	}
	
	this.dequeue = function(item) {
		if (this.items.length > 0) {
			return this.items.shift();
		}
	}
	
	this.front = function() {
		if (this.items.length > 0) {
			return this.items[0];
		}
	}
	
	this.rear = function() {
		if (this.items.length > 0) {
			return this.items[this.items.length - 1];
		}
	}
}