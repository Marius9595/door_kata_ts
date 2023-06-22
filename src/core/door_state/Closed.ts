import { DoorState } from './DoorState';
import { Door } from '../door';
import { Opening } from './Opening';

export class Closed implements DoorState {
	constructor(private door: Door) {}

	processEvents(events: string): string {
		let index = 0;
		let eventsProcessed = '';
		const eventsToProcess = events.split('');
		const currentEventToEvaluate = eventsToProcess[index];
		while (currentEventToEvaluate === '.' && index < eventsToProcess.length) {
			const closed = '0';
			eventsProcessed += closed;
			index++;
		}

		const buttonWasPressed = 'P';
		if (currentEventToEvaluate === buttonWasPressed) {
			this.door.changeState(new Opening(this.door));
			const restOfEvents = events.substring(index);
			return eventsProcessed + this.door.processEvents(restOfEvents);
		}

		return eventsProcessed;
	}
}
