import API from "./";

const BASE_PATH = "/fixed-expenses";

export const CreateFixedExpenseService = (reqBody) =>
  API.post(BASE_PATH, reqBody);
export const GetFixedExpenses = () => API.get(BASE_PATH);
export const GetFixedExpense = (id) => API.get(BASE_PATH + `/${id}`);
export const UpdateFixedexpense = (id, reqBody) =>
  API.patch(BASE_PATH + `/${id}`, reqBody);
export const DeleteFixedExpense = (id) => API.delete(BASE_PATH + `/${id}`);
