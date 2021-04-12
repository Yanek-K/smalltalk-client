import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import StaticProfile from "../components/Profile/StaticProfile";

import axios from "axios";
import Post from "../components/Post/Post";

import Grid from "@material-ui/core/Grid";
import { getUserData } from "../redux/actions/dataActions";

const mapState = (state) => ({
  data: state.data,
});

const User = ({}) => {
  const {
    data,
    data: { posts, loading },
  } = useSelector(mapState);
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  const { handle } = useParams();

  useEffect(() => {
    dispatch(getUserData(handle));
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        setProfile(res.data.user);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(profile);

  const postsMarkup = loading ? (
    <p>Loading Data...</p>
  ) : posts === null ? (
    <p>No posts from this user</p>
  ) : (
    posts.map((post) => <Post key={post.postId} post={post} />)
  );

  return (
    <Grid container spacing={16}>
      <Grid item md={8} sm={12} xs={1}>
        {postsMarkup}
      </Grid>
      <Grid item md={4} sm={12} xs={12}>
        {profile === null ? (
          <p>Loading Data...</p>
        ) : (
          <StaticProfile profile={profile} />
        )}
      </Grid>
    </Grid>
  );
};

export default User;
