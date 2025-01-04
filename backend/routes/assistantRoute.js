// Import necessary modules
const express = require('express');
const router = express.Router();
const { createAssistant } = require('../controllers/assistantController');

/**
 * @swagger
 * /assistants:
 *   post:
 *     summary: Create a new assistant
 *     tags: [Assistants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: The ID of the user creating the assistant
 *               name:
 *                 type: string
 *                 description: Name of the assistant
 *               firstMessage:
 *                 type: string
 *                 description: Initial message from the assistant
 *               messages:
 *                 type: string
 *                 description: System prompt or predefined messages
 *               endCallMessage:
 *                 type: string
 *                 description: Message displayed at the end of a call
 *     responses:
 *       201:
 *         description: Assistant created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Assistant created successfully
 *                 assistant:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "12345"
 *                     name:
 *                       type: string
 *                       example: "Assistant Name"
 *                     firstMessage:
 *                       type: string
 *                       example: "Hello! How can I assist you?"
 */
router.post('/', createAssistant);

module.exports = router;
