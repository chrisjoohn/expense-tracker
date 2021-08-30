// ======= DASHBOARD DATA ======== //

const UNPAID_EXPENSE = "UNPAID_EXPENSE";
const PAID_EXPENSE = "PAID_EXPENSE";

export const DASHBOARD_DATAS = [UNPAID_EXPENSE, PAID_EXPENSE];

export const DASHBOARD_COLOR_MAP = {
  UNPAID_EXPENSE: "#9ed",
  PAID_EXPENSE: "#0ca",
};

export const DASHBOARD_NAME_MAP = {
  UNPAID_EXPENSE: "Unpaid Expenses",
  PAID_EXPENSE: "Paid Expenses",
};

export const DASHBOARD_VALUE_MAP = (total, totalPaid) => ({
  UNPAID_EXPENSE: total - totalPaid,
  PAID_EXPENSE: totalPaid,
});

// ======= DASHBOARD DATA ======== //
