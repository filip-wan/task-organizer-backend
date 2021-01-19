import { User } from '../db/models/User.js';
import { secured } from './secured.js';

const userRouter = (router) => {
  router.delete('/user', secured, async (req, res) => {
    await User.findByIdAndDelete(req.user.userData._id);
    req.logout();
    res.status(204).send();
  });

  router.put('/user', secured, async (req, res) => {
    const { name, email, facebook, github, google } = req.body;

    const editedUser = await User.findByIdAndUpdate(
      req.user.userData._id,
      { name, email, facebook, github, google },
      {
        new: true,
      }
    );

    res.send({
      name: editedUser?.name,
      email: editedUser?.email,
      createdAt: editedUser?.createdAt,
    });
  });
};

export default userRouter;
