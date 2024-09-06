const logger = require("../libs/logger");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");
const vitalModel = require("../models/vitalModel");

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
            .select("heartBeat spo2 sugarLevel bloodPressure temperature");

            
        res.status(200).send({
            success: true,
            message: "Vitals Infered",
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

module.exports = {
    insertByEmailVitals,
    readByEmailVitals,
    inferAIVitalsByEmail,
}
