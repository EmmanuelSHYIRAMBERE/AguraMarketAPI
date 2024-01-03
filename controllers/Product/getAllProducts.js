import { catchAsyncError } from "../../utilities";
import errorHandler from "../../utilities/errorHandlerClass";
import { Product } from "../../model";

export const getAllProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();

  if (!products || products.length === 0) {
    return next(new errorHandler(`You don't have any product registered`, 404));
  }

  const formattedProducts = products.map((product) => ({
    id: product._id,
    title: product.title,
    images: [
      {
        url: product.url,
        thumbnailUrl: product.thumbnailUrl,
      },
    ],
    price: product.price,
    categoryId: product.categoryId,
    userId: product.userId,
    location: {
      latitude: product.Latitude,
      longitude: product.Longitude,
    },
  }));

  res.status(200).json(formattedProducts);
});
