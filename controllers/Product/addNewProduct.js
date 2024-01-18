import { catchAsyncError } from "../../utilities/catchSync.js";
import cloudinary from "../../utilities/cloudinary";
import { Product } from "../../model/productModel.js";

export const addNewProduct = catchAsyncError(async (req, res, next) => {
  const userID = req.user._id;

  const productImagesArray = [];

  if (req.files["images"]) {
    for (let index = 0; index < req.files["images"].length; index++) {
      const image = req.files["images"][index];
      const uploadedImage = await cloudinary.uploader.upload(image.path);
      const imageUrl = uploadedImage.secure_url;

      if (index === 0) {
        productImagesArray.push({ url: imageUrl });
      } else if (index === 1) {
        productImagesArray[0].thumbnailUrl = imageUrl;
      }
    }
  }

  req.body.userId = userID;

  const product = await Product.create({
    ...req.body,
    images: productImagesArray.length > 0 ? productImagesArray : null,
  });

  return res.status(201).json({
    status: "A new product added successfully",
    product: {
      id: product._id,
      title: product.title,
      images: productImagesArray,
      price: product.price,
      categoryId: product.categoryId,
      userId: product.userId,
      location: product.location,
    },
  });
});
