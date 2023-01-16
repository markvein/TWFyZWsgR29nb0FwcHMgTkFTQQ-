import {GetPicturesRequest} from "../models/GetPicturesRequest";
import {ValidationError} from "./ValidationError";

export class GetPicturesRequestValidator {
	validate = (request: GetPicturesRequest) => {
		if (!request.from) {
			throw new ValidationError("From date should not be empty");
		}

		if (!request.to) {
			throw new ValidationError("To date should not be empty");
		}

		if (request.from > request.to) {
			throw new ValidationError("Specified From date is after To date");
		}
	}
}