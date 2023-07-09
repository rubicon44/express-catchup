import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

// Test Data
// const users = [
//   {
//     id: 1,
//     nickname: 'aaa',
//     username: 'aaa',
//     email: 'aaa@aaa.com',
//   },
//   {
//     id: 2,
//     nickname: 'bbb',
//     username: 'bbb',
//     email: 'bbb@bbb.com',
//   },
//   {
//     id: 3,
//     nickname: 'ccc',
//     username: 'ccc',
//     email: 'ccc@ccc.com',
//   },
// ];

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

// export const getUsers = async (req: Request, res: Response) => {
//   try {
//     // const users = await prisma.user.findMany();

//     if (users.length === 0) {
//       res.status(404).json({ error: 'ユーザーが見つかりません。' });
//     } else {
//       res.json(users);
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'ユーザー一覧の取得に失敗しました。', details: error });
//   }
// };

export const getUserByUsername = async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    // const user = users.find((user) => user.username === username);
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'ユーザーが見つかりません。' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'ユーザーの詳細取得に失敗しました。' });
  }
};

// export const updateUser = async (req: Request, res: Response) => {
//   try {
//     const userId = parseInt(req.params.id);
//     const { firebase_id, bio, email, nickname, username } = req.body;
//     const user = await prisma.user.update({
//       where: {
//         id: userId,
//       },
//       data: {
//         firebase_id,
//         bio,
//         email,
//         nickname,
//         username,
//       },
//     });
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: 'ユーザーの更新に失敗しました。' });
//   }
// };

// export const deleteUser = async (req: Request, res: Response) => {
//   try {
//     const userId = parseInt(req.params.id);
//     await prisma.user.delete({
//       where: {
//         id: userId,
//       },
//     });
//     res.json({ message: 'ユーザーを削除しました。' });
//   } catch (error) {
//     res.status(500).json({ error: 'ユーザーの削除に失敗しました。' });
//   }
// };
