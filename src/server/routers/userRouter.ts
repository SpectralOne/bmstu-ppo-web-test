import express, { Router } from "express";

import {login, logout, getByUsername, createUser} from "../controllers/uiUserControllers.js";
import { auth } from "../controllers/CommonControllers";

const userRouter: Router = express.Router();

/**
 * Login into system
 * @route POST /user/login
 * @group user - Operations about user
 * @param {UserLoginInfo} loginInfo.body.required - user login info (login + password)
 * @operationId loginUser
 * @produces application/json
 * @consumes application/json
 * @returns {string} 200 - ok (token)
 * @returns {string} 404 - user not found
 * @returns {string} 405 - invalid input
 * @returns {string} 500 - Internal Server Error
 */
userRouter.post("/login", login);

/**
 * Logout from system
 * @route POST /user/logout
 * @group user - Operations about user
 * @operationId logoutUser
 * @produces text/plain
 * @returns {string} 200 - ok
 * @returns {string} 404 - user not found
 * @returns {string} 405 - invalid input
 * @returns {string} 500 - Internal Server Error
 * @security JWT
 */
userRouter.post("/logout", auth, logout);

/**
 * Get user by username
 * @route GET /user/{username}
 * @group user - Operations about user
 * @param {string} username.path.required - username of user to get
 * @operationId getUserByUsername
 * @produces text/plain
 * @consumes application/json
 * @returns {string} 200 - ok
 * @returns {string} 404 - user not found
 * @returns {string} 405 - invalid input
 * @returns {string} 500 - Internal Server Error
 */
userRouter.get("/:username", getByUsername);

/**
 * Update user (can be perfomed only by user himself)
 * @route PUT /user
 * @group user - Operations about user
 * @param {UserWithPass} user.body.required - user info to update
 * @operationId updateUser
 * @produces text/plain
 * @consumes application/json
 * @returns {string} 200 - ok
 * @returns {string} 403 - no enough rights
 * @returns {string} 405 - invalid input
 * @returns {string} 500 - Internal Server Error
 * @security JWT
 */
// userRouter.put("/", auth, updateUser);

/**
 * Create new user
 * @route POST /user
 * @group user - Operations about user
 * @param {UserWithPass} user.body.required - user info
 * @operationId createUser
 * @produces application/json
 * @consumes application/json
 * @returns {string} 200 - ok (token)
 * @returns {string} 405 - invalid input
 * @returns {string} 500 - Internal Server Error
 */
userRouter.post("/", createUser);

/**
 * Update user password
 * @route PUT /user/password
 * @group user - Operations about user
 * @param {string} password.body.required - new password
 * @operationId updatePassword
 * @produces text/plain
 * @consumes text/plain
 * @returns {string} 200 - ok
 * @returns {string} 403 - Unauthorized
 * @returns {string} 405 - invalid input
 * @returns {string} 500 - Internal Server Error
 * @security JWT
 */
// userRouter.put("/password", auth, updateUserPassword);

export default userRouter;
