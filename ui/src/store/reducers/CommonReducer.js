import * as actionTypes from "store/constants/common";
import moment from "moment";

const initialState = {
  datePicker: [
    {
      startDate: moment().startOf("month").toDate(),
      endDate: moment().endOf("month").toDate(),
    },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DATE_PICKER_RANGE:
      return {
        ...state,
        datePicker: action.payload,
      };
    default:
      return state;
  }
};
