const express = require("express");
const {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByNameController,
  doctorAppointmentsController,
  updateStatusController,
} = require("../controllers/doctorCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

//POST SINGLE DOC INFO
// Generate Swagger Docs
/**
 * @swagger
 * /api/v1/doctor/getDoctorInfo:
 *   post:
 *     tags: [Doctor]
 *     summary: Get Doctor Info
 *     description: Get Doctor Info
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               doctorId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Get Doctor Info
 *       500:
 *         description: Server Error
 */
router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

//POST UPDATE PROFILE
// Generate Swagger Docs
/**
 * @swagger
 * /api/v1/doctor/updateProfile:
 *   post:
 *     tags: [Doctor]
 *     summary: Update Profile
 *     description: Update Profile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               speciality:
 *                 type: string
 *               experience:
 *                 type: string
 *               about:
 *                 type: string
 *     responses:
 *       200:
 *         description: Update Profile
 *       500:
 *         description: Server Error
 */
router.post("/updateProfile", authMiddleware, updateProfileController);

//POST SINGLE DOC INFO
// Generate Swagger Docs
/**
 * @swagger
 * /api/v1/doctor/getDoctorByName:
 *   post:
 *     tags: [Doctor]
 *     summary: Get Doctor By Name
 *     description: Get Doctor By Name
 *     parameters:
 *     - name: Authorization
 *       in: header
 *       required: true
 *       type: string
 *       description: Auth Token
 *       default: Bearer token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               doctorName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Get Doctor By Name
 *       500:
 *         description: Server Error
 */
router.post("/getDoctorByName", authMiddleware, getDoctorByNameController);

//GET Appointments
router.get(
  "/doctor-appointments",
  authMiddleware,
  doctorAppointmentsController
);

//POST Update Status
router.post("/update-status", authMiddleware, updateStatusController);

module.exports = router;