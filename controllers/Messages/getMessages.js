import { catchAsyncError } from "../../utilities";
import errorHandler from "../../utilities/errorHandlerClass";
import { Messages, Product } from "../../model";

export const getMessages = catchAsyncError(async (req, res, next) => {
  const messages = await Messages.find();

  if (!messages || messages.length === 0) {
    return next(new errorHandler(`There's no any message registered`, 404));
  }

  res.status(200).json(messages);
});
