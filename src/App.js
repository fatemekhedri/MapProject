import React from "react";
import router from "./pages/router";

import "./index.css";
import { CssBaseline } from "@mui/material";

// import ErrorPage from "./pages/notFound/error-page.jsx";
import { RouterProvider, Routes } from "react-router-dom";
// import {
//   createBrowserRouter,
//   Route,
//   Navigate,
//   Routes,
//   BrowserRouter,
// } from "react-router-dom";
// import profileRouteList from "../utility/consts/routes";
// import MainMap from "./MainMap.jsx";
// import ErrorPage from "./pages/notFound/error-page.jsx";
// import Page1 from "./pages/Page1/Page1";
// import PassengerManagement from "./pages/PassengerManagement/passengerManagement";
// import DriverManagement from "./pages/DriverManagement/driverManagement";
// import Layout from "./components/layout/Layout";
// import Dashboard from "./pages/dashboard";
// import SignIn from "./pages/authentication/sign-in";
// import SignUp from "./pages/authentication/sign-up";
// import PageLayout from "./components/LayoutContainers/PageLayout";
// import NotFound from "./pages/notFound/notFound";
// import NewTransaction from "./pages/FinanceManagement/newTransaction";
// import CarManagement from "./pages/CarManagement/carManagement";
// import { useSelector } from "react-redux";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
// import { DesignControllerProvider } from "./context/designControllerProvider";

// import { AuthProvider } from "./context/authProvider";
// import RequireAuth from "./pages/requireAuth";
// import useAuth from "./hooks/useAuth";

function App() {
  // const { auth } = useAuth();
  // const login = useSelector((state) => state.user) || false;
  // const isLogin = JSON.parse(localStorage.getItem("user"));
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  return (
    <React.Fragment>
      {/* <DesignControllerProvider> */}
        <CssBaseline />
        <CacheProvider value={cacheRtl}>
          {/* <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route errorElement={<ErrorPage />} path="/">
                <Route element={<RequireAuth />}>
                  <Route
                    path="dashboard"
                    errorElement={<ErrorPage />}
                    element={<Layout />}
                  >
                    <Route index element={<Dashboard />} />
                    <Route path="page1" element={<Page1 />} />
                    <Route
                      path="passengerManagement"
                      element={<PassengerManagement />}
                    />
                    <Route
                      path="driverManagement"
                      element={<DriverManagement />}
                    />
                    <Route path="newTransaction" element={<NewTransaction />} />
                    <Route path="carManagement" element={<CarManagement />} />
                  </Route>
                </Route>

                <Route
                  path="/"
                  element={
                    <Navigate
                      to={
                        sessionStorage.getItem("user")
                          ? "/dashboard"
                          : "/authentication/signin"
                      }
                      replace
                    />
                  }
                />

                <Route path="*" element={<NotFound />} />
                <Route
                  errorElement={<ErrorPage />}
                  path="authentication"
                  element={<PageLayout />}
                >
                  <Route path="signin" element={<SignIn />} />
                  <Route path="signup" element={<SignUp />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider> */}
          {/* <AuthProvider> */}
          <RouterProvider router={router} />
          {/* </AuthProvider> */}
        </CacheProvider>
      {/* </DesignControllerProvider> */}
    </React.Fragment>
  );
}

export default App;
