import axios, {AxiosResponse} from "axios";
import {config} from "../config";
import {Service} from "typedi";
import {GetPicturesResponse} from "../UrlsController/GetPicturesResponse";
import {GetPicturesRequest} from "../UrlsController/GetPicturesRequest";
import {DateTime} from "luxon";
import IUrlsCollectorService from "./IUrlsCollectorService";

@Service()
export class PicturesCollectorService implements IUrlsCollectorService{
	private sourceBaseUrl: string = config.urlsSource;
	private sourceApiKey: string = config.apiKey;
	private maxConcurrentRequests: number = config.concurrentRequests;
	getUrlsFromSource = async (request: GetPicturesRequest): Promise<GetPicturesResponse> => {
		let collectedUrls: GetPicturesResponse = new GetPicturesResponse();
		const requestsCollection = this.prepareRequestCollection(request.from, request.to);

		try {
			for (let i = 0; i < requestsCollection.length; i += this.maxConcurrentRequests) {
				console.log("Running chunk" + i + "to" + (i + this.maxConcurrentRequests - 1));
				const chunk = requestsCollection.slice(i, i + this.maxConcurrentRequests);
				const urls = await this.getChunkData(chunk);
				collectedUrls.urls = collectedUrls.urls.concat(urls);
			}
		} catch (error: any) {
			throw new Error(error);
		}

		return collectedUrls;
	}

	private prepareRequestCollection = (from: DateTime, to: DateTime): Promise<AxiosResponse<any, any>>[] => {
		let requestsCollection: Promise<AxiosResponse<any, any>>[] = [];

		for (let currentDate = from; currentDate <= to; currentDate = currentDate.plus({day: 1})) {
			const request = axios.get(this.sourceBaseUrl, {
				params: {
					api_key: this.sourceApiKey,
					date: currentDate.toISODate()
				}
			});

			requestsCollection = [...requestsCollection, request];
		}

		return requestsCollection;
	}

	private getChunkData = async (chunks: Promise<AxiosResponse<any, any>>[]): Promise<string[]> => {
		const responses = await Promise.all(chunks);

		return responses.map(res => res.data.url);
	}
}