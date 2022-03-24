import { useState } from "react";
import styled from "styled-components";
import moment from "moment";

import BarChart from "components/Charts/BarChart";
import Select from "components/Inputs/Select";

import {
  mainOptions,
  quarterOptions,
  monthOptions,
  yearOptions,
} from "./options";

const StyledH1 = styled.h1`
  padding-top: 30px;
  margin-left: 15%;
  color: #0ca;
  font-weight: bold;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ContentContainer = styled.div`
  width: 70%;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const ChartContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 1;
  padding-top: 50px;
`;

const SorterContainer = styled.div`
  align-self: flex-start;
  display: flex;
  padding: 10px;
  z-index: 2;

  & > div {
    margin-right: 20px;
  }
`;

const Reports = (props) => {
  const currentYear = moment().year();
  const currentMonth = moment().format("MMM");
  // TODO: Set initial values of year -> current year
  const [filter, setFilter] = useState({
    main: { value: "monthFilter", placeholder: "Month" },
    monthFilter: { year: { value: currentYear, placeholder: currentYear } },
    quarterFilter: { year: { value: currentYear, placeholder: currentYear } },
    weekFilter: {
      year: { value: currentYear, placeholder: currentYear },
      month: { value: currentMonth, placeholder: currentMonth },
    },
  });

  const mainSortChangeHandler = (item) => {
    setFilter({
      ...filter,
      main: item,
    });
  };

  const quarterFilterHandler = (item) => {
    setFilter({
      ...filter,
      quarterFilter: { year: item },
    });
  };

  const monthFilterHandler = (item) => {
    setFilter({
      ...filter,
      monthFilter: { year: item },
    });
  };

  const weekFilterHandler = (fieldName, item) => {
    setFilter({
      ...filter,
      weekFilter: { ...filter.weekFilter, [fieldName]: item },
    });
  };

  const { main, monthFilter, quarterFilter, weekFilter } = filter;

  console.log(filter);

  return (
    <>
      <StyledH1>Reports</StyledH1>
      <ContentWrapper>
        <ContentContainer>
          <SorterContainer>
            <Select
              placeholder="Sort by: "
              options={mainOptions}
              onChange={mainSortChangeHandler}
              defaultVal={main}
            />
            {/* QUARTER FILTER */}
            {main.value === "quarterFilter" && (
              <Select
                placeholder="Year: "
                options={yearOptions}
                onChange={quarterFilterHandler}
                defaultVal={quarterFilter.year}
              />
            )}

            {/* MONTH FILTER */}
            {main.value === "monthFilter" && (
              <Select
                placeholder="Year: "
                options={yearOptions}
                onChange={monthFilterHandler}
                defaultVal={monthFilter.year}
              />
            )}

            {/* WEEK FILTER */}
            {main.value === "weekFilter" && (
              <>
                <Select
                  placeholder="Year: "
                  options={yearOptions}
                  onChange={(item) => weekFilterHandler("year", item)}
                  defaultVal={weekFilter.year}
                />
                {weekFilter.year?.value && (
                  <Select
                    placeholder="Month: "
                    options={monthOptions}
                    onChange={(item) => weekFilterHandler("month", item)}
                    defaultVal={weekFilter.month}
                  />
                )}
              </>
            )}
          </SorterContainer>
          <ChartContainer>
            <BarChart />
          </ChartContainer>
        </ContentContainer>
      </ContentWrapper>
    </>
  );
};

export default Reports;
