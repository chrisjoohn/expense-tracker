import styled from "styled-components";
import { PieChart, Pie, Tooltip } from "recharts";
import DatePicker from "components/DatePicker";

import ExpenseContainer from "components/Expenses/ExpenseContainer";

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

const data = [
  { name: "Unpaid Expenses", value: 7000, fill: "#9ed" },
  { name: "Paid Expenses", value: 500, fill: "#0ca" },
];

const Dashboard = (props) => {
  return (
    <DashboardWrapper>
      <ChartWrapper>
        <DatePicker />
        <ChartDetail>
          <Span bold size={35}>
            {" "}
            7500
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
      </ChartWrapper>
      <ExpenseWrapper>
        <ExpenseContainer title="Fixed Expenses" />
        <ExpenseContainer title="Other Expenses" />
      </ExpenseWrapper>
    </DashboardWrapper>
  );
};

export default Dashboard;
