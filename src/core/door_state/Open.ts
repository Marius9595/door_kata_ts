import { DoorState } from "./DoorState";
import { Door } from "../door";

export class Open implements DoorState{

  constructor(private door: Door) {}
  processEvents(events: string): string {
    return "5";
  }

}
