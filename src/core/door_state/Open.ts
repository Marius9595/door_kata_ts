import { DoorState } from './DoorState';
import { Door } from '../door';

export class Open implements DoorState {
	constructor(private door: Door) {}
	processEvents(events: string): string {
		const indexOfFive = events.indexOf('5');
		const procceedEvents = events.slice(0, indexOfFive);
		const eventsToProcess = events.slice(indexOfFive);

		let eventsInProcessing = procceedEvents;
		if (!eventsToProcess.includes('P')) {
			eventsInProcessing += eventsToProcess.replace('.', '5');
		}

		return eventsInProcessing;
	}
}
