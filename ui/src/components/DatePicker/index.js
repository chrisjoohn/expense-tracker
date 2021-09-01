import { DateRangePicker } from "react-date-range";
import { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { SetDatePickerRange } from "store/actionCreators/common";

import { ChevronUp, Chevrondown } from "icons";

const Wrapper = styled.div`
  position: absolute;
  left: 15%;
  top: 10%;
  z-index: 1;
`;

const SpanContainer = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1;
  background-color: white;
  width: 250px;
  display: flex;
  justify-content: space-between;
`;

const CalendarWrapper = styled.div``;

const chevronStyles = { height: "15px", marginTop: "5px", marginLeft: "10px" };

const DatePicker = (props) => {
  const dispatch = useDispatch();
  const { datePicker: dateRange } = useSelector((state) => state.common);

  const [dateText, setDateText] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const startDate = moment().startOf("month").toDate();
    const endDate = moment().endOf("month").toDate();

    const payload = [
      {
        startDate: startDate,
        endDate: endDate,
      },
    ];

    dispatch(SetDatePickerRange(payload));
  }, []);

  useEffect(() => {
    const { startDate, endDate } = dateRange[0];
    const startDateText = moment(startDate).format("MM/D/YYYY");
    const endDateText = moment(endDate).format("MM/D/YYYY");

    setDateText(startDateText + " - " + endDateText);
  }, [dateRange]);

  const changeHandler = (item) => {
    dispatch(SetDatePickerRange([item.range1]));
  };

  return (
    <Wrapper>
      <SpanContainer
        onClick={() => setShowDatePicker(!showDatePicker)}
        className="no-hightlights"
      >
        <span>{dateText ? dateText : moment().format("MMMM")}</span>
        {showDatePicker ? (
          <ChevronUp style={chevronStyles} />
        ) : (
          <Chevrondown style={chevronStyles} />
        )}
      </SpanContainer>
      <CalendarWrapper>
        {showDatePicker && (
          <DateRangePicker
            ranges={dateRange}
            onChange={changeHandler}
            months={2}
            direction="horizontal"
            showSelectionPreview={true}
            moveRangeOnFirstSelection
            color="#01bfa6"
          />
        )}
      </CalendarWrapper>
    </Wrapper>
  );
};

export default DatePicker;
