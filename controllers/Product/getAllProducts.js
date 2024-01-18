import { catchAsyncError } from "../../utilities";
import errorHandler from "../../utilities/errorHandlerClass";
import { Product } from "../../model";

export const getAllProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();

  if (!products || products.length === 0) {
    return next(new errorHandler(`There's no any product registered`, 404));
  }

  const formattedProducts = products.map((product) => ({
    id: product._id,
    title: product.title,
    images: product.images,
    price: product.price,
    categoryId: product.categoryId,
    userId: product.userId,
    location: product.location,
  }));

  res.status(200).json(formattedProducts);
});
