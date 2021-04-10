import {
  SET_USER,
  SET_ERRORS,
  // CLEAR_ERRORS,
  // LOADING_UI,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_POST,
  UNLIKE_POST,
} from "./../types";

const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
  errors: [],
  loading: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case SET_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case LIKE_POST:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            postId: action.payload.postId,
          },
        ],
      };
    case UNLIKE_POST:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.postId !== action.payload.postId
        ),
      };
    default:
      return state;
  }
};
