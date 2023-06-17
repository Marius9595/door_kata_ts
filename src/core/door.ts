import { DoorState } from "./door_state/DoorState";
import { Closed } from "./door_state/Closed";



export class Door {
	private state: DoorState = new Closed(this);
	processEvents(events: string): string {
		return this.state.processEvents(events);
	}
	changeState(state: DoorState) {
		this.state = state;
	}
}
