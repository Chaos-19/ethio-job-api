import { Request, Response } from 'express';
import { eq, sql } from 'drizzle-orm';
import bcrypt from 'bcrypt';

import { db } from '../config/db';
import { users } from '../schema/schema';
import { generateApiKey } from '../utils';

const addUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        status: 'error',
        message: 'Email is required',
      });
    }

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: 'User already exists',
      });
    } else {
      const newUser = await db
        .insert(users)
        .values({
          email,
          api_key: [],
          role: 'user',
          notify: false,
          notifyAbout: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning({
          id: users.id,
        });

      res.status(201).json({
        status: 201,
        message: 'user created successfully',
        data: newUser,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Something went wrong',
    });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const userList = await db.select().from(users);

    res.status(201).json({
      status: 201,
      message: 'Request successful',
      data: userList,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      message: error.message ?? 'Something went wrong',
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id, email } = req.params;

    const existingUser = await db
      .select()
      .from(users)
      .where(sql`id = ${id} OR "email" = ${email}`);

    if (existingUser.length < 0) {
      res.status(400).json({
        status: 'error',
        message: 'User not found',
      });
    } else {
      const deletedUser = await db.delete(users).where(eq(users.email, email));

      res.status(201).json({
        status: 201,
        message: 'Request successful',
        data: deletedUser,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      message: error.message ?? 'Something went wrong',
    });
  }
};

const generateUserAPiKey = async (req: Request, res: Response) => {
  try {
    const newApiKey = generateApiKey();
    const salt = await bcrypt.genSalt(10);
    const hashedApiKey = await bcrypt.hash(newApiKey, salt);

    const updatedUser = await db
      .update(users)
      .set({
        api_key: sql`array_append(${users.api_key}, ${hashedApiKey})`,
      })
      .where(eq(users.email, req.body.email))
      .returning({
        api_key: users.api_key,
      })
      .execute();

    if (updatedUser.length < 0) {
      res.status(400).json({
        status: 'error',
        message: 'User not found',
      });
    }

    res.status(201).json({
      status: 201,
      message: 'api key generated successful',
      data: updatedUser,
    });
  } catch (error: any) {
    console.log(error);

    res.status(500).json({
      status: 500,
      message: error.message ?? 'Something went wrong',
    });
  }
};

export { addUser, getUsers, deleteUser, generateUserAPiKey };
