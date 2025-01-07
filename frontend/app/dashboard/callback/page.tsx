'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function OAuthCallback() {
  const [error, setError] = useState<string>("");
  const searchParams = useSearchParams(); // Get query parameters
  const router = useRouter(); // Use `next/navigation` for navigation
  const [ code, setCode ] = useState<any>("")
  console.log("HI:",window.location.search)
  useEffect(() => {
    const handleOAuthCallback = async () => {
      const code = searchParams.get('code'); // Extract the `code` parameter from the URL
      setCode(code);
      if (!code) {
        setError('Authorization code not found in URL');
        return;
      }
  
      try {
        const response = await fetch('http://localhost:5000/api/auth/calendly', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to handle OAuth callback');
        }
  
        const data = await response.json();
  
        if (data.success) {
          // Navigate to the dashboard/calendly page on success
          router.push('/dashboard/calendly');
        } else {
          throw new Error(data.message || 'Unknown error occurred');
        }
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      }
    };
  
    handleOAuthCallback();
  }, [searchParams, router]);
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Processing OAuth Callback</h1>
      <p>GET: {code}</p>
      {error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <p className="text-blue-600">Redirecting...</p>
      )}
    </div>
  );
}
