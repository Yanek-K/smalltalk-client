import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//Redux
import { editUserDetails } from "../../redux/actions/userActions";

//MUI
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";

//MUI Icons
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";

const styles = (theme) => ({
  ...theme.spreadThis,
});

const mapState = (state) => ({
  credentials: state.user.credentials,
});

const EditDetails = ({ classes }) => {
  const dispatch = useDispatch();
  const { credentials } = useSelector(mapState);

  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [open, setOpen] = useState(false);

  const mapUserDetailsToState = (credentials) => {
    setWebsite(credentials.website ? credentials.website : "");
    setLocation(credentials.location ? credentials.location : "");
    setBio(credentials.bio ? credentials.bio : "");
  };

  const handleOpen = () => {
    setOpen(true);
    mapUserDetailsToState(credentials);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const userDetails = {
      bio,
      website,
      location,
    };
    dispatch(editUserDetails(userDetails));
    handleClose();
  };

  return (
    <Fragment>
      <div className={classes.editDetails}>
        <Tooltip title="Edit Details" placement="top">
          <IconButton onClick={handleOpen}>
            <SettingsApplicationsIcon color="primary" />
          </IconButton>
        </Tooltip>
      </div>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit your Details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              className={classes.textField}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              fullWidth
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Your Personal/Professional Website"
              className={classes.textField}
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              fullWidth
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Where you live"
              className={classes.textField}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default withStyles(styles)(EditDetails);
