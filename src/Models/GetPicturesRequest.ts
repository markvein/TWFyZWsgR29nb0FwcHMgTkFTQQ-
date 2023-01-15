import {DateTime} from "luxon";

export class GetPicturesRequest {
	from: DateTime;
	to: DateTime;

	constructor(from: string, to: string) {
		this.from = DateTime.fromISO(from);
		this.to = DateTime.fromISO(to);
	}
}