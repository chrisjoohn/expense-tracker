import styled from "styled-components";
import { PieChart, Pie, Tooltip } from "recharts";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DatePicker from "components/DatePicker";
import ExpenseList from "./ExpenseList";

import { GetAllExpensesRequest } from "store/actionCreators/expense";
import { numberWithCommas } from "utils/aux";
import {
  DASHBOARD_DATAS,
  DASHBOARD_COLOR_MAP,
  DASHBOARD_NAME_MAP,
  DASHBOARD_VALUE_MAP,
} from "utils/constants";

const ExpenseWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding-left: 20rem;
  padding-right: 20rem;
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

const EmptyContent = styled.div`
  top: 50%;
  position: absolute;
  text-align: center;
  color: #b4aeae;
  cursor: pointer;
`;

const H1 = styled.h1`
  padding-top: 30px;
  margin-left: 15%;
  color: #0ca;
  font-weight: bold;
`;

const Dashboard = (props) => {
  const { list: expenses } = useSelector((state) => state.expense);
  const {
    datePicker: [{ startDate: dateFrom, endDate: dateTo }],
  } = useSelector((state) => state.common);

  const dispatch = useDispatch();

  const [totalExpenses, setTotalExpenses] = useState({
    total: 0,
    paid: 0,
  });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    dispatch(GetAllExpensesRequest({ dateFrom, dateTo }));
  }, [dateFrom, dateTo]);

  useEffect(() => {
    const total = [...expenses].reduce((acc, prev) => acc + prev.amount, 0);
    const paid = [...expenses]
      .filter((expense) => expense.isPaid)
      .reduce((acc, prev) => acc + prev.amount, 0);

    setTotalExpenses({
      total,
      paid,
    });

    setChartData(
      DASHBOARD_DATAS.map((DATA) => ({
        name: DASHBOARD_NAME_MAP[DATA],
        fill: DASHBOARD_COLOR_MAP[DATA],
        value: DASHBOARD_VALUE_MAP(total, paid)[DATA],
      }))
    );
  }, [expenses]);

  return (
    <>
      <H1 className="no-hightlights">Dashboard</H1>
      <ChartWrapper>
        <DatePicker />
        {expenses.length ? (
          <>
            <ChartDetail>
              <Span bold size={35}>
                {numberWithCommas(totalExpenses.total)}
              </Span>
              <Span>Total Expenses</Span>
              <Span bold size={25}>
                {numberWithCommas(totalExpenses.paid)}
              </Span>
              <Span>Total Expenses Paid</Span>
            </ChartDetail>
            <PieChart width={400} height={400}>
              <Tooltip />
              <Pie
                dataKey="value"
                data={chartData}
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
        {/*<FixedExpenseContainer />*/}
        <ExpenseList />
      </ExpenseWrapper>
    </>
  );
};

export default Dashboard;
