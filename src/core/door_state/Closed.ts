import { DoorState } from './DoorState';
import { Door } from '../door';

export class Closed implements DoorState {
	constructor(private door: Door) {}

	processEvents(events: string): string {
		let index = 0;
		let eventsProcessed = '';
		while(events.split("")[index] === ".") {
			eventsProcessed += '0';
			index++;
		}
		return eventsProcessed;
	}
}
