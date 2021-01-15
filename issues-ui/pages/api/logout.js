import { Magic } from '@magic-sdk/admin';
import Iron from '@hapi/iron';
import { removeTokenCookie, getTokenCookie } from '../../lib/cookie';

async function getLoginSession(req) {
  const token = getTokenCookie(req);
  if (!token) return;

  const session = await Iron.unseal(token, process.env.ENCRYPTION_SECRET, Iron.defaults);
  const expiresAt = session.createdAt + session.maxAge * 1000;
  // Validate the expiration date of the session
  if (Date.now() > expiresAt) {
    throw new Error('Session expired');
  }

  // eslint-disable-next-line consistent-return
  return session;
}

export default async function logout(req, res) {
  const magic = await new Magic(process.env.MAGIC_SECRET_KEY);
  const session = await getLoginSession(req);

  if (session) {
    await magic.users.logoutByIssuer(session.issuer);
    removeTokenCookie(res);
  }

  res.writeHead(302, { Location: '/' });
  res.end();
}
