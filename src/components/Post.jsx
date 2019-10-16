import React, { useState } from "react";
import AddCommentForm from "./AddCommentForm";
import Comment from "./Comment";

export default function Post(props) {
  let [likes, setLikes] = useState(0);
  function updateLikes() {
    setLikes(likes + 1);
  }
  return (
    <article className="post">
      <h2>{props.author}</h2>
      <p>{props.message}</p>
      <button>{props.likes} likes</button>
      <AddCommentForm />
      <ol>
        {props.comments.map(comment => {
          return (
            <Comment
              key={comment._id}
              author={comment.author}
              comment={comment.comment}
            />
          );
        })}
      </ol>
    </article>
  );
}
