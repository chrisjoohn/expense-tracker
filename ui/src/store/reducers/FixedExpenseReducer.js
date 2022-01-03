import * as actionTypes from "../constants/fixedExpense";

const initialState = {
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PAYABLES:
      return {
        ...state,
        list: action.payload,
      };

    default:
      return state;
  }
};
