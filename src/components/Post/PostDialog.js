import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";

//Redux
import { getPost, clearErrors } from "../../redux/actions/dataActions";

//MUI
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

//MUI Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";

//Components
import MyButton from "../../util/MyButton";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

const styles = (theme) => ({
  ...theme.spreadThis,

  seperatorBody: {
    border: "none",
    marginTop: 5,
  },
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover",
    [theme.breakpoints.down("xs")]: {
      maxWidth: 150,
      height: 150,
      marginRight: 20,
    },
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
  },
  spinner: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
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
});

const mapState = (state) => ({
  post: state.data.post,
  UI: state.UI,
});

const PostDialog = ({ classes, postId, userHandle, openDialog }) => {
  const {
    post: { body, createdAt, likeCount, commentCount, userImage, comments },
    UI: { loading },
  } = useSelector(mapState);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [oldPath, setOldPath] = useState("");
  const newPath = `/users/${userHandle}/post/${postId}`;
  const handleOpen = useCallback(() => {
    setOldPath(window.location.pathname);
    window.history.pushState(null, null, newPath);
    setOpen(true);
    dispatch(getPost(postId));
  }, [dispatch, postId, newPath]);

  const handleClose = () => {
    window.history.pushState(null, null, oldPath);
    if (oldPath === newPath) {
      setOldPath(`/users/${userHandle}`);
      console.log(oldPath);
    }
    setOpen(false);
    dispatch(clearErrors());
  };

  useEffect(() => {
    if (openDialog) {
      handleOpen();
    }
  }, [handleOpen, openDialog]);

  const dialogMarkup = loading ? (
    <div className={classes.spinner}>
      <CircularProgress size={200} thickness={2} />
    </div>
  ) : (
    <Grid container spacing={16}>
      <Grid item sm={5}>
        <img src={userImage} alt="Profile" className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="secondary"
          variant="h5"
          to={`/users/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr className={classes.seperator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
        </Typography>
        <hr className={classes.seperatorBody} />
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
        </div>
      </Grid>
      <CommentForm postId={postId} />
      <Comments comments={comments} />
    </Grid>
  );

  return (
    <Fragment>
      <MyButton
        onClick={handleOpen}
        tip="Expand Post"
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default withStyles(styles)(PostDialog);
