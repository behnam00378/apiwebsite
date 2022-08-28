const nodeMailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const transporterDetails = smtpTransport({
  host: "mail.hafvan.ir",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAILPASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

exports.sendEmail = (email, fullname, subject, message) => {
  const transporter = nodeMailer.createTransport(transporterDetails);
  transporter.sendMail({
    from: "hafvancontact@hafvan.ir",
    to: email,
    subject: subject,
    html: `<h1> سلام ${fullname}</h1>
            <p>${message}</p>`,
  });
};
