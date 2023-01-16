import {describe, expect, test} from "@jest/globals";
import {GetPicturesRequest} from "../../../src/models/GetPicturesRequest";
import {ValidationError} from "../../../src/validators/ValidationError";
import {GetPicturesRequestValidator} from "../../../src/validators/GetPicturesRequestValidator";

// actor
const validator = new GetPicturesRequestValidator();

describe("GetPicturesRequestValidator should properly validate incoming requests before they gets processed", () => {

	test("WHEN from date is after to date THEN IT should throw validation error", () => {
		// arrange
		const fromDate = "2022-01-01";
		const toDate = "2020-01-01";
		const request = new GetPicturesRequest(fromDate, toDate);

		//act and assert
		expect(() => {
			validator.validate(request)
		}).toThrowError(new ValidationError("Specified From date is after To date"))
	});

	test("WHEN from date does not exists, THEN IT should throw validation error", () => {
		// arrange
		const toDate = "2020-01-01";
		const request = new GetPicturesRequest(undefined, toDate);

		// act and assert
		expect(() => {
			validator.validate(request)
		}).toThrowError(new ValidationError("From date should not be empty"))
	});

	test("WHEN to date does not exists, THEN IT should throw validation error", () => {
		// arrange
		const fromDate = "2020-01-01";
		const request = new GetPicturesRequest(fromDate, undefined);

		// act and assert
		expect(() => {
			validator.validate(request)
		}).toThrowError(new ValidationError("To date should not be empty"))
	});

	test("WHEN from date does not exists AND to date does not exists, THEN IT should throw validation error", () => {
		// arrange
		const request = new GetPicturesRequest(undefined, undefined);

		// act and assert
		expect(() => {
			validator.validate(request)
		}).toThrowError(ValidationError)
	})
})