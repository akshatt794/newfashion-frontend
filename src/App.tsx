// src/App.tsx
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Cart,
  Checkout,
  HomeLayout,
  Landing,    // make sure you import Landing here
  Login,
  Register,
  Search,
  Shop,
  SingleProduct,
  OrderConfirmation,
  OrderHistory,
  SingleOrderHistory,
  UserProfile,
  AdminPanel,
} from "./pages";
import { checkoutAction, searchAction } from "./actions";
import { shopCategoryLoader } from "./pages/Shop";
import { loader as orderHistoryLoader } from "./pages/OrderHistory";
import { loader as singleOrderLoader } from "./pages/SingleOrderHistory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,   // <Landing /> is your home/landing
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "shop/:category",
        element: <Shop />,
        loader: shopCategoryLoader,
      },
      {
        path: "product/:id",
        element: <SingleProduct />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
        action: checkoutAction,
      },
      {
        path: "search",
        element: <Search />,
        action: searchAction,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "order-confirmation",
        element: <OrderConfirmation />,
      },
      {
        path: "order-history",
        element: <OrderHistory />,
        loader: orderHistoryLoader,
      },
      {
        path: "order-history/:id",
        element: <SingleOrderHistory />,
        loader: singleOrderLoader,
      },
      {
        path: "user-profile",
        element: <UserProfile />,
      },
      {
        path: "admin",
        element: <AdminPanel />,
      },
      
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
