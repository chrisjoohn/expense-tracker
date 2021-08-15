import styled from "styled-components";

import ExpenseItem from "./ExpenseItem";

const Wrapper = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  min-width: 350px;
  min-height: 300px;
  max-height: 300px;
  position: relative;
  border-radius: 10px;
`;

const ExpenseContainerWrapper = styled.div`
  margin-top: 10px;
  padding: 20px;
  max-height: 240px;
  overflow-y: scroll;
  position: relative;
`;

const AddExpenseBtn = styled.button`
  background-color: #01bfa6;
  border: none;
  height: 40px;
  width: 100%;
  color: white;
  vertical-align: middle;
  position: absolute;
  bottom: 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const TitleContainer = styled.h4`
  margin-left: 10px;
`;

const EmptyContent = styled.div`
  margin-top: 30%;
  text-align: center;
  color: #b4aeae;
`;

const ExpenseContainer = (props) => {
  const { title } = props;

  let expenses = [null, null, null, null, null, null, null];
  //expenses = [];

  return (
    <div>
      <TitleContainer>{title}</TitleContainer>
      <Wrapper>
        <ExpenseContainerWrapper isEmpty={expenses.length === 0}>
          {expenses?.length > 0 ? (
            expenses.map((item) => <ExpenseItem {...item} />)
          ) : (
            <EmptyContent>
              <span>Click to add {title}</span>
            </EmptyContent>
          )}
        </ExpenseContainerWrapper>
        {expenses?.length > 0 && <AddExpenseBtn>Add expense</AddExpenseBtn>}
      </Wrapper>
    </div>
  );
};

export default ExpenseContainer;