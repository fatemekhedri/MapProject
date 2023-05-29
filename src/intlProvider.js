// ConnectedIntlProvider.js
import App from "./App";
import { connect } from "react-redux";
import React, { Component } from "react";
// Localization
import { changeLanguage } from "./actions/language";
import en from "./i18n/en";
import fa from "./i18n/fa";
import { addLocaleData, IntlProvider } from "react-intl";
//Theme
import theme from "./assets/theme";
// import themeRTL from "./assets/theme/theme-rtl";
import IRANSansWeb from "./assets/fonts/IRANSansWeb.woff2";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Dialog } from "@mui/material";

// addLocaleData([...en, ...fa]);

class ConnectedIntlProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    this.props.changeLanguage(this.props.language);
  };
  render() {
    // const theme = createTheme({
    //   direction: "rtl",
    //   typography: {
    //     fontFamily: this.props.language === "fa" ? "IRANSansWeb" : "Roboto",
    //     fontSize: 12,
    //     d1: {
    //       fontSize: "3.815rem",
    //       fontWeight: "700",
    //       letterSpacing: "-0.09375rem",
    //       lineHeight: "1.5rem",
    //     },
    //     h1: {
    //       fontSize: "3.052rem",
    //       fontWeight: "700",
    //       letterSpacing: "-0.0625rem",
    //       lineHeight: "1.6rem",
    //     },
    //     h2: {
    //       fontSize: "2.441rem",
    //       fontWeight: "700",
    //       letterSpacing: "-0.03125rem",
    //       lineHeight: "1.6rem",
    //     },
    //     h3: {
    //       fontSize: "1.953rem",
    //       fontWeight: "700",
    //       letterSpacing: "0rem",
    //       lineHeight: "1.6rem",
    //     },
    //     h4: {
    //       fontSize: "1.563rem",
    //       fontWeight: "700",
    //       letterSpacing: "0.03125rem",
    //       lineHeight: "1.6rem",
    //     },
    //     h5: {
    //       fontSize: "1.25rem",
    //       fontWeight: "700",
    //       letterSpacing: "0rem",
    //       lineHeight: "1.6rem",
    //     },
    //     h6: {
    //       fontSize: "1.125rem",
    //       fontWeight: "700",
    //       letterSpacing: "0rem",
    //       lineHeight: "1.6rem",
    //     },
    //     Paragraph: {
    //       fontSize: "1rem",
    //       fontWeight: "400",
    //       letterSpacing: "0rem",
    //       lineHeight: "2.4rem",
    //     },
    //   },
    //   components: {
    //     MuiCssBaseline: {
    //       styleOverrides: `
    //         @font-face {
    //           font-family: 'IRANSansWeb';
    //           font-style: normal;
    //           font-display: swap;
    //           font-weight: 400;
    //           src: local('IRANSansWeb'), local('IRANSansWeb-Regular'), url(${IRANSansWeb}) format('woff2');
    //           unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
    //         }
    //       `,
    //     },
    //   },
    //   palette: {
    //     primary: { main: "#A6BB8D" },
    //     secondary: { main: "#bac0e4" },
    //     color: { backGround: "#fafafa", edges: "#e9e9e9" },
    //   },

    //   spacing: (factor) => `${0.25 * factor}rem`, //Bootstrap Strategy
    // });

    return (
      <IntlProvider
        locale={this.props.language}
        key={this.props.language}
        messages={this.props.messages}
        defaultLocale={"fa"}
      >
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </IntlProvider>
    );
  }
}

function mapStateToProps(state) {
  const { name: language, messages, direction } = state.language;
  return { language, messages, direction };
}
export default connect(mapStateToProps, { changeLanguage })(
  ConnectedIntlProvider
);
