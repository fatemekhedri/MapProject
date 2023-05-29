import { Box, Hidden, Paper, Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import React from "react";
import Reservation from "../reservation/Reservation";
import SidebarDesign from "./SidebarDesign";
import { SideBarMenuStyle } from "./SideBarMenuStyle";

function SideBarMenu({ isMobile, funcisMobile }) {
  const classes = SideBarMenuStyle();
  return (
    <>
      <nav className={classes.drawer}>
        <Drawer
          className={{ Paper: classes.drawerPaper }}
          variant="permanent"
          open
          anchor="right"
          PaperProps={{
            sx: {
              // direction: "rtl",
              color: "white",
              backgroundColor: "primary.main",
              height: "auto",
              borderRadius: "0 0 0 15px",
              boxShadow: 3,
              display: { xl: "block", md: "block", sm: "none", xs: "none" },
            },
          }}
        >
          <SidebarDesign />
        </Drawer>
        {/* <Drawer
          variant="permanent"
          open
          anchor="left"
          PaperProps={{
            sx: {
              backgroundColor: "primary.main",
              color: "white",
              boxShadow: 3,
              display: { xl: "block", md: "block", sm: "none", xs: "none" },
            },
          }}
          classes={{ paper: classes.drawerPaper }}
          onClick={funcisMobile}
        >
          <Box display="flex" flexDirection="row" justifyContent="center">
            <Reservation />
          </Box>
        </Drawer> */}
      </nav>
    </>
  );
}

export default SideBarMenu;
