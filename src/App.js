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
function AddPostForm(props) {
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  /*function onAuthorChange(e){

  }*/
  const onAuthorChange = e => {
    setAuthor(e.target.value);
  };
  const onMessageChange = e => {
    setMessage(e.target.value);
  };
  const onSubmit = e => {
    e.preventDefault();

    const baseURL = "https://frontendautmn2019-5ad1.restdb.io/rest/";
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d887443fd86cb75861e25ee",
      "cache-control": "no-cache"
    };
    fetch(baseURL + "posts", {
      method: "post",
      headers: headers,
      body: JSON.stringify({
        author: author,
        message: message,
        likes: 0
      })
    })
      .then(e => e.json())
      .then(data => {
        props.onPostAdded(data);
        //console.log(e);
      });
  };
  return (
    <form onSubmit={onSubmit}>
      <h2>AddPostForm</h2>
      <label>
        <input
          type="text"
          name="author"
          value={author}
          onChange={onAuthorChange}
        />
      </label>
      <textarea value={message} onChange={onMessageChange}></textarea>
      <input type="submit" value="Say what you think" />
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
      <AddPostForm onPostAdded={props.onPostAdded} />
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

  /*function addPost() {
    const copy = posts.concat({
      message: "very strange",
      author: "everybody"
    });
    setPosts(copy);
  }*/
  function addNewPost(data) {
    console.log(data);
    data.comments = [];
    const copy = posts.concat(data);
    setPosts(copy);
  }
  return (
    <div className="App">
      <Header name={name} />
      <Feed onPostAdded={addNewPost} posts={posts} />
      <Footer name={name} />
    </div>
  );
}

export default App;
