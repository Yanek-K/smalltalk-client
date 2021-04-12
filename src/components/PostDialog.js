import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import { useSelector, useDispatch } from "react-redux";
import { likePost, unlikePost } from "../redux/actions/dataActions";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

//Redux
import { getPost } from "../redux/actions/dataActions";

//MUI STUFF
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

//MUI Icons
import CloseIcon from "@material-ui/icons/Close";
import MyButton from "../util/MyButton";
import UnfoldMore from "@material-ui/icons/UnfoldMore";

const styles = (theme) => ({
  ...theme.spreadThis,
  seperator: {
    border: "none",
    margin: 4,
  },
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
  },
});

const mapState = (state) => ({
  post: state.data.post,
  UI: state.UI,
});

const PostDialog = ({ classes, postId, userHandle }) => {
  const {
    post,
    post: { body, createdAt, likeCount, commentCount, userImage },
    UI,
    UI: { loading },
  } = useSelector(mapState);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    dispatch(getPost(postId));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dialogMarkup = loading ? (
    <CircularProgress size={200} />
  ) : (
    <Grid container spacing={16}>
      <Grid item sm={5}>
        <img
          src={userImage}
          alt="Profile Image"
          className={classes.profileImage}
        />
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
        <hr className={classes.seperator} />
        <Typography variant="body1">{body}</Typography>
      </Grid>
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
