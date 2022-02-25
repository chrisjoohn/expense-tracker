import { useSelector } from "react-redux";

import { ExpenseContainer } from "../../../../components/Expenses";
import ExpenseForm from "./ExpenseForm";

const ExpenseList = (props) => {
  const { list } = useSelector((state) => state.expense);
  return (
    <ExpenseContainer title="Expenses" expenses={list} form={ExpenseForm} />
  );
};

export default ExpenseList;
