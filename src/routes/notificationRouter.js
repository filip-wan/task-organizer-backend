import { Notification } from '../db/models/Notification.js';
import { runNotification } from '../utils/cronNotifier.js';
import { secured } from './secured.js';
import { sendMail } from '../utils/mailing/index.js';

const notificationRouter = (router) => {
  router.get('/notifications', secured, async (req, res) => {
    const notifications = await Notification.find({ user: req.user.id });
    res.send(notifications);
  });

  router.delete('/notification/:id', secured, (req, res) => {
    Notification.findByIdAndDelete(req.params.id)
      .then(res.status(204).send())
      .catch(res.status(404).send('Notification not found'));
  });

  router.post('/sendMail', (req, res) => {
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

  router.post('/notification', secured, async (req, res) => {
    const { label, description, recurring, date, day, item } = req.body;
    const notification = new Notification({
      label,
      description,
      recurring,
      date,
      day,
      user: req.user.id,
      item,
      email: req.user.userData.email,
    });
    await notification.save();
    runNotification(notification);
    res.send(notification);
  });
};

export default notificationRouter;
