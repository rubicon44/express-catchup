import express from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../../interfaces/controllers/users';

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Users' });
// });
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
