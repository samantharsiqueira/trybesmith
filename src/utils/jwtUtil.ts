import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

type TokenPayLoad = {
  id: number,
  email: string,
};

function signToken(payload: TokenPayLoad): string {
  const token = jwt.sign(payload, secret);
  return token;
}

function verifyToken(token: string): TokenPayLoad {
  const payload = jwt.verify(token, secret) as TokenPayLoad;
  return payload;
}

export default {
  signToken,
  verifyToken,
};