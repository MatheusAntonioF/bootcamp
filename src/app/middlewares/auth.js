import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided ' });
  }

  // desestrutura um array e obtem a segunda posição
  // método split gera um array
  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    console.log(decoded);

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }

  return next();
};
