const express = require("express");
const {
  insertByEmailVitals, readByEmailVitals, inferAIVitalsByEmail, readByEmailVitalsAvg
} = require("../controllers/vitalCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

//insert vitals
// Generate Swagger Docs
/**
 * @swagger
 * /api/v1/vital/insertByEmail:
 *   post:
 *     tags: [Vital]
 *     summary: Insert Vitals by Email
 *     description: Insert Vitals by Patient Email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               heartBeat:
 *                 type: number
 *               spo2:
 *                 type: number
 *               sugarLevel:
 *                 type: number
 *               bloodPressure:
 *                 type: number
 *               temperature:
 *                 type: number
 *               weight:
 *                 type: number
 *               height:
 *                 type: number
 *               patientEmail:
 *                 type: string
 *               doctorEmail:
 *                 type: string
 *               status:
 *                 type: string
 *               report:
 *                 type: string
 *               prescription:
 *                 type: string
 *     responses:
 *       201:
 *         description: Vitals Inserted
 *       500:
 *         description: Server Error
 */
router.post("/insertByEmail", authMiddleware, insertByEmailVitals);

// Generate Swagger Docs
/**
 * @swagger
 * /api/v1/vital/readByEmail:
 *   post:
 *     tags: [Vital]
 *     summary: Read Vitals by Email
 *     description: Read Vitals by Patient Email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientEmail:
 *                 type: string
 *     responses:
 *       200:
 *         description: Vitals Read
 *       500:
 *         description: Server Error
 */
router.post("/readByEmail", authMiddleware, readByEmailVitals);

// Generate Swagger Docs
/**
 * @swagger
 * /api/v1/vital/inferAIVitalsByEmail:
 *   post:
 *     tags: [Vital]
 *     summary: Infer AI Vitals by Email
 *     description: Infer AI Vitals by Patient Email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientEmail:

 *                 type: string
 *                 default: "user2@user.com"
 *                 example: "user2@user.com"
 *     responses:
 *       200:
 *         description: Vitals Infered
 *       500:
 *         description: Server Error
 */
router.post("/inferAIVitalsByEmail", authMiddleware, inferAIVitalsByEmail);
module.exports = router; 

// Generate Swagger Docs
/**
 * @swagger
 * /api/v1/vital/readByEmailAvg:
 *   post:
 *     tags: [Vital]
 *     summary: Read Vitals by Email Avg
 *     description: Read Vitals by Patient Email Avg
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientEmail:
 *                 type: string
 *     responses:
 *       200:
 *         description: Vitals Read
 *       500:
 *         description: Server Error
 */
router.post("/readByEmailAvg", authMiddleware, readByEmailVitalsAvg);
