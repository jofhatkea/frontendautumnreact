import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
function Header(props) {
  return (
    <header>
      HEADER:
      <Profile name={props.name} />
    </header>
  );
}
function Profile(props) {
  return <h2>Hello {props.name}</h2>;
}
function Footer(props) {
  return <footer>FOOTER: signed in as {props.name}</footer>;
}

function Post(props) {
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
function AddPostForm() {
  return (
    <form>
      <h2>AddPostForm</h2>
      <textarea></textarea>
    </form>
  );
}
function Comment(props) {
  return (
    <li>
      {props.author} said {props.comment}
    </li>
  );
}
function AddCommentForm() {
  return (
    <form>
      <h2>AddCommentForm</h2>
      <textarea></textarea>
    </form>
  );
}
function Feed(props) {
  return (
    <section>
      FEED
      <AddPostForm />
      {props.posts.map(item => {
        return (
          <Post
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
function App() {
  const name = "Jonas"; // pass this to <Profile /> and <Footer />

  const [posts, setPosts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const baseURL = "https://frontendautmn2019-5ad1.restdb.io/rest/";
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d887443fd86cb75861e25ee",
      "cache-control": "no-cache"
    };
    fetch(baseURL + "posts?fetchchildren=true", {
      method: "get",
      headers: headers
    })
      .then(e => e.json())
      .then(e => setPosts(e));
  }, []);

  function addPost() {
    const copy = posts.concat({
      message: "very strange",
      author: "everybody"
    });
    setPosts(copy);
  }
  return (
    <div className="App">
      {loggedIn && <button onClick={addPost}>Add post</button>}
      <Header name={name} />
      <Feed posts={posts} />
      <Footer name={name} />
    </div>
  );
}

export default App;
