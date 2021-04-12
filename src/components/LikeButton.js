import React from "react";
import MyButton from "../util/MyButton";
import { Link } from "react-router-dom";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { likePost, unlikePost } from "../redux/actions/dataActions";

//MUI
import { Favorite, FavoriteBorder } from "@material-ui/icons";

const mapState = (state) => ({
  user: state.user,
});

const LikeButton = ({ postId }) => {
  const dispatch = useDispatch();

  const {
    user,
    user: { authenticated },
  } = useSelector(mapState);

  const likedPost = () => {
    if (user.likes && user.likes.find((like) => like.postId === postId)) {
      return true;
    } else return false;
  };

  const likeAPost = () => {
    dispatch(likePost(postId));
  };

  const unlikeAPost = () => {
    dispatch(unlikePost(postId));
  };

  const likeButton = !authenticated ? (
    <Link to="/login">
      <MyButton tip="Like">
        <FavoriteBorder color="primary" />
      </MyButton>
    </Link>
  ) : likedPost() ? (
    <MyButton tip="Undo like" onClick={unlikeAPost}>
      <Favorite color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={likeAPost}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );
  return likeButton;
};

export default LikeButton;
