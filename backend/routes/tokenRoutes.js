// routes/calendlyRoutes.js
const express = require('express');
const router = express.Router();
const { handleOAuthCallback } = require('../controllers/tokenController');

// Redirect to Calendly OAuth Authorization URL
// router.get('/calendly', (req, res) => {
//   const calendlyAuthUrl = `https://calendly.com/oauth/authorize?client_id=1ZFWzFn2oRb1GEy01nEzsVW_ZKGnb39lp5unD89xt6M&response_type=code&redirect_uri=https://voice-seven-mocha.vercel.app`;

//   res.redirect(calendlyAuthUrl);
// });

router.get('/calendly', (req, res) => {
    const fullUrl = 'https://calendly.com/oauth/authorize?client_id=1ZFWzFn2oRb1GEy01nEzsVW_ZKGnb39lp5unD89xt6M&response_type=code&redirect_uri=https://voice-seven-mocha.vercel.app';
    console.log('Redirected URL:', fullUrl); // Log the full URL
  
    const { code } = req.query;
    if (!code) {
      return res.status(400).json({ error: 'Authorization code is missing' });
    }
  
    console.log('Authorization Code:', code);
  
    // Respond to the client or proceed with further handling
    res.status(200).json({ message: 'Authorization successful', url: fullUrl, code });
  });

// Callback to handle the authorization code
router.post('/calendly', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Authorization code is missing' });
  }

  // Call handleOAuthCallback with the code
  req.query.code = code; // Ensure the code is passed to the controller
  await handleOAuthCallback(req, res);
});

module.exports = router;
