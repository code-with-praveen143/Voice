const express = require("express");
const { createAppointment } = require("../controllers/appointmentController");
const router = express.Router();

// Route to create an appointment
router.post("/appointments", createAppointment);

module.exports = router;
