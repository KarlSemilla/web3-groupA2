import React from "react";
import HeaderBar from "./HeaderBar.js";
import HeaderMenu from "./HeaderMenu.js";

const HeaderApp = function(props) {
  return (
    <header className="header">
      <HeaderBar />
      <HeaderMenu
        loadFavsFromDb={props.loadFavsFromDb}
        getCurrUserID={props.getCurrUserID}
      />
    </header>
  );
};
export default HeaderApp;
