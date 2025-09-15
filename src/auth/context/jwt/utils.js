import axios from '../../../utils/axios';

import { STORAGE_KEY } from './constant';
import { paths } from '../../../routes/paths';

// ----------------------------------------------------------------------

export function jwtDecode(token) {
  try {
    if (!token) return null;

    const parts = token.split('.');
    if (parts.length < 2) {
      throw new Error('Invalid token!');
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(atob(base64));

    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

export function isValidToken(accessToken) {
  if (!accessToken) {
    return false;
  }

  try {
    const decoded = jwtDecode(accessToken);

    if (!decoded || typeof decoded.exp !== 'number') {
      return false;
    }

    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
  } catch (error) {
    console.error('Error during token validation:', error);
    return false;
  }
}

// ----------------------------------------------------------------------

export function tokenExpired(exp) {
  const currentTime = Date.now() / 1000; // Ensure we're comparing in seconds
  const timeLeft = exp - currentTime;

  if (timeLeft <= 0) {
    alert('Token expired!');
    localStorage.removeItem(STORAGE_KEY);
    window.location.href = paths.auth.jwt.signIn;
  } else {
    setTimeout(() => {
      alert('Token expired!');
      localStorage.removeItem(STORAGE_KEY);
      window.location.href = paths.auth.jwt.signIn;
    }, timeLeft * 1000); // Convert timeLeft back to milliseconds for setTimeout
  }
}

// ----------------------------------------------------------------------

export async function setSession(accessToken = localStorage.getItem(STORAGE_KEY)) {
  localStorage.setItem(STORAGE_KEY, accessToken);
  if (accessToken) {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } 
}