import express from 'express';
import {
  createUser,
  // getUsers,
  getUserByUsername,
  // updateUser,
  // deleteUser,
} from '../../interfaces/controllers/users';

const router = express.Router();

router.post('/users', createUser);
// router.get('/users', getUsers);
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Users' });
// });
router.get('/:username', getUserByUsername);
// router.put('/:username', updateUser);
// router.delete('/:username', deleteUser);

export default router;
