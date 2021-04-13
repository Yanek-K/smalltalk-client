import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

//Redux
import { getUserData } from "../redux/actions/dataActions";

//MUI
import Grid from "@material-ui/core/Grid";

//Components
import Post from "../components/Post/Post";
import StaticProfile from "../components/Profile/StaticProfile";

const mapState = (state) => ({
  data: state.data,
});

const User = () => {
  const {
    data: { posts, loading },
  } = useSelector(mapState);
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  const [postIdParam, setPostIdParam] = useState(null);
  const { handle } = useParams();
  const { postId } = useParams();

  useEffect(() => {
    if (postId) {
      setPostIdParam(postId);
    }
  }, [postId]);

  useEffect(() => {
    dispatch(getUserData(handle));
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        setProfile(res.data.user);
      })
      .catch((err) => console.log(err));
  }, [dispatch, handle]);

  const postsMarkup = loading ? (
    <p>Loading Data...</p>
  ) : posts === null ? (
    <p>No posts from this user</p>
  ) : !postIdParam ? (
    posts.map((post) => <Post key={post.postId} post={post} />)
  ) : (
    posts.map((post) => {
      if (post.postId !== postIdParam)
        return <Post key={post.postId} post={post} />;
      else return <Post key={post.postId} post={post} openDialog />;
    })
  );

  return (
    <Grid container spacing={16}>
      <Grid item md={8} sm={12} xs={12}>
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
