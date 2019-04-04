const express = require('express');
const serveStatic = require('serve-static');
const finalhandler = require('finalhandler');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
require('dotenv').config();

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const port = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());
app.use(serveStatic(process.env.UPLOADS_DIR));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/email', (req, res) => {
  const body = req.body;
  const { subject, name, email, message } = body;
  const html = `
  <p>Hi,</p>
  <p>There was a new message send to you:</p>
  Subject: ${subject}<br>
  Name: ${name}<br>
  E-Mail: ${email}<br>
  Message:<br>${message}<br>
  <br>
  Have a nice day,<br>
  RTV-backend
  `;
  try {
    const msg = {
      to: process.env.MAIL_TO,
      from: process.env.MAIL_FROM,
      subject,
      html,
    };
    sgMail
      .send(msg)
      .then(() => res.send({ ok: true }))
      .catch(e => {
        console.error(e);
        res.sendStatus(500).send(e);
      });
  } catch (error) {
    res.sendStatus(500);
  }
});

app.listen(port, () => console.log(`Listening on ${port}!`));
