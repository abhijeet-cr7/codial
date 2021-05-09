const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    service : 'gmail',
    host : 'smtp.gmail.com',
    port: 587,
    secure : false,
    auth : {
        user : 'abhijeetdbz7@gmail.com',
        pass : 'Mukherjeedbz7@'
    },
})

let renderTemplate = (data, relativePath) => {
    let maillHTML;
    ejs.renderFile(
    path.join(__dirname, '../views/mailers', relativePath),
    data,
    function(err, template)
    {
    if(err)
    {
    console.log('error in rendering template');
    return;
    }
    maillHTML = template;
    }
    )
    return maillHTML;
}

module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}