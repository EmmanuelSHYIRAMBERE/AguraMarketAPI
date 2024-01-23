import express from "express";

const packRouter = express.Router();

import {
  cashIn,
} from "../controllers/payment/paypack";
import { admin, verifyToken } from "../middleware";

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     makePayment:
 *       type: object
 *       required:
 *         - number
 *       properties:
 *         number:
 *           type: string
 *           description: The phone number of the user
 *       example:
 *         number: 07xxxxxxxx
 */

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: The Payment managing API
 */

/**
 * @swagger
 * /AguraMarket/momo/pay/{id}:
 *   post:
 *     summary: Make payment for purchasing product
 *     tags: [Payment]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/makePayment'
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The id of a product
 *     responses:
 *       200:
 *          description: The product paid successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/makePayment'
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

packRouter.post("/pay/:id", cashIn);

// packRouter.get("/withdraw", verifyToken, admin, cashOut);

// packRouter.get("/transactions", verifyToken, admin, acountTransactions);

// packRouter.get("/events", verifyToken, admin, accountEvents);

// packRouter.get("/account", verifyToken, admin, accountInfo);

// packRouter.post("/callback", callback);

export default packRouter;
