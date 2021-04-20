const NewUserEmailTemplate = (name, verificationCode) => {
  return `
    <div>
      <h4>Hi ${name},</h4>
      <br />
      <h1>Welcome to expense tracker!</h1>
      <br/>
      <p>
        This is the verification code to verify your account: ${verificationCode}
      </p>
    </div>`;
};


module.exports = {
  NewUserEmailTemplate
}
