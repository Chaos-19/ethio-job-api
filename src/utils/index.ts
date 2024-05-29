import crypto from 'crypto';

export const generateApiKey = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};