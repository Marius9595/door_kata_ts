import { DoorState } from './DoorState';
import { Door } from '../door';
import { Opening } from './Opening';

export class Closed implements DoorState {
	constructor(private door: Door) {}

	processEvents(events: string): string {
		if (!events.includes('P')) {
			return events.replace('.', '0');
		}

		const indexOfButtonWasPressed = events.indexOf('P');
		const procceedEvents = events.slice(0, indexOfButtonWasPressed).replace('.', '0');
		const eventsToProcess = events.slice(indexOfButtonWasPressed);
		this.door.changeState(new Opening(this.door));

		return this.door.processEvents(procceedEvents + eventsToProcess);
	}
}
