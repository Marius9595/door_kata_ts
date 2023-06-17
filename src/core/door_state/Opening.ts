import { DoorState } from './DoorState';
import { Door } from '../door';
import { Open } from './Open';

export class Opening implements DoorState {
	constructor(private door: Door) {}

	processEvents(events: string): string {
		const indexOfButtonWasPressed = events.indexOf('P');
		const procceedEvents = events.slice(0, indexOfButtonWasPressed).replace('.', '0');
		const eventsToProcess = events.slice(indexOfButtonWasPressed);

		let eventsInProcessing = procceedEvents;
		if (!eventsToProcess.substring(1).includes('P')) {
			if (eventsToProcess.length > 5) {
				this.door.changeState(new Open(this.door));
				return this.door.processEvents(eventsInProcessing + '12345' + eventsToProcess.slice(5));
			} else {
				for (let i = 0; i < eventsToProcess.length; i++) {
					eventsInProcessing += i + 1;
			}
				return eventsInProcessing;
			}
		}
		return '';
	}
}
