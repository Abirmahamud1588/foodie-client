import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu";
import Signup from "../components/shared/Signup";
import PrivateRouter from "../components/PrivateRouter/PrivateRouter";
import Upprofile from "../Dashboard/Upprofile";
import CartPage from "../pages/CartPage";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard/Admin/Dashboard";
import Users from "../pages/Dashboard/Admin/Users";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: (
          <PrivateRouter>
            <Menu />
          </PrivateRouter>
        ),
      },
      {
        path: "/cart-page",
        element: (
          <PrivateRouter>
            <CartPage />
          </PrivateRouter>
        ),
      },
      {
        path: "/update-profile",
        element: <Upprofile />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "dashboard",
    element: (
      <PrivateRouter>
        <DashboardLayout />
      </PrivateRouter>
    ),
    children: [
      { path: "", element: <Dashboard /> },
      {
        path: "users",
        element: <Users></Users>,
      },
    ],
  },
]);

export default router;
