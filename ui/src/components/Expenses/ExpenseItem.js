import styled from "styled-components";
import { useDispatch } from "react-redux";

import { UpdateExpenseRequest } from "store/actionCreators/expense";

const ExpenseItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #818181;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const ExpenseTitle = styled.span`
  margin-left: 3px;
  cursor: pointer;
  text-decoration: ${({ checked }) => checked && "line-through"};
`;

const ExpenseAmount = styled.span`
  font-weight: bold;
`;

const ExpenseItem = (props) => {
  const { title = "Sample", amount = 0, isPaid = false, _id: id } = props;
  const dispatch = useDispatch();

  const updateItem = () => {
    dispatch(UpdateExpenseRequest({ id, data: { isPaid: !isPaid } }));
  };

  return (
    <ExpenseItemWrapper>
      <div>
        <input
          type="checkbox"
          checked={isPaid}
          onChange={() => {}}
          onClick={updateItem}
        />
        <ExpenseTitle checked={isPaid} onClick={updateItem}>
          {title}
        </ExpenseTitle>
      </div>
      <ExpenseAmount>&#8369; {amount}</ExpenseAmount>
    </ExpenseItemWrapper>
  );
};

export default ExpenseItem;
