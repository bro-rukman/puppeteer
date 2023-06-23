import cors from "cors";
import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import compression from "compression";
import morgan from "morgan";
import helmet from "helmet";
import puppeteer_router from "./router/puppeteer_router";
require("dotenv").config();
class App {
  public app: Application;
  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
  }
  protected plugins(): void {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(morgan("dev"));
    this.app.use(compression());
    this.app.use(helmet());
  }
  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      res.send("This is default path");
    });
    this.app.use("/puppeteer", puppeteer_router);
  }
}
const port = process.env.SERVER_PORT;
const app = new App().app;

app.listen(port, () => {
  console.log("Port running in " + port);
});
