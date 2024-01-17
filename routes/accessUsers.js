import express from "express";
import { verifyToken, admin } from "../middleware";
const usersRouter = express.Router();

import {
  getSingleUser,
  getAllUser,
  updateUser,
  deleteUser,
} from "../controllers/Users";
import { signUp, logIn } from "../controllers/Authentication";
import productImagesUpload from "../middleware/productMulter";

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     signUp:
 *       type: object
 *       required:
 *         - email
 *         - fullNames
 *         - phoneNo
 *         - location
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user
 *         fullNames:
 *           type: string
 *           description: The fullNames of the user
 *         phoneNo:
 *           type: string
 *           description: The phoneNo of the user
 *         location:
 *           type: string
 *           description: The address of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       example:
 *         email: email@example.com
 *         fullNames: user names
 *         phoneNo: "+25070000000"
 *         location: myAddress
 *         password: myPassword1
 *     login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       example:
 *         email: email@example.com
 *         password: myPassword!
 *     userUpdate:
 *       type: object
 *       properties:
 *         fullNames:
 *           type: string
 *           description: The updated full names of the user
 *         profilePicture:
 *           type: string
 *           format: binary
 *           description: The updated profile picture file of the user (upload from local user files)
 *         phoneNo:
 *           type: string
 *           description: The updated phone number of the user
 *         location:
 *           type: string
 *           description: The updated address of the user
 *         expoPushToken:
 *           type: string
 *           description: The updated expoPushToken of the user
 *       example:
 *         fullNames: Updated User Names
 *         profilePicture: https://example.com/new-profile-picture.jpg
 *         phoneNo: "+25070000001"
 *         location: Updated Address
 *         expoPushToken: Updated expoPushToken
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The user authorization managing API
 */

/**
 * @swagger
 * /AguraMarket/users/getusers:
 *   get:
 *     summary: Returns the list of all the users for the sake of admin
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *          description: The list of the users found
 *          content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/userUpdate'
 *       403:
 *          description: The user not authorised
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

usersRouter.get("/getusers", verifyToken, admin, getAllUser);

/**
 * @swagger
 * /AguraMarket/users/getuser/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The user id
 *     responses:
 *       200:
 *          description: The user found by id
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/signUp'
 *       204:
 *          description: No any user in the database
 *       403:
 *          description: The user not authorised
 *       404:
 *          description: The user was not found
 *       500:
 *          description: Internal Server Error
 */

usersRouter.get("/getuser/:id", verifyToken, getSingleUser);

/**
 * @swagger
 * /AguraMarket/users/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [Authentication]
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/signUp'
 *     responses:
 *       201:
 *          description: The user was successfully created
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/signUp'
 *       500:
 *          description: Internal Server Error
 */

usersRouter.post("/signup", signUp);

/**
 * @swagger
 * /AguraMarket/users/login:
 *   post:
 *     summary: Log into user account
 *     tags: [Authentication]
 *     requestBody:
 *          required: true
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/login'
 *     responses:
 *       200:
 *          description: The user was successfully authorised
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/signUp'
 *       403:
 *          description: Wrong email or password
 *       500:
 *          description: Internal Server Error
 */

usersRouter.post("/login", logIn);

/**
 * @swagger
 * /AguraMarket/users/userupdate:
 *   put:
 *     summary: Update the user data
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *            multipart/form-data:
 *               schema:
 *                   $ref: '#/components/schemas/userUpdate'
 *
 *     responses:
 *       200:
 *          description: The user was modified successfully
 *          content:
 *             multipart/form-data:
 *               schema:
 *                   $ref: '#/components/schemas/userUpdate'
 *       204:
 *          description: No any user in the database
 *       401:
 *          description: The user not authorised
 *       404:
 *          description: The user was not found
 *       500:
 *          description: Internal Server Error
 */

usersRouter.put("/userupdate", verifyToken, productImagesUpload, updateUser);

/**
 * @swagger
 * /AguraMarket/users/userdelete/{id}:
 *   delete:
 *     summary: Delete the user data by id
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The user id
 *     responses:
 *       200:
 *          description: The user was deleted successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/signUp'
 *       204:
 *          description: No any user in the database
 *       401:
 *          description: The user not authorised
 *       404:
 *          description: The user was not found
 *       500:
 *          description: Internal Server Error
 */

usersRouter.delete("/userdelete/:id", verifyToken, deleteUser);

export default usersRouter;
