import { serialize, parse } from 'cookie';

const TOKEN_NAME = 'api_token';
const MAX_AGE = 60 * 60 * 8; /* 8 hours */

export function createCookie(name, data, options = {}) {
  return serialize(name, data, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    ...options,
  });
}

export function setTokenCookie(res, token) {
  res.setHeader('Set-Cookie', [
    createCookie(TOKEN_NAME, token),
    createCookie('authed', true, { httpOnly: false }),
  ]);
}

export function removeTokenCookie(res) {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
  });

  res.setHeader('Set-Cookie', cookie);
}

export function parseCookies(req) {
  if (req.cookies) return req.cookies;
  const cookie = req.headers && req.headers.cookie;
  return parse(cookie || '');
}

export function getAuthToken(cookies) {
  return cookies[TOKEN_NAME];
}

export function getTokenCookie(req) {
  const cookies = parseCookies(req);
  return cookies[TOKEN_NAME];
}
