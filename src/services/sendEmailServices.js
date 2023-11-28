const nodemailer = require('nodemailer');

const sendEmail = async (receiveEmail, data) => {
  console.log('check send email', process.env.PASS_EMAIL_APP);
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,

    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>

      user: process.env.EMAIL_APP,
      pass: process.env.PASS_EMAIL_APP,
    },
  });

  const info = await transporter.sendMail({
    from: '"Mipha App 👻" <khanhvu0711@gmail.com>', // sender address
    to: receiveEmail, // list of receivers
    subject: `Hello ✔  ${data.company}`, // Subject line

    html: `
    <h3> hello ${receiveEmail}</h3>
    <p> this is ${data.company} company. We glad to received your apply to ${data.position}. We would like to interview you at 1/1/1000 </P>
    <p>this is auto email, please don't reply </p>
    <p>if you have any quest tion, please contact my website <a href="http://localhost:5173" target="_blank"> My Website </a></p>
    
    `, // html body
  });
};

export default sendEmail;
