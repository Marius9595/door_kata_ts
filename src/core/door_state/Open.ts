import { DoorState } from './DoorState';
import { Door } from '../door';
import { Closed } from './Closed';
import { Closing } from './Closing';

export class Open implements DoorState {
	constructor(private door: Door) {}
	processEvents(events: string): string {
		const indexOfFive = events.indexOf('5');
		const procceedEvents = events.slice(0, indexOfFive);
		const eventsToProcess = events.slice(indexOfFive);

		let eventsInProcessing = procceedEvents;
		if (!eventsToProcess.includes('P')) {
			eventsInProcessing += eventsToProcess.replace('.', '5');
			return eventsInProcessing;
		}

		const indexOfButtonWasPressed = eventsToProcess.indexOf('P');
		eventsInProcessing += eventsToProcess.slice(0, indexOfButtonWasPressed).replace('.', '5');

		this.door.changeState(new Closing(this.door));
		return this.door.processEvents(eventsInProcessing + eventsToProcess.slice(indexOfButtonWasPressed));
	}
}
