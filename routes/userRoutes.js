const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDocotrsController,
  bookeAppointmnetController,
  bookingAvailabilityController,
  userAppointmentsController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     tags: [User]
 *     summary: User Login
 *     description: User Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 default: "user2@user.com"
 *                 example: "user2@user.com"
 *               password:
 *                 type: string
 *                 default: "123456"
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: User Login
 *       500:
 *         description: Server Error
 */
router.post("/login", loginController);

// Generate Swagger Docs
/**
 * @swagger
 * /api/v1/user/register:
 *   post:
 *     tags: [User]
 *     summary: User Register
 *     description: User Register
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: User Login
 *       500:
 *         description: Server Error
 */
router.post("/register", registerController);

// Generate Swagger Docs
/**
 * @swagger
 * /api/v1/user/getUserData:
 *   post:
 *     tags: [User]
 *     summary: Get User Data
 *     description: Get User Data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Get User Data
 *       500:
 *         description: Server Error
 */
router.post("/getUserData", authMiddleware, authController);

// Generate Swagger Docs
/**
 * @swagger
 * /api/v1/user/apply-doctor:
 *   post:
 *     tags: [User]
 *     summary: Apply Doctor
 *     description: Apply Doctor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               qualification:
 *                 type: string
 *               speciality:
 *                 type: string
 *               experience:
 *                 type: string
 *               fee:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Apply Doctor
 *       500:
 *         description: Server Error
 */
router.post("/apply-doctor", authMiddleware, applyDoctorController);

// Generate Swagger Docs
/**
 * @swagger
 * /api/v1/user/get-all-notification:
 *   post:
 *     tags: [User]
 *     summary: Get All Notification
 *     description: Get All Notification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Get All Notification
 *       500:
 *         description: Server Error
 */
router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);

// Generate Swagger Docs
/**
 * @swagger
 * /api/v1/user/delete-all-notification:
 *   post:
 *     tags: [User]
 *     summary: Delete All Notification
 *     description: Delete All Notification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Delete All Notification
 *       500:
 *         description: Server Error
 */
router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);

// Generate Swagger Docs
/**
 * @swagger
 * /api/v1/user/getAllDoctors:
 *   get:
 *     tags: [User]
 *     summary: Get All Doctors
 *     description: Get All Doctors
 *     responses:
 *       200:
 *         description: Get All Doctors
 *       500:
 *         description: Server Error
 */
router.get("/getAllDoctors", authMiddleware, getAllDocotrsController);

// Generate Swagger Docs
/**
 * @swagger
 * /api/v1/user/book-appointment:
 *   post:
 *     tags: [User]
 *     summary: Book Appointment
 *     description: Book Appointment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               doctorEmail:
 *                 type: string
 *               date:
 *                 type: string
 *               time:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book Appointment
 *       500:
 *         description: Server Error
 */
router.post("/book-appointment", authMiddleware, bookeAppointmnetController);

// Generate Swagger Docs
/**
 * @swagger
 * /api/v1/user/booking-availbility:
 *   post:
 *     tags: [User]
 *     summary: Booking Availbility
 *     description: Booking Availbility
 *     responses:
 *       200:
 *         description: Booking Availbility
 *       500:
 *         description: Server Error
 */
router.post(
  "/booking-availbility",
  authMiddleware,
  bookingAvailabilityController
);

// Generate Swagger Docs
/**
 * @swagger
 * /api/v1/user/user-appointments:
 *   get:
 *     tags: [User]
 *     summary: User Appointments
 *     description: User Appointments
 *     responses:
 *       200:
 *         description: User Appointments
 *       500:
 *         description: Server Error
 */
router.get("/user-appointments", authMiddleware, userAppointmentsController);

module.exports = router;