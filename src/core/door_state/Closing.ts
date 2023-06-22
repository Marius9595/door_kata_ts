import { DoorState } from './DoorState';
import { Door } from '../door';
import { Open } from './Open';
import { PausedOpening } from "./PausedOpening";
import { PausedClosing } from "./PausedClosing";

export class Closing implements DoorState {
	constructor(private door: Door) {}
	processEvents(events: string): string {
		const eventsToProcess = events.split('');
		const closed = '0';
		let index = 1;
		const firstClosingPosition = '4';
		let eventsProcessed = firstClosingPosition;
		while (eventsToProcess[index] === '.' && index < eventsToProcess.length && !eventsProcessed.includes(closed)) {
      const nextClosingPosition = (4 - index).toString();
      eventsProcessed += nextClosingPosition;
			index++;
		}

		const buttonPressed = 'P';
		if (eventsToProcess.includes(buttonPressed) && index < eventsToProcess.length && !eventsProcessed.includes(closed)) {
			this.door.changeState(new PausedClosing(this.door));
			const restOfEvents = events.substring(index);
			const lastEvent = eventsProcessed.split('')[eventsProcessed.length - 1];
			return eventsProcessed + this.door.processEvents(lastEvent + restOfEvents.substring(1));
		}

		if (eventsProcessed.includes(closed) && index < eventsToProcess.length) {
			this.door.changeState(new Open(this.door));
			const restOfEvents = events.substring(index);
			return eventsProcessed + this.door.processEvents(restOfEvents);
		}
		return eventsProcessed;
	}
}
