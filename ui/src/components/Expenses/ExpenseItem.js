import styled from "styled-components";

const ExpenseItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #818181;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const ExpenseTitle = styled.span`
  margin-left: 3px;
`;

const ExpenseAmount = styled.span`
  font-weight: bold;
`;

const ExpenseItem = (props) => {
  const { title = "Sample", amount = 0 } = props;
  return (
    <ExpenseItemWrapper>
      <div>
        <input type="checkbox" />
        <ExpenseTitle>{title}</ExpenseTitle>
      </div>
      <ExpenseAmount>&#8369; {amount}</ExpenseAmount>
    </ExpenseItemWrapper>
  );
};

export default ExpenseItem;
