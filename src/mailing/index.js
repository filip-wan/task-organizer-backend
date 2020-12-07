import nodemailer from 'nodemailer';

const { MAIL_USER, MAIL_PASSWORD, MAIL_HOST, MAIL_DOMAIN } = process.env;

const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  secure: false,
  port: 587,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
});

export const sendMail = (notification, callback) => {
  const mailOptions = {
    from: `Task Organizer <info@${MAIL_DOMAIN}>`,
    to: notification.email,
    subject: notification.label,
    html: `<div>\
        <h1>You have a new notification!</h1>\
        <span>${notification.description}</span>\
      </div>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
    callback(error, info);
  });
};
