import * as actionTypes from "store/constants/auth";

const initialState = {
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
