const nodemailer = require("nodemailer");
const pug = require("pug");
const { convert } = require("html-to-text");

// new Email
module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Ishak manihar <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      service: "SendGrid",
      auth: {
        user: "apikey",
        pass: process.env.SENDGRID_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async send(template, subject) {
      try{
         // render html based on a pug template
         const html = pug.renderFile(
            `${__dirname}/../views/emails/${template}.pug`,
            {
            firstName: this.firstName,
            url: this.url,
            subject,
            }
         );

         const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: convert(html),
         };

         // Create a transport and send email
         const transporter = this.newTransport();
         await transporter.sendMail(mailOptions);
      }  catch (err) {
           console.error('Error sending email:', err);
      }   
   }

  async sendWelcome() {
    await this.send("welcome", "Welcome to Natours!");
  }

  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Your password reset token (valid for only 10 minutes)"
    );
  }
};
