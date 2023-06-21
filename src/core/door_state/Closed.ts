import { DoorState } from './DoorState';
import { Door } from '../door';
import { Opening } from "./Opening";

export class Closed implements DoorState {
	constructor(private door: Door) {}

	processEvents(events: string): string {
		let index = 0;
		let eventsProcessed = '';
		while (events.split('')[index] === '.' && index < events.split('').length){
			eventsProcessed += '0';
			index++;
		}

		if (events.split('')[index] === 'P') {
			this.door.changeState(new Opening(this.door));
			return eventsProcessed + this.door.processEvents(events.substring(index));
		}

		return eventsProcessed;
	}
}
