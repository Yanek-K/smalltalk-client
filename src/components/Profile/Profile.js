import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import EditDetails from "./EditDetails";

//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

//Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import Edit from "@material-ui/icons/Edit";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, uploadImage } from "../../redux/actions/userActions";

const mapState = (state) => ({
  user: state.user,
  authenticated: state.user.authenticated,
});

const styles = (theme) => ({
  paper: {
    padding: 20,
    marginTop: 20,
    marginLeft: 20,
  },
  imageWrapper: {
    textAlign: "center",
    position: "relative",
    marginBottom: "-25px",
  },

  profileImage: {
    width: 150,
    height: 150,
    objectFit: "cover",
    maxWidth: "100%",
    borderRadius: "50%",
  },
  profileDetails: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50px",
  },

  bioDetails: {
    display: "flex",
    justifyItems: "center",
    paddingTop: "10px",
    color: "black",
  },

  line: {
    border: "none",
    margin: "0 0 10px 0",
  },
  buttons: {
    textAlign: "center",
    margin: "20px 10px",
  },
  text: {
    paddingLeft: 15,
  },
  details: {
    display: "flex",
    marginTop: "10px",
  },
  notLoggedIn: {
    padding: 20,
    marginTop: 180,
    width: "70%",
    margin: "0 auto",
  },
});

const Profile = ({ classes }) => {
  const dispatch = useDispatch();
  const { user, authenticated } = useSelector(mapState);
  console.log(user);
  const {
    credentials: { handle, createdAt, imageUrl, bio, website, location },
    loading,
  } = user;

  const handleImageInput = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    dispatch(uploadImage(formData));
  };

  const handleEditImage = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  let profileMarkup = !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className={classes.imageWrapper}>
            <img
              src={imageUrl}
              alt="profile"
              className={classes.profileImage}
            />
            <input
              type="file"
              id="imageInput"
              onChange={handleImageInput}
              hidden="hidden"
            />
          </div>

          <hr className={classes.line} />
          <div className={classes.profileDetails}>
            <MuiLink
              component={Link}
              to={`/users/${handle}`}
              color="secondary"
              variant="h5"
            >
              @{handle}
            </MuiLink>
            <hr className={classes.line} />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr className={classes.line} />
            {location && (
              <div className={classes.bioDetails}>
                <LocationOn color="primary" />{" "}
                <span className={classes.text}> {location} </span>
                <hr className={classes.line} />
              </div>
            )}
            {website && (
              <div className={classes.bioDetails}>
                <LinkIcon color="primary" />
                <span className={classes.text}>{website}</span>
                <hr className={classes.line} />
              </div>
            )}
            <div className={classes.bioDetails}>
              <CalendarToday color="primary" />{" "}
              <span className={classes.text}>
                Joined {dayjs(createdAt).format("MMM YYYY")}
              </span>
            </div>
            <div className={classes.details}>
              <Tooltip title="Edit Profile Picture" placement="top">
                <IconButton
                  onClick={handleEditImage}
                  className={classes.button}
                >
                  <Edit color="primary" />
                </IconButton>
              </Tooltip>
              <EditDetails />
            </div>
          </div>
        </div>
      </Paper>
    ) : (
      <Paper className={classes.notLoggedIn}>
        <Typography variant="body2" align="center">
          No profile found, please login again
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/login"
          >
            Sign Up
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <p>Loading...</p>
  );

  return profileMarkup;
};

export default withStyles(styles)(Profile);
