import axios, { AxiosInstance } from "axios";
// tslint:disable-next-line
const { ConcurrencyManager } = require("axios-concurrency");
import { config } from "../config";
import { Service } from "typedi";

@Service()
class NasaApiHelper {
    private _nasaApiInstance: AxiosInstance | undefined;
    get nasaApiInstance(): AxiosInstance {
        if (!this._nasaApiInstance) {
            this._nasaApiInstance = this.createNasaApiInstance();
        }
        return this._nasaApiInstance;
    }

    private createNasaApiInstance = (): AxiosInstance => {
        const nasaApi = axios.create({
            baseURL: config.urlsSource
        });

        const concurrencyManager = ConcurrencyManager(nasaApi, config.concurrentRequests);

        return nasaApi;
    };
}

export default NasaApiHelper;
