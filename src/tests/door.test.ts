
/*
	CASES:
	 - door is closed at the beginning
	 - door will star open when the button is pressed
	 - door needs 5 seconds to open
	 - door stays open after 5 seconds
	 - door will close when the button is pressed again
	 - door needs 5 seconds to close
	 - door stays closed after 5 seconds
	 - door will be paused when button is pressed during opening
	 - door will be paused when button is pressed during closing
	 - door will continue when button is pressed again
	 - door will change his direction when detecting an obstacle
*/

import { Door } from "../core/door";

describe('door', () => {
	it('should start closed', function () {
		expect(new Door().processEvents(".")).toBe("0");
	});
});
