import Heap from './Heap';

interface Floor {
    prev: Floor,
    next: Floor,
    number: number
}
interface Request {
    requestedFloor: Floor;
}

class Elevator {
    private floors: Floor[] = [];
    private priority: number = 1;
    private currentFloor: Floor;
    private upRequestsHeap: Heap;
    private downRequestsHeap: Heap;
    private currentRequest: Request = null;
    private direction: string
    constructor(numFloors: number) {
        let upComparator = function (requestA: Request, requestB: Request) {
            if (requestA.requestedFloor > requestB.requestedFloor) {
                return 1;
            }
            if (requestA.requestedFloor < requestB.requestedFloor) {
                return -1;
            }
            return 0;
        }
        let downComparator = function (requestA: Request, requestB: Request) {
            if (requestA.requestedFloor > requestB.requestedFloor) {
                return -1;
            }
            if (requestA.requestedFloor < requestB.requestedFloor) {
                return 1;
            }
            return 0;
        }
        this.upRequestsHeap = new Heap(upComparator);
        this.downRequestsHeap = new Heap(downComparator);

        for (let i = 0; i < numFloors; i++) {
            let floor: Floor = {
                prev: null,
                next: null,
                number: i + 1
            }

            if (i > 0) {
                this.floors[i - 1].next = floor;
                floor.prev = this.floors[i - 1];
            }
            this.floors.push(floor)
            this.currentFloor = this.floors[0];
        }
    }

    public getFloors() {
        return this.floors;
    }

    public requestFloor(num) {

        let request: Request = {
            requestedFloor: this.floors[num - 1]
        }
        if (num < this.currentFloor.number) {
            this.downRequestsHeap.push(request);
            if (this.currentRequest === null)
                this.currentRequest = this.downRequestsHeap.pop();
            else if (request.requestedFloor.number > this.currentRequest.requestedFloor.number) {
                this.downRequestsHeap.push(this.currentRequest);
                this.currentRequest = this.downRequestsHeap.pop();
            }
        }
        else if (num > this.currentFloor.number) {
            this.upRequestsHeap.push(request);
            if (this.currentRequest === null)
                this.currentRequest = this.upRequestsHeap.pop();
            else if (request.requestedFloor.number < this.currentRequest.requestedFloor.number) {
                this.upRequestsHeap.push(this.currentRequest);
                this.currentRequest = this.upRequestsHeap.pop();
            }
        }

        function then(callback) {
            if (this.currentRequest !== null) {
                let direction = this.currentRequest.requestedFloor.number - this.currentFloor.number;
                console.log('dir: ' + direction, 'req: ' + this.currentRequest.requestedFloor.number, 'curr:' + this.currentFloor.number)
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
            return prom
        }

        let prom = {
            then: then.bind(this),
            requestFloor: this.requestFloor.bind(this)
        }
        return prom;
    }

}

let elevator = new Elevator(5);
function log(current: Floor) {
    console.log(current.number);
}
elevator.requestFloor(3).requestFloor(4).requestFloor(5)
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