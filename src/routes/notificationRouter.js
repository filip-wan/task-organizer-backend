import { Notification } from '../db/models/Notification.js';
import passport from 'passport';
import { secured } from './secured.js';
import { sendMail } from '../mailing/index.js';

const notificationRouter = (router) => {
  router.delete('/notification/:id', secured, (req, res) => {
    Notification.findByIdAndDelete(req.params.id)
      .then(res.status(204).send())
      .catch(res.status(404).send('Notification not found'));
  });

  router.post('/notification', (req, res) => {
    const { label, email, description } = req.body;
    sendMail({ label, email, description }, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send(error);
      } else {
        res.status(202).send(info.response);
      }
    });
    // const { name, createdAt } = User.findByIdAndUpdate(
    //   req.user.id,
    //   { name, email, facebook, github, google },
    //   {
    //     new: true,
    //   }
    // );
  });
};

export default notificationRouter;
