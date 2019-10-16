import React from "react";
import AddPostForm from "./AddPostForm";
import Post from "./Post";
export default function Feed(props) {
  return (
    <section>
      FEED
      {props.loggedIn && (
        <AddPostForm
          loggedIn={props.loggedIn}
          onPostAdded={props.onPostAdded}
        />
      )}
      {props.posts.map(item => {
        return (
          <Post
            loggedIn={props.loggedIn}
            key={item._id}
            comments={item.comments}
            likes={item.likes}
            message={item.message}
            author={item.author}
          />
        );
      })}
    </section>
  );
}
