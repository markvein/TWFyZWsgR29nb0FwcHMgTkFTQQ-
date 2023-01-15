import {GetPicturesRequest} from "../UrlsController/GetPicturesRequest";
import {GetPicturesResponse} from "../UrlsController/GetPicturesResponse";

export default interface IUrlsCollectorService {
	getUrlsFromSource(request: GetPicturesRequest): Promise<GetPicturesResponse>;
}