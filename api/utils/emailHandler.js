const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const sendEmail = (recipient, subject, emailContent) => {
  const msg = {
    to: recipient,
    from: "expense.dev@dispostable.com",
    subject,
    html: emailContent,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent!");
    })
    .catch((err) => {
      console.log(err.response.body);
    });
};

module.exports = {
  sendEmail,
};
