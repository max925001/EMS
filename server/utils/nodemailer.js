import { config } from 'dotenv';
config()
import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILEREMAIL || "shivam969684@gmail.com" ,
    pass: 'wjxh sevw upal mbln',
  },
});

const sendEmail = (options) => {
  const mailOptions = {
    from: 'noreply@yourapp.com',
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(error);
      }
      resolve(info);
    });
  });
};

export default sendEmail;
