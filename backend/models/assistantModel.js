const mongoose = require('mongoose');

const assistantSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User reference
  name: { type: String, required: true }, // Assistant's name
  voice: {
    voiceId: { type: String },
    provider: { type: String },
  },
  model: {
    model: { type: String, required: true }, // Model type, e.g., "gpt-3.5-turbo"
    messages: [
      {
        role: { type: String, required: true }, // Role (e.g., "system", "user")
        content: { type: String, required: true }, // Message content
      },
    ],
    provider: { type: String, required: true }, // Provider for the model
  },
  firstMessage: { type: String, required: true }, // First message content
  voicemailMessage: { type: String }, // Voicemail message
  endCallMessage: { type: String, required: true }, // End call message
  transcriber: {
    model: { type: String },
    provider: { type: String },
  },
  clientMessages: [String], // Array of client message types
  serverMessages: [String], // Array of server message types
  endCallPhrases: [String], // Array of phrases to end the call
  recordingEnabled: { type: Boolean, default: false }, // Recording flag
  isServerUrlSecretSet: { type: Boolean, default: false }, // Server URL secret flag
  createdAt: { type: Date, default: Date.now }, // Timestamp for creation
  updatedAt: { type: Date, default: Date.now }, // Timestamp for updates
});

module.exports = mongoose.model('Assistant', assistantSchema);
