const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  calendlyEventType: { type: String, required: true },
  inviteeEmail: { type: String, required: true },
  inviteeName: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  location: { type: String, required: true },
  calendlyEventUri: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
