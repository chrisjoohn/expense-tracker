import styled from "styled-components";
import { useSelector } from "react-redux";

import DatePicker from "components/DatePicker";

const StyledH1 = styled.h1`
  padding-top: 30px;
  margin-left: 15%;
  color: #0ca;
  font-weight: bold;
`;

const Reports = (props) => {
  const {
    datePicker: [{ startDate: dateFrom, endDate: dateTo }],
    datePicker: dateRange,
  } = useSelector((state) => state.expense);

  const changeHandler = (item) => {
    console.log(item);
  };

  return (
    <>
      <StyledH1>Reports</StyledH1>
      <DatePicker changeHandler={changeHandler} dateRange={dateRange} />
    </>
  );
};

export default Reports;
