const PhoneNumber = require("../models/phonenumberModel");

exports.createPhoneNumber = async (req, res) => {
  const {
    provider,
    number,
    twilioAccountSid,
    twilioAuthToken,
    assistantId,
    name,
  } = req.body;

  try {
    const response = await fetch("https://api.vapi.ai/phone-number", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.VAPI_TOKEN}`, // Replace with your VAPI token
      },
      body: JSON.stringify({
        provider,
        number,
        twilioAccountSid,
        twilioAuthToken,
        assistantId,
        name
      }),
    });

    const data = await response.json();

    // Save the response data in the PhoneNumber model
    const phoneNumber = new PhoneNumber(data);
    await phoneNumber.save();

    res.status(200).json(phoneNumber);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.fetchPhoneNumbers = async (req, res) => {
  try {
    const response = await fetch("https://api.vapi.ai/phone-number", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${process.env.VAPI_TOKEN}`
      },
    });
    const data = await response.json();

    // Send the phone numbers back to the client
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching phone numbers from VAPI:", error.message);
    res.status(500).json({
      error: "Failed to fetch phone numbers from VAPI.",
      details: error.message,
    });
  }
};