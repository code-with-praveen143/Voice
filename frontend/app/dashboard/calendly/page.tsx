'use client'
import { useEffect, useState } from 'react';

export default function Integration() {
  const [authCode, setAuthCode] = useState<string>("");
  const [backendResponse, setBackendResponse] = useState(null);

  const handleOAuthRedirect = () => {
    const calendlyAuthUrl = 'https://calendly.com/oauth/authorize?client_id=1ZFWzFn2oRb1GEy01nEzsVW_ZKGnb39lp5unD89xt6M&response_type=code&redirect_uri=https://voice-seven-mocha.vercel.app';
    window.location.href = calendlyAuthUrl; // Redirect to Calendly
  };

  useEffect(() => {
    // Extract the authorization code from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      setAuthCode(code); // Save the code in state

      // Send the code to the backend
      fetch('http://localhost:5000/api/auth/calendly', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then((response) => response.json())
        .then((data) => {
          setBackendResponse(data);
          console.log('Backend Response:', data); // Log the backend response
        })
        .catch((error) => console.error('Error sending code to backend:', error));
    }
  }, []); // Runs once when the page loads

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0A0A0A] bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:32px_32px]">
      <h1 className="text-2xl font-bold mb-4">Calendly Integration</h1>
      {!authCode && (
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          onClick={handleOAuthRedirect}
        >
          Connect Calendly
        </button>
      )}
      {authCode && (
        <div className="mt-6">
          <p className="text-green-600 font-semibold">
            Authorization Code Captured: {authCode}
          </p>
          {backendResponse && (
            <p className="text-gray-700 mt-4">
              Backend Response: {JSON.stringify(backendResponse)}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
