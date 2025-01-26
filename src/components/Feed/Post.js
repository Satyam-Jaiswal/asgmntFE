import React from "react";
import { Card } from "antd";
const { Meta } = Card;

const Post = ({ post }) => {
  return (
    <div className="post">
      <Card
        hoverable
        style={{
          width: 400,
          margin: "20px",
          alignContent: "center",
        }}
        cover={<img alt="image" src={post.imageUrl} />}
      >
        <Meta
          title={post.caption}
          description={`Posted By : ${post.user.username}`}
        />{" "}
      </Card>
    </div>
  );
};

export default Post;
