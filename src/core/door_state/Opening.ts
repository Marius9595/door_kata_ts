import { DoorState } from './DoorState';
import { Door } from '../door';
import { Open } from './Open';

export class Opening implements DoorState {
	constructor(private door: Door) {}
	processEvents(events: string): string {
		const eventsToProcess = events.split('');
		let index = 1;
		let eventsProcessed = '1';
		while (
			eventsToProcess[index] === '.' &&
			index < eventsToProcess.length &&
      !eventsProcessed.includes('5')
		) {
			eventsProcessed += (index + 1).toString();
			index++;
		}
		const isOpen = '5';
		if (eventsProcessed.includes(isOpen) && index < eventsToProcess.length) {
			this.door.changeState(new Open(this.door));
			const restOfEvents = events.substring(index);
			return eventsProcessed + this.door.processEvents(restOfEvents);
		}
		return eventsProcessed;
	}
}
