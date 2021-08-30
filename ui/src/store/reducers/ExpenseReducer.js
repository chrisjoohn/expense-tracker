import * as actionTypes from "../constants/expense";

const initialState = {
  list: [],
  active: {},
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

    default:
      return state;
  }
};
