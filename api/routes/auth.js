const router = require("express").Router();
const passport = require("passport");

const AuthController = require("../controllers/auth");

/**
 * @swagger
 * definitions:
 *  User:
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
 *      password: 
 *        type: string
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

router.post("/resend-verify-email", AuthController.resendVerifyEmail);
router.get("/verify-email/:userId/:verifyCode", AuthController.verifyEmail);

router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  AuthController.me
);

module.exports = router;
