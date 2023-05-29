import makeStyles from "@mui/styles/makeStyles";

export const SideBarMenuStyle = makeStyles((theme) => ({
  root: {
    "& .css-19llfue-MuiTypography-root": {
      color: "#183a1d",
    },
    "& .css-cveggr-MuiListItemIcon-root": {
      color: "#183a1d",
      display: "contents",
    },
    "& .css-tlelie-MuiListItemText-root": {
      marginBottom: 0,
      marginInlineStart: theme.spacing(1),
      display: "flex",
      justifyContent: "start",
    },
    marginBottom: theme.spacing(3),
  },
  drawer: {
    [theme.breakpoints.up("md")]: { width: "220px" },
  },
  drawerPaper: {
    // direction: "rtl",
    width: "450px",
    display: "flex",
  },
  logoStyle: {
    width: theme.spacing(16),
    height: theme.spacing(12),
  },
  iconStyle: {
    color: "white",
  },
  textMenuStyle: { color: "#183a1d" },
  logoDiv: {
    display: "flex",
    justifyContent: "center",
    borderBottom: "1px solid #adb5aa",
    padding: theme.spacing(1),
  },
}));
