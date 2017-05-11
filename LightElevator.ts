import { Elevator,  Floor } from './Elevator';

export interface LightPromInterface  {
    then(callback: Function): LightPromInterface
    requestFloor(numFloor: number): LightPromInterface
    addWeight(value: number): LightPromInterface
    removeWeight(value:number):LightPromInterface
}

export class LightElevator extends Elevator {
    maxWeight: number = 0;
    currentWeight: number = 0;
    constructor(numFloors: number, maxWeight: number) {
        super(numFloors);
        this.maxWeight = maxWeight;
    }
    public removeWeight(value: number): LightPromInterface {
         console.log('\x1B[34m', 'Removing Weight: -', '\x1B[36m', +value );
        this.currentWeight -= value;
        if(this.currentWeight<0) this.currentWeight=0;
        return {
            then: this.then.bind(this),
            requestFloor: this.requestFloor.bind(this),
            addWeight: this.addWeight.bind(this),
            removeWeight:this.removeWeight.bind(this)
        }
    }
    public addWeight(value: number): LightPromInterface {
         console.log('\x1B[34m', 'Adding Weight: +', '\x1B[36m', +value );
        this.currentWeight += value;
        return {
            then: this.then.bind(this),
            requestFloor: this.requestFloor.bind(this),
            addWeight: this.addWeight.bind(this),
            removeWeight:this.removeWeight.bind(this)
        }
    }
    public then(callback: Function): LightPromInterface {
        if (this.currentWeight > this.maxWeight)
            console.log('\x1B[31m', 'max weight (','\x1B[36m',this.maxWeight,'\x1B[31m',') exceeded, current:','\x1B[36m',this.currentWeight);
        else
            super.then(callback)

        return {
            then: this.then.bind(this),
            requestFloor: this.requestFloor.bind(this),
            addWeight: this.addWeight.bind(this),
            removeWeight:this.removeWeight.bind(this)
        }
    }
    public requestFloor(numFloor: number): LightPromInterface {
         super.requestFloor(numFloor);
         return {
            then: this.then.bind(this),
            requestFloor: this.requestFloor.bind(this),
            addWeight: this.addWeight.bind(this),
            removeWeight:this.removeWeight.bind(this)
        }
    }
}


//Tests
/*
let lightElevator = new LightElevator(10, 19);

function log(current: Floor) {
    console.log('\x1B[39m', 'current floor: ✔', '\x1B[36m', + current.number);
}
lightElevator
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
    .addWeight(10)
    .then(log)
    .addWeight(10)
    .then(log)
    .then(log)
    .removeWeight(1)
    .then(log)
    .then(log)
    .then(log)
    .then(log)
    .then(log);
*/