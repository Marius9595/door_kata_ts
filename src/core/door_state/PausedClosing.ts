import { DoorState } from "./DoorState";
import { Door } from "../door";

export class PausedClosing implements DoorState{

  constructor(private door: Door) {}
  processEvents(events: string): string {
    const lastEvent = events.split('')[0];
    if (events.length === 1) {
      return lastEvent;
    }
    return "22"
  }

}
