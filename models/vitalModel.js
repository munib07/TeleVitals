const mongoose = require("mongoose");

const vitalSchema = new mongoose.Schema({
    heartBeat: {
        type: Number,
        required: [true, "heart beat is required"],
    },
    spo2: {
        type: Number,
        required: [true, "spo2 is required"],
    },
    sugarLevel: {
        type: Number,
        required: [true, "sugar level is required"],
    },
    bloodPressure: {
        type: Number,
        required: [true, "blood pressure is required"],
    },
    temperature: {
        type: Number,
        required: [true, "temperature is required"],
    },
    weight: {
        type: Number,
        //required: [true, "weight is required"],
    },
    height: {
        type: Number,
       // required: [true, "height is required"],
    },
    patientEmail: {
        type: String,
        required: [true, "patientEmail is required"],
    },
    doctorEmail: {
        type: String,
        required: [true, "doctorEmail is required"],
    },
    status: {
        type: String,
        default: "pending",
    },
    report: {
        type: String,
    },
    prescription: {
        type: String,
    },
}, { timestamps: true });

const vitalModel = mongoose.model("vitals", vitalSchema);

module.exports = vitalModel;