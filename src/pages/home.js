import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

import { useSelector } from "react-redux";
import Post from "../components/Post";
import Profile from "../components/Profile";

const mapState = (state) => ({
  authenticated: state.user.authenticated,
});

const Home = () => {
  const { authenticated } = useSelector(mapState);
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    axios
      .get("/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  let recentPostsMarkup = posts ? (
    posts.map((post) => <Post post={post} key={post.postId} />)
  ) : (
    <p>Loading...</p>
  );

  return (
    <div>
      {authenticated ? (
        <Grid container spacing={3}>
          <Grid item sm={8} xs={12}>
            <p>Post to the conversation!</p>
          </Grid>
          <Grid item sm={8} xs={12}>
            {recentPostsMarkup}
          </Grid>
          <Grid item sm={4} xs={12}>
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
