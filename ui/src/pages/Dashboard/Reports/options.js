import moment from "moment";

export const mainOptions = [
  { value: "year", placeholder: "Year" },
  { value: "quarterFilter", placeholder: "Quarter" },
  { value: "monthFilter", placeholder: "Month" },
  { value: "weekFilter", placeholder: "Week" },
];

export const yearOptions = [
  {
    value: 2022,
    placeholder: 2022,
  },
];

export const quarterOptions = [
  {
    value: 1,
    placeholder: "Q1",
  },
  {
    placeholder: "Q2",
    value: 2,
  },
  {
    placeholder: "Q3",
    value: 3,
  },
  {
    value: 4,
    placeholder: "Q4",
  },
];

const months = moment.monthsShort();

export const monthOptions = months.map((month) => {
  return {
    value: month,
    placeholder: month,
  };
});
