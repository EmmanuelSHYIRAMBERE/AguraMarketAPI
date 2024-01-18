import { catchAsyncError } from "../../utilities";
import errorHandler from "../../utilities/errorHandlerClass";
import { Product } from "../../model";

export const deleteProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete({ _id: id });

  if (!product || product.length === 0) {
    return next(new errorHandler(`This product not registered`, 404));
  }
  res.status(200).json(product);
});
