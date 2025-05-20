import React, { useEffect, useState } from 'react';
import PageLoader from './PageLoader';
import UseUserData from '../../utils/hooks/UserData/UseUserData';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const [authChecking, setAuthChecking] = useState(true);

  const { getUserData } = UseUserData();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!authChecking && token) {
      getUserData();
    }
  }, [authChecking]);

  useEffect(() => {
    // Check if the URL has a 'token' query parameter (provided after Auth0 login redirect)
    const queryParams = new URLSearchParams(window.location.search);
    const tokenParam = queryParams.get('token');
    // Check local storage for a saved access token
    const storedToken = localStorage.getItem('accessToken');

    if (tokenParam) {
      // If a token is present in the URL, exchange it for access/refresh tokens
      (async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_MAIN_URL}/user/auth0/exchange-token/`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token: tokenParam }),
            }
          );
          if (!response.ok) {
            throw new Error('Token exchange failed');
          }
          const data = await response.json();
          // Store the obtained access and refresh tokens in localStorage
          localStorage.setItem('accessToken', data.access_token);
          localStorage.setItem('refreshToken', data.refresh_token);
          // Clean up the URL (remove the token query param) after successful exchange
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
          setAuthChecking(false);
        } catch (error) {
          console.error('Authentication error:', error);
          // On failure, redirect back to the Auth0 authorization URL to try again
          window.location.replace(
            `${process.env.REACT_APP_MAIN_URL}/user/auth0/authorize/`
          );
        }
      })();
    } else if (!storedToken) {
      // No token in storage and none in URL: user is not logged in, redirect to Auth0 login
      window.location.replace(
        `${process.env.REACT_APP_MAIN_URL}/user/auth0/authorize/`
      );
    } else {
      // Token exists in localStorage and no token param in URL, user is considered authenticated
      setAuthChecking(false);
    }
  }, []);

  if (authChecking) {
    // Render a loading indicator while the authentication status is being confirmed
    return <PageLoader />; // Replace with an actual loader/spinner if available
  }

  // If authChecking is false, the user is authenticated; render the protected content
  return <>{children}</>;
};

export default AuthWrapper;
