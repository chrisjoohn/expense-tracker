import API from "./";

export const LoginService = (reqBody) => API.post("/auth/login", reqBody);
export const RegisterService = (reqBody) => API.post("/auth/register", reqBody);

export const VerifyUserEmailService = (token) =>
  API.get("/auth/verify-email/" + token);

export const ResendVerifyEmailService = (data) => {
  API.post("/auth/resend-verify-email", data);
};

export const MeService = () => API.get("/auth/me");
