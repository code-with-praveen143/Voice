'use client';
import { useEffect, useState } from 'react';

export default function Integration() {
  const [authCode, setAuthCode] = useState('');
  const [backendResponse, setBackendResponse] = useState(null);

  const handleOAuthRedirect = () => {
    const clientId = '1ZFWzFn2oRb1GEy01nEzsVW_ZKGnb39lp5unD89xt6M';
    const redirectUri = 'https://voice-seven-mocha.vercel.app'; // Redirect URI
    const calendlyAuthUrl = `https://calendly.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`;

    // Open the OAuth URL in a new tab
    window.open(calendlyAuthUrl, '_blank', 'noopener,noreferrer');
  };

  const handleAuthCodeInput = (event:any) => {
    setAuthCode(event.target.value);
  };

  const handleSubmitAuthCode = () => {
    if (!authCode) return;

    // Send the code to the backend
    fetch('http://localhost:5000/api/auth/calendly', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: authCode }),
    })
      .then((response) => response.json())
      .then((data) => {
        setBackendResponse(data);
        console.log('Backend Response:', data);
      })
      .catch((error) => console.error('Error sending code to backend:', error));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0A0A0A] bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:32px_32px]">
      <h1 className="text-2xl font-bold mb-4">Calendly Integration</h1>
      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        onClick={handleOAuthRedirect}
      >
        Connect Calendly
      </button>
      <div className="mt-6">
        <input
          type="text"
          className="border rounded-lg px-4 py-2 w-64 mt-4"
          placeholder="Enter Authorization Code"
          value={authCode}
          onChange={handleAuthCodeInput}
        />
        <button
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition mt-4"
          onClick={handleSubmitAuthCode}
        >
          Submit Auth Code
        </button>
      </div>
      {backendResponse && (
        <div className="mt-6">
          <p className="text-gray-700 mt-4">
            Backend Response: {JSON.stringify(backendResponse)}
          </p>
        </div>
      )}
    </div>
  );
}
