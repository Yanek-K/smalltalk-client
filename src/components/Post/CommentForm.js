import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";

// Redux
import { useSelector, useDispatch } from "react-redux";

//MUI
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { submitComment } from "../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spreadThis,
});

const mapState = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});

const CommentForm = ({ classes, postId }) => {
  const {
    authenticated,
    UI,
    UI: { loading },
  } = useSelector(mapState);
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitComment(postId, { body: comment }));
    setComment("");
  };

  useEffect(() => {
    if (UI.errors !== null) {
      setErrors(UI.errors);
    }
    if (!UI.errors && !loading) {
      setErrors("");
      setComment("");
    }
  }, [UI.errors]);

  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} styles={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment On Post"
          error={errors.comment ? true : false}
          helperText={errors.comment}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          fullWidth
          className={classes.textField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
        <hr className={classes.seperator} />
      </form>
    </Grid>
  ) : null;

  return commentFormMarkup;
};

export default withStyles(styles)(CommentForm);
