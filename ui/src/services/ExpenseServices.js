import API from "./";

export const CreateExpenseService = (reqBody) => API.post("/expense", reqBody);

//Get specific expense
export const GetExpenseService = (id) => API.get(`/expense/${id}`);

/*
 * Get ALL Expenses
 * reqBody = date range
 */
export const AllExpensesService = (reqBody) => API.get(`/expense`, reqBody);

export const UpdateExpenseService = (id, reqBody) =>
  API.patch(`/expense/${id}`, reqBody);

export const DeleteExpenseService = (id) => API.delete(`/expense/${id}`);
