import axios, { AxiosResponse } from "axios";
import { config } from "../config";
import { Inject, Service } from "typedi";
import { DateTime } from "luxon";
import IUrlsCollectorService from "./IUrlsCollectorService";
import { GetPicturesRequest } from "../models/GetPicturesRequest";
import { GetPicturesResponse } from "../models/GetPicturesResponse";
import NasaApiHelper from "../helpers/NasaApiHelper";

@Service()
export class PicturesCollectorService implements IUrlsCollectorService {
    private sourceBaseUrl: string = config.urlsSource;
    private sourceApiKey: string = config.apiKey;
    private maxConcurrentRequests: number = config.concurrentRequests;

    constructor(@Inject() private readonly nasaApiHelper: NasaApiHelper) {}

    getUrlsFromSource = async (request: GetPicturesRequest): Promise<GetPicturesResponse> => {
        const collectedUrls: GetPicturesResponse = new GetPicturesResponse();
        const requestsCollection = this.prepareRequestCollection(request.from!, request.to!);

        try {
            for (let i = 0; i < requestsCollection.length; i += this.maxConcurrentRequests) {
                const chunk = requestsCollection.slice(i, i + this.maxConcurrentRequests);
                const urls = await this.getChunkData(chunk);
                collectedUrls.urls = collectedUrls.urls.concat(urls);
            }
        } catch (error: any) {
            throw new Error(error);
        }

        return collectedUrls;
    };

    private prepareRequestCollection = (from: DateTime, to: DateTime): Promise<AxiosResponse<any, any>>[] => {
        let requestsCollection: Promise<AxiosResponse<any, any>>[] = [];

        for (let currentDate = from; currentDate <= to; currentDate = currentDate.plus({ day: 1 })) {
            const request = this.nasaApiHelper.nasaApiInstance.get(this.sourceBaseUrl, {
                params: {
                    api_key: this.sourceApiKey,
                    date: currentDate.toISODate()
                }
            });
            requestsCollection = [...requestsCollection, request];
        }

        return requestsCollection;
    };

    private getChunkData = async (chunks: Promise<AxiosResponse<any, any>>[]): Promise<string[]> => {
        const responses = await Promise.all(chunks);

        return responses.map((res) => res.data.url);
    };
}
