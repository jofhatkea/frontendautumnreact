import React from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import Profile from "./Profile";
export default function Header(props) {
  return (
    <header>
      {!props.loggedIn && (
        <GoogleLogin
          clientId="570859941884-347k7phitr5g4vdcb06rge5dupv87gig.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={props.onLogin}
          onFailure={props.onFailure}
          cookiePolicy={"single_host_origin"}
        />
      )}
      {props.loggedIn && (
        <GoogleLogout
          clientId="570859941884-347k7phitr5g4vdcb06rge5dupv87gig.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={props.onLogOut}
        ></GoogleLogout>
      )}
      <Profile loggedIn={props.loggedIn} />
    </header>
  );
}
