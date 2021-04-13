import React, { useEffect, useState } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";

//MUI
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  ...theme.spreadThis,
  button: {
    marginTop: 5,
    marginBottom: 30,
    [theme.breakpoints.down("xs")]: {
      marginBottom: 50,
    },
  },
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
  }, [UI.errors, loading]);

  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} xs={12} styles={{ textAlign: "center" }}>
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
