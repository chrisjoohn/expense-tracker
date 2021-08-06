const router = require("express").Router();
const passport = require("passport");

const AuthController = require("../controllers/auth");

/**
 * @swagger
 * definitions:
 *  UserModel:
 *    required:
 *      - firstName
 *      - lastName
 *      - email
 *      - password
 *    properties:
 *      firstName:
 *        type: string
 *      lastName:
 *        type: string
 *      email:
 *        type: string
 *
 *  User:
 *    allOf:
 *      - $ref: "#/definitions/UserModel"
 *      - type: object
 *        properties:
 *          password:
 *            type: string
 *            required: true
 *
 *
 *  UserDetails:
 *    allOf:
 *      - $ref: "#/definitions/UserModel"
 *      - type: object
 *        properties:
 *          _id:
 *            type: string
 *          status:
 *            type: string
 *
 *    
 *
 *  Login:
 *    required:
 *      - email
 *      - password
 *
 *    properties:
 *      email:
 *        type: string
 *      password:
 *        type: string
 *
 *  LoginSuccess:
 *    properties:
 *      id:
 *        type: string
 *      token:
 *        type: string
 *
 */

/**
 * @swagger
 * /auth/register:
 *  post:
 *    description: Register a user
 *    tags:
 *      - Auth
 *
 *    parameters:
 *      - in: body
 *        properties:
 *        schema:
 *          type: object
 *          $ref: '#/definitions/User'
 *
 *    responses:
 *      200:
 *        description: Success
 */
router.post("/register", AuthController.register);

/**
 * @swagger
 * /auth/login:
 *  post:
 *    description: User login
 *    tags:
 *      - Auth
 *
 *    parameters:
 *      - in: body
 *        properties:
 *        schema:
 *          type: object
 *          $ref: '#/definitions/Login'
 *
 *    responses:
 *      200:
 *        description: Login success
 *        schema:
 *          type: object
 *          $ref: '#/definitions/LoginSuccess'
 *      401:
 *       description: Unauthorized
 */
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  AuthController.login
);

/**
 * @swagger
 * /auth/resend-verify-email:
 *  post:
 *    description: Resend Verification Email
 *    tags:
 *      - Auth
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        schema:
 *          type: object
 *          required:
 *            - email
 *          properties:
 *            email:
 *              type: string
 *    responses:
 *      200:
 *        description: Success!
 *
 */

router.post("/resend-verify-email", AuthController.resendVerifyEmail);

/**
 * @swagger
 * /auth/verify-email/{userId}/{verifyCode}:
 *  get:
 *    description: Verify user email
 *    tags:
 *      - Auth
 *    consumes:
 *      - application/json
 *
 *    responses:
 *      200:
 *        description:  Will redirect user to the React app where the user will be handled properly
 *      400:
 *        description: Bad request
*/
router.get("/verify-email/:userId/:verifyCode", AuthController.verifyEmail);


/**
 * @swagger
 * /auth/me:
 *  get:
 *    description: Get User details
 *    tags:
 *      - Auth
 *
 *    responses:
 *      200:
 *        description: User details
 *        schema:
 *          type: object
 *          $ref: '#/definitions/UserDetails'
 *
*/
router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  AuthController.me
);

module.exports = router;
