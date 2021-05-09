const nodemailer = require('../config/nodemailer');

// this is another way of exporting a method

exports.newComment = (comment) => {
    console.log('inside new comment mailer');
  nodemailer.transporter.sendMail({
     from : 'abhijeetdbz7@gmail.com',
     to : comment.user.email,
     subject : "New Comment Published!",
     html : '<h1>Yup, your comment is now published!</h1>'
  }, (err,info) => {
      if(err)
      {
      console.log('error in sending mail', err);
      return;
      }
    console.log('Message sent', info);
    return;
  });
}