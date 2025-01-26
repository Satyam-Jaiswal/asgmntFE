import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";
import { fetchData } from "../../api/api";
import CreatePost from "./Createpost";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData("api/feed").then((result) => {
      if (result.success !== false) {
        console.log(result);
        setPosts(result.body);
      }
    });
  }, [loading]);

  return (
    <div className="feed">
      <h2>User Feed</h2>
      <CreatePost setLoading={setLoading} />

      {posts
        .slice(0)
        .reverse()
        .map((post) => (
          <Post key={post._id} post={post} />
        ))}
    </div>
  );
};

export default Feed;
