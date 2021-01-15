import Iron from '@hapi/iron';
import { getAuthToken } from '../../lib/cookie';

export default async (req, res) => {
  let user;
  try {
    user = await Iron.unseal(
      getAuthToken(req.cookies),
      process.env.ENCRYPTION_SECRET,
      Iron.defaults,
    );
  } catch (error) {
    res.status(401).end();
  }
  user && res.send(user);
};
