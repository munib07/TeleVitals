const logger = require("../libs/logger");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");
const vitalModel = require("../models/vitalModel");
const { inferAIVitalsSvc } = require("../services/vitalSvc");

const insertByEmailVitals = async (req, res) => {
    try {
        const exisitingUser = await userModel.findOne({ email: req.body.patientEmail });
        if (!exisitingUser) {
            return res.status(400).send({
                success: false,
                message: "Patient Email is invalid",
            });
        } else if (exisitingUser.isDoctor) {
            return res.status(400).send({
                success: false,
                message: "Doctor can't insert vitals",
            });
        }

        const vital = new vitalModel(req.body);
        await vital.save();
        res.status(201).send({
            success: true,
            message: "Vital Inserted",
            data: vital,
        });
    } catch (error) {
        logger.error(error);
        res.status(500).send({
            success: false,
            message: "Error in Inserting Vitals",
            error,
        });
    }
}

const readByEmailVitals = async (req, res) => {
    try {
        const exisitingUser = await userModel.findOne
            ({ email: req.body.patientEmail });
        if (!exisitingUser) {
            return res.status(400).send({
                success: false,
                message: "Patient Email is invalid",
            });
        }else if (exisitingUser.isDoctor) {
            return res.status(400).send({
                success: false,
                message: "Doctor can't read vitals for himself",
            });
        }
        const vitals = await vitalModel.find({ patientEmail: req.body.patientEmail });
        res.status(200).send({
            success: true,
            message: "Vitals Read",
            data: vitals,
        });
    }
    catch (error) {
        logger.error(error);
        res.status(500).send({
            success: false,
            message: "Error in Reading Vitals",
            error,
        });
    }
}

const readByEmailVitalsAvg = async (req, res) => {
    try {
        const exisitingUser = await userModel.findOne
            ({ email: req.body.patientEmail });
        if (!exisitingUser) {
            return res.status(400).send({
                success: false,
                message: "Patient Email is invalid",
            });
        }else if (exisitingUser.isDoctor) {
            return res.status(400).send({
                success: false,
                message: "Doctor can't read vitals for himself",
            });
        }
        const vitals = await vitalModel.find({ patientEmail: req.body.patientEmail });
        const avg = {'heartBeat': 0, 'spo2': 0, 'sugarLevel': 0, 'bloodPressure': 0, 'temperature': 0, 'height': 0, 'weight': 0};
        for (const day of vitals) {
            avg.heartBeat += day.heartBeat;
            avg.spo2 += day.spo2;
            avg.sugarLevel += day.sugarLevel;
            avg.bloodPressure += day.bloodPressure;
            avg.temperature += day.temperature;
            avg.height += day.height;
            avg.weight += day.weight;
        }
        avg.heartBeat /= vitals.length;
        avg.spo2 /= vitals.length;
        avg.sugarLevel /= vitals.length;
        avg.bloodPressure /= vitals.length;
        avg.temperature /= vitals.length;
        avg.height /= vitals.length;
        avg.weight /= vitals.length;

        res.status(200).send({
            success: true,
            message: "Vitals Read",
            data: avg,
        });
    }
    catch (error) {
        logger.error(error);
        res.status(500).send({
            success: false,
            message: "Error in Reading Vitals",
            error,
        });
    }
}

const inferAIVitalsByEmail = async (req, res) => {
    try {
        const exisitingUser = await userModel.findOne
            ({ email: req.body.patientEmail });
        if (!exisitingUser) {
            return res.status(400).send({
                success: false,
                message: "Patient Email is invalid",
            });
        }else if (exisitingUser.isDoctor) {
            return res.status(400).send({
                success: false,
                message: "Doctor can't infer vitals for himself",
            });
        } 
        const vitals = await vitalModel
            .find({ patientEmail: req.body.patientEmail })
            .select("heartBeat spo2 sugarLevel bloodPressure temperature height weight createdAt");
        logger.info(vitals);
        const completion = await inferAIVitalsSvc(vitals);
        res.status(200).send({
            success: true,
            message: "Vitals Infered",
            data: completion,
        });
    }
    catch (error) {
        logger.error(error);
        res.status(500).send({
            success: false,
            message: "Error in Reading Vitals",
            error,
        });
    }
}


module.exports = {
    insertByEmailVitals,
    readByEmailVitals,
    inferAIVitalsByEmail,
    readByEmailVitalsAvg,
}
