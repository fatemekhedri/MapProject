// base styles
import colors from "../../base/colors";
import typography from "../../base/typography";

const { error } = colors;
const { size, fontWeightRegular } = typography;

const formHelperText = {
  styleOverrides: {
    root: {
      color: error.main,
      fontWeight: fontWeightRegular,
      fontSize: size.xs,
    },
  },
};

export default formHelperText;
