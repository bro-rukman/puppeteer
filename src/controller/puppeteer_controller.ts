import { constants as STATUS_CODE } from "http2";
import { Request, Response } from "express";
import { html_to_image } from "../helpers/html_to_image";
import { decodeHTML } from "@rukmana/configs";
class PuppeteerController {
  constructor() {}
  createPictureHtml = async (req: Request, res: Response) => {
    const { _html, tag, isLoadOnDocker } = req.body;
    let decText = decodeHTML(_html);
    try {
      await html_to_image(decText, tag, isLoadOnDocker)
        .then((response) => {
          return res.status(STATUS_CODE.HTTP_STATUS_OK).send(response);
        })
        .catch((error) => {
          return res
            .status(STATUS_CODE.HTTP_STATUS_BAD_REQUEST)
            .send("Bad Request !");
        });
    } catch (error) {
      return res
        .status(STATUS_CODE.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send("Something error when creating image.");
    }
  };
}
export default new PuppeteerController();
