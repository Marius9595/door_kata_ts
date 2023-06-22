import { DoorState } from './DoorState';
import { Door } from '../door';
import { Closing } from './Closing';

export class Open implements DoorState {
	constructor(private door: Door) {}
	processEvents(events: string): string {
		const first = 0;
		let eventsProcessed = '';
		const eventsToProcess = events.split('');

		const isNoEvent = eventsToProcess[first] === '.';
		const isButtonPressedEvent = eventsToProcess[first] === 'P';

		if (isNoEvent) {
			const open = '5';
			eventsProcessed += open;
			return eventsProcessed + this.door.processEvents(events.substring(first + 1));
		} else if (isButtonPressedEvent) {
			this.door.changeState(new Closing(this.door));
			const restOfEvents = events.substring(first);
			return eventsProcessed + this.door.processEvents(restOfEvents);
		} else {
			return eventsProcessed;
		}
	}
}
