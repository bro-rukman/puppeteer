import PuppeteerController from "../controller/puppeteer_controller";
import BaseRouter from "./base_router";

class PuppeteerRoutes extends BaseRouter {
  public routes(): void {
    this.router.post("/create_picture", PuppeteerController.createPictureHtml);
  }
}
export default new PuppeteerRoutes().router;
