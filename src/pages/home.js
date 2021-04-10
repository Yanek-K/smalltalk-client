import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import Profile from "../components/Profile";

import { getPosts } from "../redux/actions/dataActions";
import PostaPost from "../components/PostaPost";
import BurgerMenu from "../components/BurgerMenu";

const mapState = (state) => ({
  authenticated: state.user.authenticated,
  data: state.data,
});

const Home = () => {
  const dispatch = useDispatch();
  const { authenticated, data } = useSelector(mapState);
  const { posts } = data;

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  let recentPostsMarkup = posts ? (
    posts.map((post) => <Post post={post} key={post.postId} />)
  ) : (
    <p>Loading...</p>
  );

  return (
    <div>
      {authenticated ? (
        <Grid container spacing={4}>
          <Grid item md={8} sm={12} xs={1}>
            <PostaPost />
          </Grid>
          <Grid item xs={11}>
            <BurgerMenu />
          </Grid>
          <Grid item md={8} sm={12} xs={12}>
            {recentPostsMarkup}
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <Profile />
          </Grid>
        </Grid>
      ) : (
        <Profile />
      )}
    </div>
  );
};

export default Home;
