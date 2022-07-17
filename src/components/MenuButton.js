import { Menu } from "@mui/icons-material";
import React from "react";
import "../App.css";

function MenuButton({display=true}) {

    const handleMenuClick = () => {
        const menu = document.querySelector(".sidebar");
        if (menu.classList.contains("none-display")) {
          menu.classList.remove("none-display");
        } else menu.classList.add("none-display");
      };

  return (
    <div className={"chatHeader__leftMenuBtn"} onClick={handleMenuClick}>
      <Menu />
    </div>
  );
}

export default MenuButton;
