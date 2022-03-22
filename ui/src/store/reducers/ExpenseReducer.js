import * as actionTypes from "../constants/expense";
import moment from "moment";

const initialState = {
  list: [],
  active: {},
  datePicker: [
    {
      startDate: moment().startOf("month").toDate(),
      endDate: moment().endOf("month").toDate(),
    },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_EXPENSES_SUCCESS:
      return {
        ...state,
        list: action.payload,
      };

    case actionTypes.CREATE_EXPENSE_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
      };

    case actionTypes.UPDATE_EXPENSE_SUCCESS:
      return {
        ...state,
        list: [
          ...state.list.map((item) => {
            if (item._id === action.payload._id) {
              return action.payload;
            }
            return item;
          }),
        ],
      };

    case actionTypes.DELETE_EXPENSE_SUCCESS:
      return {
        ...state,
        list: [
          ...state.list.filter((item) => {
            return item._id !== action.payload.id;
          }),
        ],
      };

    default:
      return state;
  }
};
