
/*
	CASES:
	 - door is closed at the beginning
	 		"." -> "0"
	 - door will be closed while button is not pressed
	 		".." -> "00"
	 - when door is closed and button is pressed it will start to open
	 		".P" -> "01"
	 - door will be open after 5 seconds since button was pressed
	 		".P...." -> "012345"
	 - door will be open while button is not pressed
	 		".P....." -> "01234555"
	 - when door is open and button is pressed it will start to close
	 		".P.....P" -> "01234554"
	 - door will be closed after 5 seconds since button was pressed
	 		".P.....P...." -> "012345543210"
	 - when door is opening and button is pressed it will be paused
	 	 ".P.P." -> "0122"
	 - door will be paused during opening while button is not pressed
	 	 ".P.P....." -> "01222222"
	 - when door is paused during opening and button is pressed it will continue to open
	 	 ".P.P.....P" -> "01222223"
	 - when door is closing and button is pressed it will be paused
	 	 ".P.....P.P." -> "01234554322"
	 - door will be paused during closing while button is not pressed
	 	 ".P.....P.P....." -> "0123455432222"
	 - when door is paused during closing and button is pressed it will continue to close
	 			 	 ".P.....P.P.P" -> "01234554332"
	 - when door is opening and an obstacle is detected, it will be started to close
	 	 ".P..O." -> "01232"
	 - when door is closing and an obstacle is detected, it will be started to open
*/

import { Door } from "../core/door";

describe('door', () => {

	it('should start closed', function () {
		expect(new Door().processEvents(".")).toBe("0");
	});
});

