import React, { useState } from "react";
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
      <button onClick={updateLikes}>Like {likes}</button>
      <AddCommentForm />
      <Comment />
      <Comment />
      <Comment />
    </article>
  );
}
function AddPostForm() {
  return (
    <form>
      <textarea>AddPostForm</textarea>
    </form>
  );
}
function Comment() {
  return <div>COMMENT</div>;
}
function AddCommentForm() {
  return (
    <form>
      <textarea>AddCommentForm</textarea>
    </form>
  );
}
function Feed(props) {
  return (
    <section>
      FEED
      <AddPostForm />
      {props.posts.map(item => {
        return <Post message={item.message} author={item.author} />;
      })}
    </section>
  );
}
function App() {
  const name = "Jonas"; // pass this to <Profile /> and <Footer />
  const [posts, setPosts] = useState([
    {
      message: "very cool",
      author: "Jonas"
    }
  ]);

  function addPost() {
    const copy = posts.concat({
      message: "very strange",
      author: "everybody"
    });
    setPosts(copy);
  }
  return (
    <div className="App">
      <button onClick={addPost}>Add post</button>
      <Header name={name} />
      <Feed posts={posts} />
      <Footer name={name} />
    </div>
  );
}

export default App;
