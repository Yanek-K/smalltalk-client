import React, { Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

//MUI
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

//MUI ICONS
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

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

  text: {
    paddingLeft: 15,
  },
  details: {
    display: "flex",
    marginTop: "10px",
  },
});

const StaticProfile = ({ profile, classes }) => {
  const { handle, createdAt, imageUrl, bio, website, location } = profile;
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className={classes.imageWrapper}>
          <img src={imageUrl} alt="profile" className={classes.profileImage} />
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
        </div>
      </div>
    </Paper>
  );
};

export default withStyles(styles)(StaticProfile);
