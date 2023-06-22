import { DoorState } from './DoorState';
import { Door } from '../door';
import { Open } from './Open';
import { PausedOpening } from './PausedOpening';
import { Closing } from "./Closing";
import { partChanged } from "npm-check-updates/build/src/lib/version-util";

export class Opening implements DoorState {
	constructor(private door: Door) {}
	processEvents(events: string): string {
		const eventsToProcess = events.split('');
		const open = '5';
		const closed = '0';

		let index = 1;
		let eventsProcessed;
		if (eventsToProcess[0] !== closed && eventsToProcess[0] !== 'P') {
			const currentOpeningPosition = eventsToProcess[0];
			eventsProcessed = (parseInt(currentOpeningPosition) + 1).toString();
			if(eventsToProcess.length>1){
				while (eventsToProcess[index] === '.' && index < eventsToProcess.length && !eventsProcessed.includes(open)) {
					const nextOpeningPosition = (parseInt(currentOpeningPosition)+index +1).toString();
					eventsProcessed += nextOpeningPosition;
					index++;
				}
			}
		} else {
			const firstOpeningPosition = '1';
			eventsProcessed = firstOpeningPosition;
			while (eventsToProcess[index] === '.' && index < eventsToProcess.length && !eventsProcessed.includes(open)) {
				const nextOpeningPosition = (index + 1).toString();
				eventsProcessed += nextOpeningPosition;
				index++;
			}
		}

		const obstacleDetected = 'O';
		if (eventsToProcess.includes(obstacleDetected) && index < eventsToProcess.length && !eventsProcessed.includes(open)) {
			this.door.changeState(new Closing(this.door));
			const restOfEvents = events.substring(index);
			const lastEvent = eventsProcessed.split('')[eventsProcessed.length - 1];
			return eventsProcessed + this.door.processEvents(lastEvent + restOfEvents.substring(1));
		}

		const buttonPressed = 'P';
		if (eventsToProcess.includes(buttonPressed) && index < eventsToProcess.length && !eventsProcessed.includes(open)) {
			this.door.changeState(new PausedOpening(this.door));
			const restOfEvents = events.substring(index);
			const lastEvent = eventsProcessed.split('')[eventsProcessed.length - 1];
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
