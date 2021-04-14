import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//MUI
import Grid from "@material-ui/core/Grid";

//Redux
import { getPosts } from "../redux/actions/dataActions";

//Components
import PostaPost from "../components/Post/PostaPost";
import Post from "../components/Post/Post";
import Profile from "../components/Profile/Profile.js";
import PostSkeleton from "../util/PostSkeleton";

const mapState = (state) => ({
  authenticated: state.user.authenticated,
  data: state.data,
});

const Home = () => {
  const dispatch = useDispatch();
  const { authenticated, data } = useSelector(mapState);
  const { posts, loading } = data;

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div>
      {authenticated ? (
        <Grid container spacing={4}>
          <Grid item md={8} sm={12} xs={1}>
            <PostaPost />
          </Grid>
          <Grid item md={8} sm={12} xs={12}>
            {posts && !loading ? (
              posts.map((post) => <Post post={post} key={post.postId} />)
            ) : (
              <PostSkeleton />
            )}
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
