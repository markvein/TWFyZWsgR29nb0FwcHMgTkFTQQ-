import "reflect-metadata";
import express from "express";
import {config} from "./src/config";
import Container from "typedi";

import PicturesController from "./src/controllers/PicturesController";

const server = async () => {

	const app = express();
	const router = express.Router();
	const urlsController = Container.get(PicturesController);

	router.get("/pictures", urlsController.getNasaPictures);

	app.use(router);

	app.listen(config.port, () => {
		console.log(`[SRV]: Server is running at http://localhost:${config.port}`);
	});
}

server().catch(error => console.error(error));
