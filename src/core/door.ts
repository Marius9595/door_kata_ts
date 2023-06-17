interface DoorState {
	processEvents(events: string): string;
}

class Closed implements DoorState {
	constructor(private door: Door) {}
	processEvents(events: string): string {
		if (!events.includes('P')) {
			return events.replace('.', '0');
		}

		const indexOfButtonWasPressed = events.indexOf('P');
		const procceedEvents = events.slice(0, indexOfButtonWasPressed).replace('.', '0');
		const eventsToProcess = events.slice(indexOfButtonWasPressed);
		this.door.changeState(new Opening(this.door));

		return this.door.processEvents(procceedEvents + eventsToProcess);
	}
}

class Opening implements DoorState {
	constructor(private door: Door) {}

	processEvents(events: string): string {
		const indexOfButtonWasPressed = events.indexOf('P');
		const procceedEvents = events.slice(0, indexOfButtonWasPressed).replace('.', '0');
		const eventsToProcess = events.slice(indexOfButtonWasPressed);

		let eventsInProcessing = procceedEvents;
		if (!eventsToProcess.substring(1).includes('P')) {
			if (eventsToProcess.length > 5) {
				return (eventsInProcessing += '12345' + eventsToProcess.slice(5).replace('.', '5'));
			} else {
				for (let i = 0; i < eventsToProcess.length; i++) {
					eventsInProcessing += i + 1;
				}
				return eventsInProcessing;
			}
		}
		return ""
	}
}

export class Door {
	private state: DoorState = new Closed(this);
	processEvents(events: string): string {
		return this.state.processEvents(events);
	}
	changeState(state: DoorState) {
		this.state = state;
	}
}
