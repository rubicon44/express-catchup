import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  try {
    const { firebase_id, bio, email, nickname, username } = req.body;
    const user = await prisma.user.create({
      data: {
        firebase_id,
        bio,
        email,
        nickname,
        username,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'ユーザーの作成に失敗しました。' });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    if (users.length === 0) {
      res.status(404).json({ error: 'ユーザーが見つかりません。' });
    } else {
      res.json(users);
    }
  } catch (error) {
    res.status(500).json({ error: 'ユーザー一覧の取得に失敗しました。', details: error });
  }
};  

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'ユーザーの詳細取得に失敗しました。' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const { firebase_id, bio, email, nickname, username } = req.body;
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        firebase_id,
        bio,
        email,
        nickname,
        username,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'ユーザーの更新に失敗しました。' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    res.json({ message: 'ユーザーを削除しました。' });
  } catch (error) {
    res.status(500).json({ error: 'ユーザーの削除に失敗しました。' });
  }
};
