import { GetPicturesRequest } from "../models/GetPicturesRequest";
import { GetPicturesResponse } from "../models/GetPicturesResponse";

export default interface IUrlsCollectorService {
    getUrlsFromSource(request: GetPicturesRequest): Promise<GetPicturesResponse>;
}
