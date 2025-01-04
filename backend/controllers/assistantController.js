const Assistant = require('../models/assistantModel');

exports.createAssistant = async (req, res) => {
  const { user_id, name, firstMessage, messages, endCallMessage } = req.body;

  try {
    // Step 1: Store Assistant in Custom Database
    const newAssistant = new Assistant({
      user_id,
      name,
      firstMessage,
      model: {
        model: "gpt-3.5-turbo", // Default model
        messages: [{ role: "system", content: messages }], // System prompt
        provider: "openai", // Default provider
      },
      endCallMessage,
      recordingEnabled: true, // Enable by default
      clientMessages: ["transcript", "hang", "function-call", "speech-update", "metadata", "conversation-update"],
      serverMessages: ["end-of-call-report", "status-update", "hang", "function-call"],
      endCallPhrases: ["goodbye", "talk to you soon"],
      transcriber: { model: "nova-2", provider: "deepgram" },
    });

    const savedAssistant = await newAssistant.save();

    // Step 2: Send Request to Vapi API using Fetch
    const vapiResponse = await fetch('https://api.vapi.ai/assistant', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.VAPI_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (!vapiResponse.ok) {
      const errorData = await vapiResponse.json();
      throw new Error(`Vapi API Error: ${errorData.message || 'Unknown error'}`);
    }

    const vapiData = await vapiResponse.json();

    // Step 3: Update Database with Vapi Response
    savedAssistant.vapi_token = vapiData.token;
    await savedAssistant.save();

    // Step 4: Return Unified Response
    res.status(201).json({
      message: 'Assistant created successfully',
      assistant: savedAssistant,
      vapi_data: vapiData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
