import { DoorState } from './DoorState';
import { Door } from '../door';
import { Open } from './Open';

export class Closing implements DoorState {
	constructor(private door: Door) {}
	processEvents(events: string): string {
		const eventsToProcess = events.split('');
		let index = 1;
		let eventsProcessed = '4';
		while (eventsToProcess[index] === '.' && index < eventsToProcess.length && !eventsProcessed.includes('0')) {
			eventsProcessed += (4 - index).toString();
			index++;
		}
		const isClosed = '0';
		if (eventsProcessed.includes(isClosed) && index < eventsToProcess.length) {
			this.door.changeState(new Open(this.door));
			const restOfEvents = events.substring(index);
			return eventsProcessed + this.door.processEvents(restOfEvents);
		}
		return eventsProcessed;
	}
}
