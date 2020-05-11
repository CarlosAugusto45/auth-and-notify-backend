import { promisify } from 'util';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHedaers = req.headers.authorization;

  if (!authHedaers) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = await authHedaers.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token Invalid' });
  }
};
