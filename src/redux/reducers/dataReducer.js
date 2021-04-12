import {
  SET_POSTS,
  LOADING_DATA,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  SEND_POST,
  SET_POST,
  SUBMIT_COMMENT,
} from "../types";

const initialState = {
  posts: [],
  post: {},
  loading: false,
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case LIKE_POST:
    case UNLIKE_POST:
      let index = state.posts.findIndex(
        (post) => post.postId === action.payload.postId
      );
      state.posts[index] = action.payload;
      if (state.post.postId === action.payload.postId) {
        state.post.likeCount = action.payload.likeCount;
      }
      return {
        ...state,
      };
    case DELETE_POST:
      let number = state.posts.findIndex(
        (post) => post.postId === action.payload
      );
      state.posts.splice(number, 1);
      return {
        ...state,
      };
    case SEND_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case SET_POST:
      return {
        ...state,
        post: action.payload,
      };
    case SUBMIT_COMMENT:
      // let num = state.posts.findIndex(
      //   (post) => post.postId === action.payload.postId
      // );
      // state.posts[num] = action.payload;
      // if (state.post.postId === action.payload.postId) {
      //   state.post.commentCount = action.payload.commentCount;
      // }
      return {
        ...state,
        post: {
          ...state.post,
          commentCount: state.post.commentCount + 1,
          comments: [{ ...action.payload }, ...state.post.comments],
        },
      };
    default:
      return state;
  }
};
