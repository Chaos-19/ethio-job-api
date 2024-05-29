import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { db } from '../config/db';
import { users } from '../schema/schema';
import { arrayContains, inArray } from 'drizzle-orm';

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

const validateApiRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const apiKey = req.headers['x-api-key'] as string;

  if (apiKey) {
    const existUserAppiKey = await db
      .select()
      .from(users)
      .where(arrayContains(users.api_key, [apiKey]))
      .execute();

    if (existUserAppiKey.length <= 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid API key',
      });
    }

    next();
  } else {
    return res.status(400).json({
      status: 'error',
      message: 'Missing API key',
    });
  }
};

export { validateApiRequest, validateRequest };
