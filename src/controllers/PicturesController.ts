import {Request, Response} from "express";
import {Inject, Service} from "typedi";
import {GetPicturesRequest} from "../UrlsController/GetPicturesRequest";
import {PicturesCollectorService} from "../services/PicturesCollectorService";

@Service()
class PicturesController {
	constructor(@Inject() private readonly urlsCollectorService: PicturesCollectorService) {
	}	

	getNasaPictures = async (req: Request, res: Response) => {
		const getPicturesRequest = new GetPicturesRequest(req.query.from!.toString(), req.query.to!.toString())
		try {
			const getPicturesResponse = await this.urlsCollectorService.getUrlsFromSource(getPicturesRequest);
			res.send(getPicturesResponse);
		} catch (error: any) {
			console.error(error);
			res.status(400).send({error: error.response!.data.msg})
		}
	}
}

export default PicturesController;