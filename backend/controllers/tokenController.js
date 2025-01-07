const Token = require('../models/tokenModel');

exports.handleOAuthCallback = async (req, res) => {
  try {
    const { code } = req.body;
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: 'XaXsebW8kQjLwwEk8xA9C0AHUP67HlwRHjGfPU56KAA',
      redirect_uri: 'https://voice-seven-mocha.vercel.app', // Your redirect URI
    });

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          '1ZFWzFn2oRb1GEy01nEzsVW_ZKGnb39lp5unD89xt6M:-1fYoyx5quyIXy0jeFQAyiOHEn1Psikos_jGTDIds8k'
        ).toString('base64')}`,
      },
      body,
    };

    // Fetch token from Calendly
    const response = await fetch('https://auth.calendly.com/oauth/token', options);
    const data = await response.json();

    if (!response.ok) {
      console.error('Error fetching token:', data);
      return res.status(response.status).json({ error: data });
    }

    const {
      access_token,
      refresh_token,
      token_type,
      expires_in,
      created_at,
      scope,
      owner,
      organization,
    } = data;

    // Save the tokens to the database
    await Token.findOneAndUpdate(
      { owner }, // Find by owner URL
      { access_token, refresh_token, token_type, expires_in, created_at, scope, organization }, // Update fields
      { upsert: true, new: true } // Insert if not found
    );

    return res.status(200).json({ message: 'Tokens saved successfully!', data });
  } catch (err) {
    console.error('Error handling OAuth callback:', err.message);
    res.status(500).json({ error: 'Failed to handle OAuth callback' });
  }
};
