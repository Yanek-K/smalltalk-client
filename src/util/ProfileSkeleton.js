import React from "react";
import noImage from "../images/noImage.png";

//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";

//Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const styles = (theme) => ({
  ...theme.spreadThis,
  imageWrapper: {
    marginBottom: 0,
    textAlign: "center",
  },
  handle: {
    height: 20,
    backgroundColor: theme.palette.primary.main,
    width: 60,
    margin: "20px auto 7px auto",
  },
  fullLine: {
    height: 15,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    width: "70%",
    margin: "20px auto 10px",
  },
  halfLine: {
    height: 15,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    width: "50%",
    margin: "20px auto 10px",
  },
  line: {
    border: "none",
    margin: "0 0 10px 0",
  },
});

const ProfileSkeleton = ({ classes }) => {
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className={classes.imageWrapper}>
          <img src={noImage} alt="profile" className={classes.profileImage} />
        </div>
        <hr className={classes.line} />
        <div className="profileDetails">
          <div className={classes.handle} />
          <div className={classes.fullLine} />
          <div className={classes.fullLine} />
          <div className={classes.halfLine} />
        </div>
      </div>
    </Paper>
  );
};

export default withStyles(styles)(ProfileSkeleton);
