import * as jwt from 'jsonwebtoken';
import { Secret } from 'jsonwebtoken';

type tokenPayload = {
  id: number;
  role: string;
};

export default class JWT {
  private static secret: Secret = process.env.JWT_SECRET || 'secret';

  static sign(payload: tokenPayload): string {
    const token = jwt.sign(payload, this.secret, { expiresIn: '1d' });
    return token;
  }

  static verify(token: string): tokenPayload {
    const data = jwt.verify(token, this.secret) as tokenPayload;
    return data;
  }
}
