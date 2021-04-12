import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import { useSelector, useDispatch } from "react-redux";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import DeletePost from "./DeletePost";
import PostDialog from "./PostDialog";

//MUI card styles
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

//Icons
import ChatIcon from "@material-ui/icons/Chat";
import MyButton from "../../util/MyButton";
import LikeButton from "./LikeButton";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginTop: 20,
    marginBottom: 20,
    height: 150,
    zIndex: "1 !important",
  },
  image: {
    minWidth: 120,
    height: 150,
  },
  content: {
    padding: "10px 25px 20px 25px",
    objectFit: "cover",
    // height: 150,
  },
  postInfo: {
    display: "flex",
    alignItems: "center",
    margin: "10px -10px 10px -12px",
  },
  info: {
    marginLeft: -5,
    marginRight: 10,
  },
};

dayjs.extend(relativeTime);

const mapState = (state) => ({
  user: state.user,
});
const Post = ({
  classes,
  post: {
    body,
    createdAt,
    userImage,
    userHandle,
    postId,
    likeCount,
    commentCount,
  },
}) => {
  const {
    user,
    user: {
      authenticated,
      credentials: { handle },
    },
  } = useSelector(mapState);
  const dispatch = useDispatch();

  const deleteButton =
    authenticated && userHandle === handle ? (
      <DeletePost postId={postId} />
    ) : null;

  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title="Profile Image"
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${userHandle}`}
          color="secondary"
        >
          {userHandle}
        </Typography>
        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        <div className={classes.postInfo}>
          <LikeButton postId={postId} />
          <span className={classes.info}>
            {likeCount} {likeCount === 1 ? "Like" : "Likes"}
          </span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span className={classes.info}>
            {commentCount} {commentCount === 1 ? "Comment" : "Comments"}
          </span>
          <PostDialog postId={postId} userHandle={userHandle} />
        </div>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(Post);
