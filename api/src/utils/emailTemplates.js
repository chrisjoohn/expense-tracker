const NewUserEmailTemplate = (name, link) => {
  return `
    <div>
      <h4>Hi ${name},</h4>
      <br />
      <h1>Welcome to expense tracker!</h1>
      <br/>
      <a href="${link}" target="_blank">Verify here!</a>
    </div>`;
};

const ResendVerifyCodeEmailTemplate = (name, link) => {
  return `
    <div>
      <h4>Hi ${name},</h4>
      <br />
      <h1>Here is your verification link. Just go to the link and you're good to go!</h1>
      <br/>
      <a href="${link}" target="_blank">Verify here!</a>
    </div>`;
};

module.exports = {
  NewUserEmailTemplate,
  ResendVerifyCodeEmailTemplate,
};
