import express from "express";
import authenticate from "./aauthentication";
import errorHandler from "../utilities/errorHandlerClass";
import { globalErrorController } from "../controllers/Errors";
import productsRouter from "./product";
import usersRouter from "./accessUsers";
import packRouter from "./payPack";

const systemRouter = express.Router();

systemRouter.use("/password", authenticate);
systemRouter.use("/products", productsRouter);
systemRouter.use("/momo", packRouter);
systemRouter.use("/users", usersRouter);

systemRouter.all("*", (req, res, next) => {
  next(new errorHandler(`Failure connecting to the server!`, 404));
});

systemRouter.use(globalErrorController);

export default systemRouter;
