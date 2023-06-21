import { DoorState } from './DoorState';
import { Door } from '../door';

export class PausedOpening implements DoorState {
	constructor(private door: Door) {}

	processEvents(events: string): string {
		const lastEvent = events.split('')[0];
		if (events.length === 1) {
			return lastEvent;
		}

		let index = 1;
		let eventsProcessed = '';
		while (events.length > index && events[index] === '.') {
			eventsProcessed += lastEvent;
			index++;
		}
		return eventsProcessed;
	}
}
