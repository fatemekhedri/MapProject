import {
  createBrowserRouter,
  Route,
  Navigate,
  createRoutesFromElements,
} from "react-router-dom";

import ErrorPage from "./notFound/error-page.jsx";

import BookingLayout from "../components/LayoutContainers/bookingLayout.jsx";
import NotFound from "./notFound/notFound.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />} path="/">
      <Route
        path="booking"
        errorElement={<ErrorPage />}
        element={<BookingLayout />}
      />
      
      {/* redirect root to booking */}
      <Route path="/" element={<Navigate to={"/booking"} replace />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
export default router;
