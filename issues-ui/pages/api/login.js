import { Magic } from '@magic-sdk/admin';
import Iron from '@hapi/iron';
import { setTokenCookie } from '../../lib/cookie';

export default async function login(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  // Exchange the did for user data
  const did = req.headers.authorization.split('Bearer').pop().trim();
  const user = await new Magic(process.env.MAGIC_SECRET_KEY).users.getMetadataByToken(did);

  // Set cookies to persist a user's session
  const token = await Iron.seal(user, process.env.ENCRYPTION_SECRET, Iron.defaults);
  setTokenCookie(res, token);

  return res.send(user);
}
