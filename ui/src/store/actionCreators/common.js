import * as actionTypes from "store/constants/common";

export const SetDatePickerRange = (payload) => ({
  type: actionTypes.SET_DATE_PICKER_RANGE,
  payload,
});
