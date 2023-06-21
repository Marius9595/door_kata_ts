import { DoorState } from './DoorState';
import { Door } from '../door';

export class Opening implements DoorState {
	constructor(private door: Door) {}
	processEvents(events: string): string {
		const eventsToProcess = events.split('');
		let index = 1;
		let eventsProcessed = '1';
		while (eventsToProcess[index] === '.' && index < eventsToProcess.length) {
			eventsProcessed += (index + 1).toString() ;
			index++;
		}
    return eventsProcessed;
	}
}
