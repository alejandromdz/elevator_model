import Heap from './Heap';

export interface Floor {
    prev: Floor,
    next: Floor,
    number: number
}
interface Request {
    requestedFloor: Floor;
}
export interface PromInterface {
    /**
     * Floor Callback
     * @callback floorCallback
     * @param {Object} currentFloor - The current floor object 
     */

    /**
     * Asynchronous flow
     * @param {floorCallback} callback - Handles floor change
     */
    then(callback: Function): PromInterface
    /**
    * Adds a floor request to a priority queue
    * @param {number} numFloor - floor to be requested
    */
    requestFloor(numFloor: number): PromInterface
}

export class Elevator {
    private numFloors: number = 0;
    private floors: Floor[] = [];
    private currentFloor: Floor;
    private upRequestsHeap: Heap;
    private downRequestsHeap: Heap;
    private currentRequest: Request = null;

    constructor(numFloors: number) {
        this.numFloors = numFloors;
        //compare functions to create min/max heap
        let upComparator = function (requestA: Request, requestB: Request) {
            if (requestA.requestedFloor > requestB.requestedFloor) return 1;
            if (requestA.requestedFloor < requestB.requestedFloor) return -1;
            return 0;
        }
        let downComparator = function (requestA: Request, requestB: Request) {
            if (requestA.requestedFloor > requestB.requestedFloor) return -1;
            if (requestA.requestedFloor < requestB.requestedFloor) return 1;
            return 0;
        }
        //priority queue for up/down requests
        this.upRequestsHeap = new Heap(upComparator);
        this.downRequestsHeap = new Heap(downComparator);

        for (let i = 0; i < numFloors; i++) {
            let floor: Floor = {
                prev: null,
                next: null,
                number: i + 1
            }
            //prevents to assign prev to the first floor
            if (i > 0) {
                this.floors[i - 1].next = floor;
                floor.prev = this.floors[i - 1];
            }
            this.floors.push(floor)
            this.currentFloor = this.floors[0];
        }
    }
    /**
     * Adds a floor request to a priority queue
     * @param {number} numFloor - floor to be requested
     */
    public requestFloor(numFloor: number): PromInterface {
        console.log('\x1B[33m', 'requesting: ❯', '\x1B[36m', + numFloor);
        let request: Request = {
            requestedFloor: this.floors[numFloor - 1]
        }
        if (numFloor < this.currentFloor.number) {
            this.downRequestsHeap.push(request);
            if (this.currentRequest === null)
                this.currentRequest = this.downRequestsHeap.pop();
            else if (request.requestedFloor.number > this.currentRequest.requestedFloor.number) {
                this.downRequestsHeap.push(this.currentRequest);
                this.currentRequest = this.downRequestsHeap.pop();
            }
        }
        else if (numFloor > this.currentFloor.number) {
            this.upRequestsHeap.push(request);
            if (this.currentRequest === null)
                this.currentRequest = this.upRequestsHeap.pop();
            else if (request.requestedFloor.number < this.currentRequest.requestedFloor.number) {
                this.upRequestsHeap.push(this.currentRequest);
                this.currentRequest = this.upRequestsHeap.pop();
            }
        }
        return {
            then: this.then.bind(this),
            requestFloor: this.requestFloor.bind(this)
        }
    }

    public then(callback: Function): PromInterface {
        if (this.currentRequest !== null) {
            let direction = this.currentRequest.requestedFloor.number - this.currentFloor.number;
            if (direction > 0) this.currentFloor = this.currentFloor.next;
            if (direction < 0) this.currentFloor = this.currentFloor.prev;

            if (direction === 1) {
                this.currentRequest = this.upRequestsHeap.pop();
                if (this.currentRequest === null)
                    this.currentRequest = this.downRequestsHeap.pop();
            }
            if (direction === -1) {
                this.currentRequest = this.downRequestsHeap.pop();
                if (this.currentRequest === null)
                    this.currentRequest = this.upRequestsHeap.pop();
            }
        }
        callback.call(this, this.currentFloor);
        return {
            then: this.then.bind(this),
            requestFloor: this.requestFloor.bind(this)
        }
    }

}

//Tests

/*
let elevator = new Elevator(5);
function log(current: Floor) {
    console.log('\x1B[39m', 'current floor: ✔', '\x1B[36m', + current.number);
}
elevator.then(log)
    .requestFloor(3).requestFloor(4).requestFloor(5)
    .then(log)
    .then(log)
    .then(log)
    .then(log)
    .then(log)
    .requestFloor(1)
    .then(log)
    .then(log)
    .requestFloor(5)
    .then(log)
    .then(log)
    .then(log)
    .then(log)
    .then(log)
    .then(log)
    .then(log)
    .then(log)
    .then(log)
    .requestFloor(3).requestFloor(4).requestFloor(5)
    .then(log)
    .then(log)
    .then(log)
    .then(log)
    .then(log)
    .then(log)
    .requestFloor(3).requestFloor(4).requestFloor(5)
    .then(log)
    .requestFloor(1)
    .then(log)
    .then(log)
    .then(log)
    .then(log)
    .then(log)
    .then(log)
*/