import { DoorState } from './DoorState';
import { Door } from '../door';
import { PausedClosing } from './PausedClosing';
import { Closed } from './Closed';
import { Opening } from './Opening';

export class Closing implements DoorState {
	constructor(private door: Door) {}
	processEvents(events: string): string {
		const eventsToProcess = events.split('');
		let index = 1;
		let eventsProcessed;
		if (eventsToProcess[0] !== '0' && eventsToProcess[0] !== 'P') {
			const currentOpeningPosition = eventsToProcess[0];
			eventsProcessed = (parseInt(currentOpeningPosition) - 1).toString();
		} else {
			const firstOpeningPosition = '4';
			eventsProcessed = firstOpeningPosition;
		}
		while (eventsToProcess[index] === '.' && index < eventsToProcess.length && !eventsProcessed.includes('5')) {
			const nextOpeningPosition = (4 - index).toString();
			eventsProcessed += nextOpeningPosition;
			index++;
		}

		if (index < eventsToProcess.length) {
			const obstacleDetectedEvent = eventsToProcess.includes('O');
			const isClosedEvent = eventsProcessed.includes('0');
			const restOfEvents = events.substring(index);
			const lastEvent = eventsProcessed.split('')[eventsProcessed.length - 1];
			if (obstacleDetectedEvent) {
				this.door.changeState(new Opening(this.door));
				return eventsProcessed + this.door.processEvents(lastEvent + restOfEvents.substring(1));
			}
			const buttonWasPressedEvent = eventsToProcess.includes('P');
			if (buttonWasPressedEvent) {
				this.door.changeState(new PausedClosing(this.door));
				return eventsProcessed + this.door.processEvents(lastEvent + restOfEvents.substring(1));
			}

			if (isClosedEvent) {
				this.door.changeState(new Closed(this.door));
				return eventsProcessed + this.door.processEvents(lastEvent + restOfEvents.substring(1));
			}
		}

		return eventsProcessed;
	}
}
