import styled from "styled-components";

import ExpenseContainer from "components/Expenses/ExpenseContainer";

const ExpenseWrapper = styled.div`
  height: 100vh;
  background-color: #f3f3f3;
  display: flex;
  justify-content: space-around;
  padding-left: 15rem;
  padding-right: 15rem;
`;

const DashboardWrapper = styled.div``;

const Dashboard = (props) => {
  return (
    <DashboardWrapper>
      <ExpenseWrapper>
        <ExpenseContainer title="Fixed Expenses" />
        <ExpenseContainer title="Other Expenses" />
      </ExpenseWrapper>
    </DashboardWrapper>
  );
};

export default Dashboard;
