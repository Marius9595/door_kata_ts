import { DoorState } from './DoorState';
import { Door } from '../door';
import { Opening } from './Opening';
import { Closing } from "./Closing";

export class PausedClosing implements DoorState {
	constructor(private door: Door) {}
	processEvents(events: string): string {
		const lastEvent = events.split('')[0];
		if (events.length === 1) {
			return lastEvent;
		}

		let index = 1;
		let eventsProcessed = '';
		while (events.length > index && events[index] === '.') {
			eventsProcessed += lastEvent;
			index++;
		}

		const buttonPressed = 'P';
		if (events[index] === buttonPressed) {
			this.door.changeState(new Closing(this.door));
			const lastEvent = eventsProcessed.split('')[eventsProcessed.length - 1];
			const restOfEvents = events.substring(index);
			return eventsProcessed + this.door.processEvents(lastEvent + restOfEvents.substring(1));
		}

		return eventsProcessed;
	}
}
