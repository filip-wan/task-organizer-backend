import { CronJob } from 'cron';
import { Notification } from '../db/models/Notification.js';

const cronJobs = {};
let count = 0;

const cronTask = (notification) => {
  console.log(
    'You will see this message every second',
    notification._id,
    // cronJobs[notification._id],
    count
  );
  count++;
  if (!notification.recurring || count > 10) cronJobs[notification._id]?.stop();
};

export const runNotifications = async () => {
  const notifications = await Notification.find();
  notifications.push({
    _id: 'test',
    recurring: true,
    // day: 6,
    date: new Date(new Date().getTime() + 60000),
  });
  notifications.map((notification) => {
    const date = new Date(notification.date);
    const day =
      notification.day === undefined ? '*' : (notification.day + 1) % 7;
    console.log(date);
    const cronDate = notification.recurring
      ? //'* 3 14 * * *'
        `0 ${date.getMinutes()} ${date.getHours()} * * ${day}`
      : new Date(notification.date);

    cronJobs[notification._id]?.stop();
    const job = new CronJob(
      cronDate,
      // '* * * * * *',
      () => cronTask(notification),
      null,
      false
    );
    cronJobs[notification._id] = job;
    job.start();
    console.log(notification, job, 'start');
    return job;
  });
};
