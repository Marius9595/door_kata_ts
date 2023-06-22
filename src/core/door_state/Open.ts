import { DoorState } from "./DoorState";
import { Door } from "../door";
import { Closing } from "./Closing";

export class Open implements DoorState {
	constructor(private door: Door) {}
	processEvents(events: string): string {
		let first = 0;
		let eventsProcessed = '';
		const eventsToProcess = events.split('');

		if(eventsToProcess[first] === '.') {
			const open = '5';
			eventsProcessed += open;
			return eventsProcessed + this.door.processEvents(events.substring(first + 1));
		}

		const isButtonPressedEvent = eventsToProcess[first] === 'P';
		if (isButtonPressedEvent) {
			this.door.changeState(new Closing(this.door));
			const restOfEvents = events.substring(first);
			return eventsProcessed + this.door.processEvents(restOfEvents);
		}

		return eventsProcessed;
	}
}
