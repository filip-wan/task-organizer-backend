import passport from 'passport';
import { User } from '../db/models/User.js';
import { secured } from './secured.js';

const userRouter = (router) => {
  router.delete('/user', secured, (req, res) => {
    User.findByIdAndDelete(req.user.id);
    res.status(204).send();
  });

  router.put('/user', secured, (req, res) => {
    const { name, email, facebook, github, google } = req.body;
    const { name, createdAt } = User.findByIdAndUpdate(
      req.user.id,
      { name, email, facebook, github, google },
      {
        new: true,
      }
    );
    res.send({
      name,
      email,
      createdAt,
    });
  });
};

export default userRouter;
