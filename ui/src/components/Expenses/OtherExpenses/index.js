import ExpenseContainer from "../ExpenseContainer";

import OtherExpenseForm from './form';


const OtherExpenseContainer = (props) => {
  return <ExpenseContainer title="Other Expenses" form={OtherExpenseForm} />;
};

export default OtherExpenseContainer;
