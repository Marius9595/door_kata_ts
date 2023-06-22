import { DoorState } from './DoorState';
import { Door } from '../door';
import { Opening } from './Opening';

export class Closed implements DoorState {
	constructor(private door: Door) {}

	processEvents(events: string): string {
		const first = 0;
		let eventProcessed = '';
		const eventsToProcess = events.split('');
		const currentEventToEvaluate = eventsToProcess[first];

		const isNoEvent = currentEventToEvaluate === '.';
		const isButtonPressedEvent = currentEventToEvaluate === 'P';

		if (isNoEvent) {
			const closed = '0';
			eventProcessed += closed;
			const restEventsToProcess = events.substring(first + 1);
			return eventProcessed + this.door.processEvents(restEventsToProcess);
		} else if (isButtonPressedEvent) {
			this.door.changeState(new Opening(this.door));
			const restOfEvents = events.substring(first);
			return eventProcessed + this.door.processEvents(restOfEvents);
		} else {
			return eventProcessed;
		}
	}
}
