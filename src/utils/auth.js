import { CONFIG } from "src/config-global";

import axios from './axios';
import { paths } from "src/router/paths";

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
    return false;
  }
}

// ----------------------------------------------------------------------

export function tokenExpired(exp) {
  const currentTime = Date.now() / 1000; // Ensure we're comparing in seconds
  const timeLeft = exp - currentTime;

  if (timeLeft <= 0) {
    alert('Token expired!');
    localStorage.removeItem(CONFIG.storageKey);
    window.location.href = paths.auth.jwt.signIn;
  } else {
    setTimeout(() => {
      alert('Token expired!');
      localStorage.removeItem(CONFIG.storageKey);
      window.location.href = paths.auth.jwt.signIn;
    }, timeLeft * 1000); // Convert timeLeft back to milliseconds for setTimeout
  }
}

// ----------------------------------------------------------------------

export async function setSession(accessToken = localStorage.getItem(CONFIG.storageKey)) {
  localStorage.setItem(CONFIG.storageKey, accessToken);
  if (accessToken) {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } 
}
