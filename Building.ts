import { Elevator} from './Elevator';
import {LightElevator} from './LightElevator';

class Building {
    private elevators: Array<Elevator> = []
    constructor(elevators: Array<Elevator>) {
        this.elevators = elevators;
    }
}

