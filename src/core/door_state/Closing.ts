import { DoorState } from './DoorState';
import { Door } from '../door';

export class Closing implements DoorState {
	constructor(private door: Door) {}
	processEvents(events: string): string {
		return '4';
	}
}
