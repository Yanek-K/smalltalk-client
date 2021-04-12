import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import MyButton from "../util/MyButton";
import withStyles from "@material-ui/core/styles/withStyles";

import { clearErrors, sendAPost } from "../redux/actions/dataActions";

//MUI card styles
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

//MUI
import Button from "@material-ui/core/Button";
import CircularProgresss from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";

const styles = (theme) => ({
  card: {
    margin: "10px 0px 0px",
  },
  content: {
    marginTop: -5,
    marginBottom: 0,
    height: "80px",
  },
  openButton: {
    margin: "0 0px -20px",
    alignSelf: "center",
    [theme.breakpoints.down("sm")]: {
      margin: "0 0 -50px",
    },
  },
  submitButton: {
    margin: "15px 5px 10px 0px",
    width: "10%",
  },
  cancelButton: {
    margin: "0px 5px 5px 0px",
    float: "right",
    marginTop: 10,
  },
  progressSpinner: {
    position: "absolute",
  },
});

const mapState = (state) => ({
  loading: state.UI.loading,
  UI: state.UI,
});

const PostaPost = ({ classes }) => {
  const dispatch = useDispatch();
  const { loading, UI } = useSelector(mapState);
  const [post, setPost] = useState("");
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendAPost({ body: post }));
    setPost("");
    setOpen(false);
  };

  const handleCancel = (e) => {
    dispatch(clearErrors());
    setOpen(false);
  };
  useEffect(() => {
    if (UI.errors !== null) {
      setErrors(UI.errors);
    }
    if (!UI.errors) {
      setErrors("");
    }
  }, [UI.errors]);

  return (
    <div>
      {open ? (
        ""
      ) : (
        <Button
          variant="contained"
          color="secondary"
          className={classes.openButton}
          // disabled={loading}
          onClick={(e) => setOpen(true)}
        >
          +
        </Button>
      )}
      {open ? (
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <form onSubmit={handleSubmit}>
              <TextField
                id="post"
                name="post"
                type="text"
                label="Add to the conversation"
                value={post}
                color="secondary"
                onChange={(e) => setPost(e.target.value)}
                fullWidth
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
              ></TextField>

              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgresss
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
              <Button
                onClick={handleCancel}
                color="primary"
                className={classes.cancelButton}
              >
                X
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        ""
      )}
    </div>
  );
};

export default withStyles(styles)(PostaPost);
