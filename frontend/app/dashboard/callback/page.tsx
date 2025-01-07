'use client';
import { useRouter } from 'next/navigation';

export default function Integration() {
  const router = useRouter(); // Use Next.js navigation

  const handleOAuthRedirect = () => {
    const clientId = '1ZFWzFn2oRb1GEy01nEzsVW_ZKGnb39lp5unD89xt6M'; // Replace with your actual client_id
    const redirectUri = 'https://voice-seven-mocha.vercel.app/dashboard/callback'; // Redirect to your callback page
    const calendlyAuthUrl = `https://auth.calendly.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`;

    // Navigate directly to the Calendly OAuth URL
    window.location.href = calendlyAuthUrl;
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
    </div>
  );
}
