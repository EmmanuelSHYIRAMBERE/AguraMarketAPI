import express from "express";
import {
  addNewProduct,
  deleteProduct,
  getAllProducts,
  getUserProducts,
} from "../controllers/Product";
import productImagesUpload from "../middleware/productMulter";
import { verifyToken } from "../middleware";

const productsRouter = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     products:
 *       type: object
 *       required:
 *         - title
 *         - images
 *         - price
 *         - categoryId
 *         - location
 *         - description
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the product
 *           example: "Red jacket"
 *         images:
 *           type: array
 *           items:
 *             type: string
 *             format: binary
 *           description: The product images (file upload)
 *           example: ["url:jacket.jpg", "thumbNailUrl"]
 *         price:
 *           type: string
 *           description: The price of the product
 *           example: "100"
 *         categoryId:
 *           type: string
 *           description: The category id of the product
 *           example: "5"
 *         location:
 *           type: string
 *           description: The user latitude and longitude
 *           example: "-1.9706° S,30.0474° E"
 *         description:
 *           type: string
 *           description: The product description
 *           example: "This is a good product you can afford easily."
 *       example:
 *         title: "Red jacket"
 *         images: ["url:jacket.jpg", "thumbNailUrl"]
 *         price: "100"
 *         categoryId: "5"
 *         location: "-1.9706° S,30.0474° E"
 *         description: "This is a good product you can afford easily."
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The products managing API
 */

/**
 * @swagger
 * /AguraMarket/products/addNewProduct:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *            multipart/form-data:
 *               schema:
 *                   $ref: '#/components/schemas/products'
 *
 *     responses:
 *       201:
 *          description: The product created successfully
 *          content:
 *             multipart/form-data:
 *               schema:
 *                   $ref: '#/components/schemas/products'
 *       500:
 *          description: Internal Server Error
 */

productsRouter.post(
  "/addNewProduct",
  verifyToken,
  productImagesUpload,
  addNewProduct
);

/**
 * @swagger
 *  /AguraMarket/products/getAllProducts:
 *   get:
 *     summary: Returns the list of all products
 *     tags: [Products]
 *     responses:
 *       200:
 *          description: The products found successfully
 *          content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/products'
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

productsRouter.get("/getAllProducts", getAllProducts);

/**
 * @swagger
 *  /AguraMarket/products/getUserProducts:
 *   get:
 *     summary: Returns the list of all products of a user
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *          description: The products found successfully
 *          content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/products'
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

productsRouter.get("/getUserProducts", verifyToken, getUserProducts);
/**
 * @swagger
 *  /AguraMarket/products/deleteProduct/{id}:
 *   delete:
 *     summary: Delete product
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The product id
 *     responses:
 *       200:
 *          description: The products deleted successfully
 *          content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/products'
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

productsRouter.delete("/deleteProduct/:id", verifyToken, deleteProduct);

export default productsRouter;
