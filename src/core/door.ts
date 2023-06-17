export class Door {
	processEvents(events: string): string {
		return events
			.split('')
			.map((event) => {
				if (event === 'P') {
					return '1';
				}
				return '0';
			})
			.join('');
	}
}
