import { IS_CLOSED, IS_OPEN } from "../types";

export const openSide = () => (dispatch) => {
  dispatch({ type: IS_OPEN });
};

export const closeSide = () => (dispatch) => {
  dispatch({ type: IS_CLOSED });
};
