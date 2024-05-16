var nodeMailer = require('nodemailer');

const TransporterConfig = require('./models/TransporterConfig')

let userName
// let host = 'mail.codeitsolutionspr.com'
// let port = 465
// let paswword = 'UBqB9wF1!'
// let user = 'support@codeitsolutionspr.com'

// let transporter = nodeMailer.createTransport({
//   host: 'mail.codeitsolutionspr.com',
//   port: 465,
//   secure: true,
//   auth: {
//       user: 'support@codeitsolutionspr.com',
//       pass: 'UBqB9wF1!'
//   }
// })

// let html = `
// <body>
//     <div class="email-wrapper">
//       <div class="email-header">
//         <h1>Welcome to Bridge Security Expenses</h1>
//       </div>
//       <div class="email-body">
//         <p>Dear ${userName},</p>
//         <p>Thank you for registering with us. We are excited to have you on board.</p>
//         <p>Best regards,<br>Bridge Security Expenses</p>
//         <p>If you did not register for a Bridge Security Expenses account, please ignore this email.</p>
//       </div>
//       <div class="email-footer">
//         <p>If you have any questions, please don't hesitate to contact us at <a href="mailto:support@bridgesecuritypr.com">support@bridgesecuritypr.com</a></p>
//       </div>
//     </div>
//   </body>`;

  function updateMailer(user, host, port, password, html) {
    if (user) {
      user = user
    }

    if (host) {
      host = host
    }

    if(port) {
      port = port
    }

    if (password) {
      password
    }

    if (html) {
      html = html
    }

  }

  async function main(destination, userName, userId) {

    let configs = await TransporterConfig.find()
    let thisConfig = configs[0]

    console.log("this is the config", thisConfig)

    let transporter = nodeMailer.createTransport({
      host: thisConfig.host,
      port: thisConfig.port,
      secure: true,
      auth: {
          user: thisConfig.user,
          pass: thisConfig.pass
      }
    })

    console.log("This is the destination and email from main function", destination, userName, userId)

    let html = `
    <body>
    <div class="email-wrapper">
      <div class="email-header">
        <h1>Reset Your Bridge Security Expenses Password</h1>
      </div>
      <div class="email-body">
        <p>Dear ${userName},</p>
        <p>You have requested to reset your password. Please follow the link below to set a new password:</p>
        <p><a href="https://https://bridge-client-omega.vercel.app/reset-password/${userId}">Reset Password</a></p>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>Best regards,<br>Bridge Security Services</p>
        <p>Please click this link within the next 5 minutes.</p>
        <p>If you did not register for a Bridge Security Expenses account, please ignore this email.</p>
      </div>
      <div class="email-footer">
        <p>If you have any questions, please don't hesitate to contact us at <a href="mailto:support@bridgesecuritypr.com">support@bridgesecuritypr.com</a></p>
      </div>
    </div>
  </body>`;

    console.log("this is the html from main function", html)

      let mailOptions = {
        from: 'Bridge Security <support@bridgesecuritypr.com>',
        to: `${destination}`,
        subject: 'Reset Password',
        html: html,
      };
      
      transporter.sendMail(mailOptions, function(error, support){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + support.response);
        }
      });
  }

  // async function rename(name) {
  //   console.log("this is the rename function", name)
  //   userName = name
  //   html = html
  //   console.log("This is the new username and html from rename function", userName, html)
  //   return name
  // }

  

  module.exports = { updateMailer, main }

  // main()
  // .catch(e => console.log(e));
 // ?token=[Token]


