import { Avatar, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { SideBarMenuStyle } from "./SideBarMenuStyle";
import { SidebarData } from "./SidebarData";
import Logo from "../../assets/images/general/parsegasht-logo.png";

import { useNavigate } from "react-router-dom";
function SidebarDesign() {
  const classes = SideBarMenuStyle();

  // const navigate = useNavigate();
  return (
    <div className={classes.root}>
      {/* Logo has disappeared untill new design */}
      <div className={classes.logoDiv}>
        <Avatar
          alt="Logo"
          src={Logo}
          variant="square"
          sx={{ width: "100px", height: "100px" }}
          className={classes.logoStyle}
        />
      </div>
      {SidebarData.map((item) => {
        return (
          <ListItem
            button
            key={item.key}
            // onClick={() => navigate(item.path)}
          >
            <ListItemIcon className={classes.iconStyle} key={item.key}>
              {item.icon}
            </ListItemIcon>
            <ListItemText className={classes.textMenuStyle}>
              {item.title}
            </ListItemText>
          </ListItem>
        );
      })}
    </div>
  );
}

export default SidebarDesign;
