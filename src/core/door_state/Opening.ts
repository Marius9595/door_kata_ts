import { DoorState } from './DoorState';
import { Door } from '../door';

export class Opening implements DoorState {
	constructor(private door: Door) {}
	processEvents(events: string): string {
		return '1';
	}
}
