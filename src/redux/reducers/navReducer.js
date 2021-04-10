import { IS_CLOSED, IS_OPEN } from "../types";

const initialState = {
  open: false,
};

export const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_OPEN:
      return {
        ...state,
        open: true,
      };
    case IS_CLOSED:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};
