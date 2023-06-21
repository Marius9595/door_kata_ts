import { DoorState } from './DoorState';
import { Door } from '../door';
import { Open } from './Open';

export class Closing implements DoorState {
	constructor(private door: Door) {}
	processEvents(events: string): string {
		const eventsToProcess = events.split('');
		const closed = '0';
		let index = 1;
		const firstClosingPosition = '4';
		let eventsProcessed = firstClosingPosition;
		while (eventsToProcess[index] === '.' && index < eventsToProcess.length && !eventsProcessed.includes(closed)) {
      const nextClosingPosition = (4 - index).toString();
      eventsProcessed += nextClosingPosition;
			index++;
		}

		if (eventsProcessed.includes(closed) && index < eventsToProcess.length) {
			this.door.changeState(new Open(this.door));
			const restOfEvents = events.substring(index);
			return eventsProcessed + this.door.processEvents(restOfEvents);
		}
		return eventsProcessed;
	}
}
