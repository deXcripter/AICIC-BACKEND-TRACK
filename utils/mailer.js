const nodemailer = require("nodemailer");

// 1) Creating a nodemailer transport
const transport = nodemailer.createTransport({
  // host: 571,
  // port: 4040,
  service: "Gmail",
  auth: {
    pass: process.env.GMAIL_PASSWORD,
    user: process.env.GMAIL_USERNAME,
  },
});

// console.log(process.env.GMAIL_PASSWORD);
// console.log(process.env.GMAIL_USERNAME);

async function sendEmail(to, subject, text) {
  try {
    await transport.sendMail({
      from: "njnnaji247@gmail.com",
      to,
      subject,
      text: `${text}`,
    });
  } catch (err) {
    console.log(err);
    console.log("Error sending mail to user");
  }
}

exports.sendEmail = sendEmail;
