import styled from "styled-components";

import ExpenseItem from "./ExpenseItem";
import { PlusCircle } from "icons";

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
  overflow-y: ${({ isEmpty }) => !isEmpty && "scroll"};
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
  cursor: pointer;
`;

const ExpenseContainer = (props) => {
  const { title } = props;

  let expenses = [null, null, null, null, null, null, null];
  expenses = [];

  const isEmpty = expenses.length === 0;

  return (
    <div>
      <TitleContainer>{title}</TitleContainer>
      <Wrapper>
        <ExpenseContainerWrapper isEmpty={isEmpty}>
          {expenses?.length > 0 ? (
            expenses.map((item) => <ExpenseItem {...item} />)
          ) : (
            <EmptyContent
              onClick={() => alert("This part is under construction!")}
            >
              <span style={{ display: "block" }}>
                Click here to add {title}
              </span>
              <PlusCircle style={{ height: "30px" }} />
            </EmptyContent>
          )}
        </ExpenseContainerWrapper>
        {!isEmpty > 0 && <AddExpenseBtn>Add expense</AddExpenseBtn>}
      </Wrapper>
    </div>
  );
};

export default ExpenseContainer;
