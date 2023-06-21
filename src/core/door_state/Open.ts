import { DoorState } from './DoorState';
import { Door } from '../door';
import { Opening } from './Opening';
import { Closing } from './Closing';

export class Open implements DoorState {
	constructor(private door: Door) {}
	processEvents(events: string): string {
		let index = 0;
		let eventsProcessed = '';
		const eventsToProcess = events.split('');
		while (eventsToProcess[index] === '.' && index < eventsToProcess.length) {
			eventsProcessed += '5';
			index++;
		}

		const buttonWasPressed = 'P';
		if (eventsToProcess[index] === buttonWasPressed) {
			this.door.changeState(new Closing(this.door));
			const restOfEvents = events.substring(index);
			return eventsProcessed + this.door.processEvents(restOfEvents);
		}

		return eventsProcessed;
	}
}
