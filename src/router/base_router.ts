import { Router } from "express";
import IRoute from "./router_interface";

abstract class BaseRouter implements IRoute {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }
  abstract routes(): void;
}
export default BaseRouter;
