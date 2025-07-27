import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "../components/private/PrivateRoute";
import MyProfile from "../pages/dashboard/user/MyProfile";
import AddPost from "../pages/dashboard/user/AddPost";
import Membership from "../pages/membership/Membership";

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
            },
            {
                path: 'membership',
                element: <PrivateRoute><Membership></Membership></PrivateRoute>
            }
        ]
    },
    {
        path: '/',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        // loader: ({params})=>fetch(`http://localhost:5000/user?email=${params.id}`),
        children: [
            {
              path: 'myProfile',
              element: <MyProfile></MyProfile>  
            },
            {
              path: 'addPost',
              element: <AddPost></AddPost>  
            },
        ]
    }
]);