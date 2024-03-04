import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Pages/Auth/Login";
import Dashboard from "../Pages/Admin/Dashboard";
import Home from '../Pages/User/Home';
import Cars from "../Pages/User/Cars";
import Yachts from "../Pages/User/Yachts";
import RentalDetail from "../Pages/User/RentalDetail";
import Ticket from "../Pages/User/Ticket";
import Reservations from "../Pages/Admin/Reservations";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      { path: "/login", element: <Login/> },
      { path: "/dashboard", element: <Dashboard/>},
      { path: "/dashboard/reservations", element: <Reservations/>},
      { path: "/", element: <Home/>},
      { path: "/cars", element: <Cars/>},
      { path: "/yachts", element: <Yachts/>},
      { path: "/tickets", element: <Ticket/>},
      { path: "/car/:id", element: <RentalDetail/>},
      { path: "/yacht/:id", element: <RentalDetail/>}
    ],
  },
])  
