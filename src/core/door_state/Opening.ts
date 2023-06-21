import { DoorState } from './DoorState';
import { Door } from '../door';
import { Open } from './Open';
import { PausedOpening } from "./PausedOpening";

export class Opening implements DoorState {
	constructor(private door: Door) {}
	processEvents(events: string): string {
		const eventsToProcess = events.split('');
		const open = '5';
		let index = 1;
		const firstOpeningPosition = '1';
		let eventsProcessed = firstOpeningPosition;
		while (eventsToProcess[index] === '.' && index < eventsToProcess.length && !eventsProcessed.includes(open)) {
			const nextOpeningPosition = (index + 1).toString();
			eventsProcessed += nextOpeningPosition;
			index++;
		}

		const buttonPressed = 'P';
		if (
			eventsToProcess.includes(buttonPressed) &&
			index < eventsToProcess.length &&
			!eventsProcessed.includes(open)
		) {
			this.door.changeState(new PausedOpening(this.door));
			const restOfEvents = events.substring(index);
			const lastEvent = eventsProcessed.split('')[eventsProcessed.length-1];
			return eventsProcessed + this.door.processEvents(lastEvent + restOfEvents.substring(1));
		}

		if (eventsProcessed.includes(open) && index < eventsToProcess.length) {
			this.door.changeState(new Open(this.door));
			const restOfEvents = events.substring(index);
			return eventsProcessed + this.door.processEvents(restOfEvents);
		}
		return eventsProcessed;
	}
}
