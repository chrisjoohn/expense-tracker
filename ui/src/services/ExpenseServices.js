import API from "./";

const BASE_PATH = "/expenses";

export const CreateExpenseService = (reqBody) => API.post(BASE_PATH, reqBody);

//Get specific expense
export const GetExpenseService = (id) => API.get(BASE_PATH + `/${id}`);
export const GetAllExpensesService = ({ dateTo = "", dateFrom = "" }) =>
  API.get(
    BASE_PATH +
      `${dateTo && "?dateTo=" + dateTo + "&"}${
        dateFrom && "dateFrom=" + dateFrom
      }`
  );

export const UpdateExpenseService = (id, reqBody) =>
  API.patch(BASE_PATH + `/${id}`, reqBody);

export const DeleteExpenseService = (id) => API.delete(BASE_PATH + `/${id}`);
