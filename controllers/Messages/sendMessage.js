import { catchAsyncError } from "../../utilities/catchSync.js";
import { Messages } from "../../model/messagesModel.js";

export const sendMessage = catchAsyncError(async (req, res, next) => {
  const message = await Messages.create({
    ...req.body,
  });

  return res.status(201).json({
    status: "A new message sent successfully",
    message,
  });
});
