import { DateTime } from "luxon";

export class GetPicturesRequest {
    from?: DateTime;
    to?: DateTime;

    constructor(from?: string, to?: string) {
        this.from = from ? DateTime.fromISO(from) : undefined;
        this.to = to ? DateTime.fromISO(to) : undefined;
    }
}
