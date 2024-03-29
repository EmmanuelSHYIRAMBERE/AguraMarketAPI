import { User } from "../../model";
import cloudinary from "../../utilities/cloudinary";
import { catchAsyncError } from "../../utilities";
import errorHandler from "../../utilities/errorHandlerClass";

export const updateUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.user.email });

  if (!user) {
    return next(new errorHandler.NotFoundError("User not found"));
  }

  if (req.file) {
    const profilePicture = await cloudinary.uploader.upload(req.file.path);
    user.profilePicture = profilePicture.secure_url;
  }

  user.email = req.body.email || user.email;
  user.fullNames = req.body.fullNames || user.fullNames;
  user.profilePicture = req.body.profilePicture || user.profilePicture;
  user.phoneNo = req.body.phoneNo || user.phoneNo;
  user.location = req.body.location || user.location;
  user.expoPushToken = req.body.expoPushToken || user.expoPushToken;

  await user.save();

  const filteredUser = {
    _id: user._id,
    email: user.email,
    fullNames: user.fullNames,
    phoneNo: user.phoneNo,
    location: user.location,
    profilePicture: user.profilePicture,
    expoPushToken: user.expoPushToken,
    role: user.role,
  };

  res.status(200).json({
    message: "User updated successfully",
    user: filteredUser,
  });
});
