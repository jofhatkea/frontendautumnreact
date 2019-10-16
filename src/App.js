import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Feed from "./components/Feed.jsx";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
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
