import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import { PicturesCollectorService } from "../services/PicturesCollectorService";
import { GetPicturesRequest } from "../models/GetPicturesRequest";
import { GetPicturesRequestValidator } from "../validators/GetPicturesRequestValidator";

@Service()
class PicturesController {
    constructor(@Inject() private readonly urlsCollectorService: PicturesCollectorService) {}

    getNasaPictures = async (req: Request, res: Response) => {
        const getPicturesRequest = new GetPicturesRequest(req.query.from?.toString(), req.query.to?.toString());

        try {
            new GetPicturesRequestValidator().validate(getPicturesRequest);
        } catch (error: any) {
            res.status(400).send({ error: error.message });
            return;
        }

        try {
            const getPicturesResponse = await this.urlsCollectorService.getUrlsFromSource(getPicturesRequest);
            res.send(getPicturesResponse);
        } catch (error: any) {
            res.status(400).send({ error: error.response?.data?.msg });
        }
    };
}

export default PicturesController;
