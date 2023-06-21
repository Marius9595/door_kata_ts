import { DoorState } from './DoorState';
import { Door } from '../door';
import { Opening } from "./Opening";

export class Closed implements DoorState {
	constructor(private door: Door) {}

	processEvents(events: string): string {
		let index = 0;
		let eventsProcessed = '';
		const eventsToProcess = events.split('');
		while (eventsToProcess[index] === '.' && index < eventsToProcess.length){
			eventsProcessed += '0';
			index++;
		}

		const buttonWasPressed = 'P';
		if (eventsToProcess[index] === buttonWasPressed) {
			this.door.changeState(new Opening(this.door));
			return eventsProcessed + this.door.processEvents(events.substring(index));
		}

		return eventsProcessed;
	}
}
