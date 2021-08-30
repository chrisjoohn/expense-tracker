import { useSelector } from "react-redux";

import ExpenseContainer from "../ExpenseContainer";
import OtherExpenseForm from "./form";

const OtherExpenseContainer = (props) => {
  const { list } = useSelector((state) => state.expense);

  return (
    <ExpenseContainer
      title="Other Expenses"
      form={OtherExpenseForm}
      expenses={list}
    />
  );
};

export default OtherExpenseContainer;
