const cheerio = require("cheerio");
const fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const express = require("express");
const app = express();
const axios = require("axios");
const urlParser = require('url')
// const {fileRead} = require('./data')
const mongoose = require('mongoose');
var validator = require("email-validator");
const fetch = require('node-fetch');
const ImageModel = require('./model/img');
const fileUpload = require("express-fileupload");
require("dotenv").config();
app.use(express.json())

const nodemailer = require("nodemailer");

// var connection_string = `mongodb://127.0.0.1:27017/email-tet`;

mongoose.connect(process.env.MONGO);



const connection = mongoose.connection;

//event listeners
connection.on('error', () => console.log("error connecting database"));

connection.once('open', async () => {
  console.log("Database connected");

});
//exporting connection
module.exports = connection;



let transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: 'axit.patel@pedalsup.com', // generated ethereal user
    pass: 'gbklsmdqfrcbhhfe', // generated ethereal password
  },
});

// let url = "http://3.0.201.14:8080/"
let content = "Hello there"
const mailSend = async (email) => {
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'axit.patel@pedalsup.com', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<div>
    <p>${content}</p>
    <img src='${process.env.URL}/event'/>
    </div>`,
  });

  console.log("Message sent: %s", info.messageId);
}

app.use(
  fileUpload()
);

app.get("/", (req, res) => {
  res.json({ "msg": "hello world" }).status(200);
})

app.post('/', (req, res) => {
  console.log(req.body)
  let email = req.body.email
  console.log(email)
  mailSend(email)
  res.send("email sent");
})

app.get('/event', async (req, res) => {
  await ImageModel.create({ msg: "hit recieved" });
  // const img  = await ImageModel.find()
  // console.log(img)
  res.send(Buffer.from('R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=', 'base64'))
})

// app.post( '/upload' ,(req, res) => {
//   // console.log(req.body)
//   console.log(req.files)
//   ImageModel.create({ Image: req.files.image.data})
//     .then((doc) => {
//       res.json(doc).status(200);
//     })
//     .catch((err) => {
//       res.json(err).status(400);
//     });
// });


app.listen(process.env.PORT, () => {
  console.log("server started")
})
