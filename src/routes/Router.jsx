import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "../components/private/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                index: true,
                element:<Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            }
        ]
    },
    {
        path: 'dashBoard/:id',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        loader: ({params})=>fetch(`http://localhost:5000/user?email=${params.id}`)
    }
]);