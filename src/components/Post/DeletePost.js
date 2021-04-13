import React, { useState } from "react";
import { useDispatch } from "react-redux";

//Redux
import { deletePost } from "../../redux/actions/dataActions";

//Components
import MyButton from "../../util/MyButton";

//MUI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  deleteButton: {
    position: "absolute",
    right: 0,
    marginRight: "20px",
    top: "2%",
  },
};

const DeletePost = ({ classes, postId }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteAPost = () => {
    dispatch(deletePost(postId));
    setOpen(false);
  };

  return (
    <div>
      <MyButton
        tip={"Delete Post"}
        onClick={handleOpen}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutline color="secondary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you want to delete the post?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteAPost} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withStyles(styles)(DeletePost);
