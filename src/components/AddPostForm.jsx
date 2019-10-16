import React, { useState } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
export default function AddPostForm(props) {
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  /*function onAuthorChange(e){
  
    }*/
  const onMessageChange = e => {
    setMessage(e.target.value);
  };
  const onSubmit = e => {
    e.preventDefault();
    setDisabled(true);
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
        author: props.loggedIn.name,
        message: message,
        likes: 0
      })
    })
      .then(e => e.json())
      .then(data => {
        props.onPostAdded(data);
        setMessage("");
        setDisabled(false);
        //console.log(e);
      });
  };
  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr"
      }}
    >
      <h2>AddPostForm</h2>

      <textarea value={message} onChange={onMessageChange}></textarea>
      <PacmanLoader
        sizeUnit={"px"}
        size={30}
        color={"hotpink"}
        loading={disabled}
      />
      {!disabled && (
        <input type="submit" disabled={disabled} value="Say what you think" />
      )}
    </form>
  );
}
