
/*
	CASES:
	 - door is closed at the beginning ✅
	 - door will star open when the button is pressed ✅
	 - door needs 5 seconds to open ✅
	 - door will close when the button is pressed again
	 - door needs 5 seconds to close
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

	it('should star open when the button is pressed', function () {
		expect(new Door().processEvents(".P")).toBe("01");
	});

	it('should start open when button was pressed', function () {
		expect(new Door().processEvents(".P...")).toBe("01234");
	});

	it('should be open after 5 seconds since button was pressed', function () {
		expect(new Door().processEvents(".P.....")).toBe("0123455");
	});

	it('should start close since button was pressed', function () {
		expect(new Door().processEvents(".P.....P...")).toBe("01234554321");
	});
});

