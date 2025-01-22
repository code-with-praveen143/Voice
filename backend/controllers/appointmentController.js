const Appointment = require("../models/appointmentModel");

// Create an appointment using Calendly API
const createAppointment = async (req, res) => {
  const { calendlyEventType, inviteeEmail, inviteeName, startTime, endTime } = req.body;

  try {
    // Fetch Calendly API to create a scheduled event
    const response = await fetch("https://api.calendly.com/scheduled_events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CALENDLY_API_KEY}`, // Your Calendly API Key
      },
      body: JSON.stringify({
        event_type: calendlyEventType,
        start_time: startTime,
        end_time: endTime,
        location: { type: "google_meet" },
        invitees: [{ email: inviteeEmail, name: inviteeName }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    // Save the appointment to MongoDB
    const appointment = new Appointment({
      calendlyEventType,
      inviteeEmail,
      inviteeName,
      startTime,
      endTime,
      location: "Google Meet",
      calendlyEventUri: data.resource.uri, // Store the created event's URI
    });

    await appointment.save();

    res.status(201).json({ message: "Appointment created successfully", appointment });
  } catch (error) {
    res.status(500).json({ error: "Failed to create appointment", details: error.message });
  }
};

module.exports = {
  createAppointment,
};
