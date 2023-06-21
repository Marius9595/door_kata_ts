import { DoorState } from './DoorState';
import { Door } from '../door';
import { Open } from './Open';

export class Opening implements DoorState {
	constructor(private door: Door) {}
	processEvents(events: string): string {
		const eventsToProcess = events.split('');
		const open = '5';
		let index = 1;
		const firstOpeningPosition = '1';
		let eventsProcessed = firstOpeningPosition;
		while (eventsToProcess[index] === '.' && index < eventsToProcess.length && !eventsProcessed.includes(open)) {
			const nextOpeningPosition = (index + 1).toString();
			eventsProcessed += nextOpeningPosition;
			index++;
		}

		if (eventsProcessed.includes(open) && index < eventsToProcess.length) {
			this.door.changeState(new Open(this.door));
			const restOfEvents = events.substring(index);
			return eventsProcessed + this.door.processEvents(restOfEvents);
		}
		return eventsProcessed;
	}
}
