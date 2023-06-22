import { DoorState } from './DoorState';
import { Door } from '../door';
import { Opening } from './Opening';

export class Closed implements DoorState {
	constructor(private door: Door) {}

	processEvents(events: string): string {
		const firstElement = 0;
		let eventsProcessed = '';
		const eventsToProcess = events.split('');
		const currentEventToEvaluate = eventsToProcess[firstElement];

		if (currentEventToEvaluate === '.') {
			const closed = '0';
			eventsProcessed += closed;
			const restEventsToProcess = events.substring(firstElement + 1);
			return eventsProcessed + this.door.processEvents(restEventsToProcess);
		}

		const buttonWasPressed = 'P';
		if (currentEventToEvaluate === buttonWasPressed) {
			this.door.changeState(new Opening(this.door));
			const restOfEvents = events.substring(firstElement);
			return eventsProcessed + this.door.processEvents(restOfEvents);
		}

		return eventsProcessed;
	}
}
