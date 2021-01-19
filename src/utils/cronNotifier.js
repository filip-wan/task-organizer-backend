import { CronJob } from 'cron';
import { Notification } from '../db/models/Notification.js';
import { sendMail } from './mailing/index.js';

const cronJobs = {};

const cronTask = (notification) => {
  sendMail(notification, console.log);
  if (!notification.recurring) {
    cronJobs[notification._id]?.stop();
    Notification.findByIdAndDelete(notification._id);
  }
};

export const runNotifications = async () => {
  const notifications = await Notification.find();
  // notifications.push({
  //   _id: 'test',
  //   recurring: true,
  //   // day: 6,
  //   date: new Date(new Date().getTime() + 60000),
  // });
  notifications.map(runNotification);
};

export const runNotification = (notification) => {
  if (
    !notification.recurring &&
    new Date(notification.date).getTime() < Date.now()
  ) {
    Notification.findByIdAndRemove(notification._id);
    return;
  }
  const date = new Date(notification.date);
  const day = notification.day === undefined ? '*' : (notification.day + 1) % 7;
  const cronDate = notification.recurring
    ? `0 ${date.getMinutes()} ${date.getHours()} * * ${day}`
    : new Date(notification.date);

  cronDate.setSeconds?.(0);
  cronJobs[notification._id]?.stop();
  const job = new CronJob(cronDate, () => cronTask(notification), null, false);
  cronJobs[notification._id] = job;
  job.start();
  return job;
};
