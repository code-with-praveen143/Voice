const https = require('https');
const User = require('../models/userModel');
const Assistant = require('../models/assistantModel')
const { createAssistantAPI } = require('../utils/apiClient')

// Create Assistant API
const createAssistant = async (req, res) => {
  try {
    // Extract necessary fields from the request body
    const { firstMessage, modelProvider, modelName, content, knowledgeBaseUrl, endCallMessage,messages, name, toolIds } = req.body;

    const userId = req.user.id;  // Assume the user is authenticated via JWT

    // Check if user already has an assistant
    const user = await User.findById(userId);
    if (user.assistant) {
      return res.status(400).json({ error: 'You have already created an assistant' });
    }

    // Ensure message content is not too large
    if (content.length > 100000000) {
      return res.status(400).json({ error: 'Content is too large' });
    }

    // Call the API to create the assistant
    const response = await createAssistantAPI(firstMessage, modelProvider, modelName, messages, knowledgeBaseUrl, endCallMessage, name, toolIds);
    res.status(200).json({ message: 'Assistant created successfully', response });
  } catch (error) {
    console.error('Error creating assistant:', error);
    res.status(500).json({ error: 'Failed to create assistant' });
  }
};


// Get Assistant API
const getAssistant = async (req, res) => {
  try {
    // VAPI API endpoint to list assistants
    const options = {
      hostname: 'api.vapi.ai',
      path: '/assistant', // Endpoint for listing assistants
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.VAPI_TOKEN}`, // Your VAPI token
        'Content-Type': 'application/json',
      },
    };

    // Make the HTTPS request
    const vapiRequest = https.request(options, (vapiResponse) => {
      let responseData = '';

      // Collect data chunks
      vapiResponse.on('data', (chunk) => {
        responseData += chunk;
      });

      // Handle the complete response
      vapiResponse.on('end', () => {
        try {
          // Parse and send the response back to the client
          const vapiData = JSON.parse(responseData);
          if (vapiResponse.statusCode === 200) {
            res.status(200).json(vapiData);
          } else {
            console.error('VAPI API error:', vapiData);
            res.status(vapiResponse.statusCode).json({ error: vapiData });
          }
        } catch (err) {
          console.error('Error parsing VAPI response:', err);
          res.status(500).json({ error: 'Failed to parse VAPI response' });
        }
      });
    });

    // Handle request errors
    vapiRequest.on('error', (error) => {
      console.error('Error fetching assistants from VAPI:', error);
      res.status(500).json({ error: 'Failed to retrieve assistants from VAPI' });
    });

    // End the request
    vapiRequest.end();
  } catch (error) {
    console.error('Error in getAssistant API:', error);
    res.status(500).json({ error: 'Failed to retrieve assistants' });
  }
};



module.exports = { createAssistant, getAssistant };
