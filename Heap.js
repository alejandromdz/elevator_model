"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Heap = (function () {
    function Heap(compare) {
        this.heap = [];
        if (typeof compare == 'function') {
            this.compare = compare;
        }
    }
    Heap.prototype.compare = function (a, b) {
        if (a > b) {
            return 1;
        }
        if (a < b) {
            return -1;
        }
        return 0;
    };
    Heap.prototype.swap = function (a, b) {
        var temp = this.heap[a];
        this.heap[a] = this.heap[b];
        this.heap[b] = temp;
    };
    Heap.prototype.bubbleUp = function (pos) {
        if (pos <= 0) {
            return;
        }
        var parent = Math.floor((pos - 1) / 2);
        var currentElement = this.heap[pos];
        var parentElement = this.heap[parent];
        if (this.compare(currentElement, parentElement) === -1) {
            this.swap(pos, parent);
            this.bubbleUp(parent);
        }
    };
    Heap.prototype.bubbleDown = function (pos) {
        var left = 2 * pos + 1;
        var right = left + 1;
        var shortest = pos;
        var letftElement = this.heap[left];
        var rightElement = this.heap[right];
        var shortestElement = this.heap[shortest];
        if (left < this.heap.length && this.compare(letftElement, shortestElement) === -1) {
            shortest = left;
        }
        if (right < this.heap.length && this.compare(rightElement, shortestElement) === -1) {
            shortest = right;
        }
        if (shortest !== pos) {
            this.swap(shortest, pos);
            this.bubbleDown(shortest);
        }
    };
    Heap.prototype.pop = function () {
        if (this.heap.length === 0)
            return null;
        var lastIndex = this.heap.length - 1;
        this.swap(lastIndex, 0);
        var value = this.heap.pop();
        if (lastIndex > 0)
            this.bubbleDown(0);
        return value ? value : null;
    };
    Heap.prototype.push = function (value) {
        this.heap.push(value);
        var lastIndex = this.heap.length - 1;
        this.bubbleUp(lastIndex);
    };
    Heap.prototype.getLength = function () {
        return this.heap.length;
    };
    return Heap;
}());
exports.default = Heap;
//# sourceMappingURL=Heap.js.map