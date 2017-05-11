class Heap {
    public heap: Array<any> = [];
    private compare(a, b) {
        if (a > b) {
            return 1;
        }
        if (a < b) {
            return -1;
        }
        return 0;
    }
    constructor(compare) {
        if (typeof compare == 'function') {
            this.compare = compare;
        }

    }
    private swap(a, b) {
        var temp = this.heap[a];
        this.heap[a] = this.heap[b];
        this.heap[b] = temp;
    }
    private bubbleUp(pos) {
        if (pos <= 0) {
            return;
        }
        let parent = Math.floor((pos - 1) / 2);

        let currentElement = this.heap[pos];
        let parentElement = this.heap[parent];

        if (this.compare(currentElement, parentElement) === -1) {
            this.swap(pos, parent);
            this.bubbleUp(parent);
        }
    }
    private bubbleDown(pos) {

        let left = 2 * pos + 1;
        let right = left + 1;
        let shortest = pos;

        let letftElement = this.heap[left];
        let rightElement = this.heap[right];
        let shortestElement = this.heap[shortest];


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
    }
    public pop() {
        if (this.heap.length === 0) return null;

        let lastIndex = this.heap.length - 1;
        this.swap(lastIndex, 0);
        let value = this.heap.pop();
        if (lastIndex > 0)
            this.bubbleDown(0)
        return value?value:null;
    }
    public push(value: any) {
        this.heap.push(value);
        let lastIndex = this.heap.length - 1;
        this.bubbleUp(lastIndex);
    }
    public getLength() {
        return this.heap.length;
    }
}

export default Heap;