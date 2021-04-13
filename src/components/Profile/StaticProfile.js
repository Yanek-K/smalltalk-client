import React from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

//MUI
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

//MUI ICONS
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const styles = (theme) => ({
  ...theme.spreadThis,
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
