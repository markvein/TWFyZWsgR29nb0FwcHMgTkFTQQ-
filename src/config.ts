import dotenv from "dotenv";

dotenv.config();

export const config = {
	port: process.env.PORT ?? 8080,
	apiKey: process.env.API_KEY ?? "DEMO_KEY",
	concurrentRequests: Number(process.env.CONCURRENT_REQUESTS) ?? 5,
	urlsSource: process.env.URLS_SOURCE ?? "https://api.nasa.gov/planetary/apod"
}