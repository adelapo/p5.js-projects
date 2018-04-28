function Queue() {
	this.items = [];
	
	this.enqueue = function(item) {
		index = 0;
		while (index < this.items.length && item.priority > this.items[index].priority) {
			index += 1;
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
	
	this.isEmpty = function() {
		return this.items.length == 0;
	}
	
	// For arrays only
	this.getPriorityOfArray = function(item) {
		for (var qitem of this.items) {
			elem = qitem.element;
			if (elem[0] == item[0] && elem[1] == item[1]) {
				return qitem.priority;
			}
		}
		return Infinity;
	}
}