import React from "react";
export default function Profile(props) {
  console.log(props.loggedIn);
  if (props.loggedIn) {
    return (
      <section>
        <h2>Hello {props.loggedIn.givenName}, good to see you</h2>
        <img
          style={{ borderRadius: "50%" }}
          src={props.loggedIn.imageUrl}
          alt={props.loggedIn.name}
        />
      </section>
    );
  }
  return "";
}
