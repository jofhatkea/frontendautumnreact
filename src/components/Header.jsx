import React from "react";
import Profile from "./Profile";
export default function Header(props) {
  return (
    <header>
      HEADER:
      <Profile name={props.name} />
    </header>
  );
}
