import styled from "styled-components";
import { PieChart, Pie, Tooltip } from "recharts";
import { useState } from "react";

import { MenuIcon } from "icons";

import DatePicker from "components/DatePicker";
import Sidebar from "components/Sidebar";

import {
  FixedExpenseContainer,
  OtherExpenseContainer,
} from "components/Expenses";

const ExpenseWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding-left: 20rem;
  padding-right: 20rem;
`;

const DashboardWrapper = styled.div`
  height: 100vh;
  background-color: #f3f3f3;
`;

const ChartWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  min-height: 25em;
`;

const ChartDetail = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const Span = styled.span`
  display: block;
  font-weight: ${({ bold }) => (bold ? "bold" : "normal")};
  font-size: ${({ size }) => (size ? size : 14) + "px"};
`;

const H1 = styled.h1`
  padding-top: 30px;
  margin-left: 15%;
  color: #0ca;
  font-weight: bold;
`;

const data = [
  { name: "Unpaid Expenses", value: 7000, fill: "#9ed" },
  { name: "Paid Expenses", value: 500, fill: "#0ca" },
];

const EmptyContent = styled.div`
  top: 50%;
  position: absolute;
  text-align: center;
  color: #b4aeae;
  cursor: pointer;
`;

const Dashboard = (props) => {
  const [showSidebar, setShowSidebar] = useState(false);
  let expenses = [null];
  expenses = [];

  // otherExpenses and fixedExpenses should be computed first from expenses
  const otherExpenses = 3000;
  const fixedExpenses = 7000;

  return (
    <DashboardWrapper>
      <Sidebar
        hideSidebar={() => setShowSidebar(false)}
        hidden={!showSidebar}
      />
      <MenuIcon
        onClick={() => setShowSidebar(!showSidebar)}
        className="menu-icon"
        style={{
          height: "30px",
          width: "30px",
          position: "absolute",
          top: "40",
          left: "12%",
          cursor: "pointer",
        }}
      />
      <H1 className="no-hightlights">Dashboard</H1>

      <ChartWrapper>
        <DatePicker />
        {expenses.length ? (
          <>
            <ChartDetail>
              <Span bold size={35}>
                {" "}
                {otherExpenses + fixedExpenses}
              </Span>
              <Span>Total Expenses</Span>
              <Span bold size={25}>
                500
              </Span>
              <Span>Total Expenses Paid</Span>
            </ChartDetail>
            <PieChart width={400} height={400}>
              <Tooltip />
              <Pie
                dataKey="value"
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={130}
                outerRadius={170}
                fill="#8884d8"
              />
            </PieChart>
          </>
        ) : (
          <EmptyContent>
            <h4>No data to show</h4>
          </EmptyContent>
        )}
      </ChartWrapper>
      <ExpenseWrapper>
        <FixedExpenseContainer />
        <OtherExpenseContainer />
      </ExpenseWrapper>
    </DashboardWrapper>
  );
};

export default Dashboard;
