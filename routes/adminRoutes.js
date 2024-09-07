const express = require("express");
const {
  getAllUsersController,
  getAllDoctorsController,
  changeAccountStatusController,
} = require("../controllers/adminCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//GET METHOD || USERS
// Generate Swagger Docs
/**
 * @swagger
 * /api/v1/admin/getAllUsers:
 *   get:
 *     tags: [Admin]
 *     summary: Get All Users
 *     description: Get All Users
 *     responses:
 *       200:
 *         description: Get All Users
 *       500:
 *         description: Server Error
 */
router.get("/getAllUsers", authMiddleware, getAllUsersController);

//GET METHOD || DOCTORS
// Generate Swagger Docs
/**
 * @swagger
 * /api/v1/admin/getAllDoctors:
 *   get:
 *     tags: [Admin]
 *     summary: Get All Doctors
 *     description: Get All Doctors
 *     responses:
 *       200:
 *         description: Get All Doctors
 *       500:
 *         description: Server Error
 */
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

//POST ACCOUNT STATUS
// Generate Swagger Docs
/**
 * @swagger
 * /api/v1/admin/changeAccountStatus:
 *   post:
 *     tags: [Admin]
 *     summary: Change Account Status
 *     description: Change Account Status
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Change Account Status
 *       500:
 *         description: Server Error
 */
router.post(
  "/changeAccountStatus",
  authMiddleware,
  changeAccountStatusController
);

module.exports = router;