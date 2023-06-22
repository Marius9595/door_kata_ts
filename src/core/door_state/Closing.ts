import { DoorState } from './DoorState';
import { Door } from '../door';
import { Open } from './Open';
import { PausedOpening } from "./PausedOpening";
import { PausedClosing } from "./PausedClosing";
import { Closed } from "./Closed";
import { Opening } from "./Opening";

export class Closing implements DoorState {
	constructor(private door: Door) {}
	processEvents(events: string): string {
		const eventsToProcess = events.split('');
		const open = '5';
		const closed = '0';

		let index = 1;
		let eventsProcessed;
		if (eventsToProcess[0] !== closed && eventsToProcess[0] !== 'P') {
			const currentOpeningPosition = eventsToProcess[0];
			eventsProcessed = (parseInt(currentOpeningPosition) - 1).toString();
		} else {
			const firstOpeningPosition = '4';
			eventsProcessed = firstOpeningPosition;
		}
		while (eventsToProcess[index] === '.' && index < eventsToProcess.length && !eventsProcessed.includes(open)) {
			const nextOpeningPosition = (4 - index).toString();
			eventsProcessed += nextOpeningPosition;
			index++;
		}

		const obstacleDetected = 'O';
		if (eventsToProcess.includes(obstacleDetected) && index < eventsToProcess.length && !eventsProcessed.includes(closed)) {
			this.door.changeState(new Opening(this.door));
			const restOfEvents = events.substring(index);
			const lastEvent = eventsProcessed.split('')[eventsProcessed.length - 1];
			return eventsProcessed + this.door.processEvents(lastEvent.toString() + restOfEvents.substring(1));
		}

		const buttonPressed = 'P';
		if (eventsToProcess.includes(buttonPressed) && index < eventsToProcess.length && !eventsProcessed.includes(closed)) {
			this.door.changeState(new PausedClosing(this.door));
			const restOfEvents = events.substring(index);
			const lastEvent = eventsProcessed.split('')[eventsProcessed.length - 1];
			return eventsProcessed + this.door.processEvents(lastEvent + restOfEvents.substring(1));
		}

		if (eventsProcessed.includes(closed) && index < eventsToProcess.length) {
			this.door.changeState(new Closed(this.door));
			const restOfEvents = events.substring(index);
			return eventsProcessed + this.door.processEvents(restOfEvents);
		}
		return eventsProcessed;
	}
}
