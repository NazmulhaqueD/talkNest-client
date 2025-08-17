import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "../components/private/PrivateRoute";
import AddPost from "../pages/dashboard/user/AddPost";
import Membership from "../pages/membership/Membership";
import PostDetails from "../pages/postDetails/PostDetails";
import MyPosts from "../pages/dashboard/user/MyPosts";
import CommentPage from "../pages/dashboard/user/CommentsPage";
import Profile from "../pages/profile/Profile";
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import ReportedComments from "../pages/dashboard/admin/ReportedComments";
import MakeAnnouncement from "../pages/dashboard/admin/MakeAnnouncement";
import ShowAnnouncements from "../components/announcement/ShowAnnouncemnet";
import ErrorPage from "../pages/error/ErrorPage";
import ContactUs from "../pages/ContactUs/ContactUs";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>
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
            },
            {
                path: 'post/:_id',
                element: <PostDetails></PostDetails>
            },
            {
                path: 'announcement',
                element: <ShowAnnouncements></ShowAnnouncements>
            },
            {
                path: 'contactUs',
                element: <ContactUs></ContactUs>
            }

        ]
    },
    {
        path: '/',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: 'profile',
                element: <Profile></Profile>
            },
            {
                path: 'addPost',
                element: <AddPost></AddPost>
            },
            {
                path: 'myPosts',
                element: <MyPosts></MyPosts>
            },
            {
                path: 'comments/:postId',
                element: <CommentPage></CommentPage>
            },
            {
                path: 'manageUsers',
                element: <ManageUsers></ManageUsers>
            },
            {
                path: 'reportedComments',
                element: <ReportedComments></ReportedComments>
            },
            {
                path: 'announcement',
                element: <MakeAnnouncement></MakeAnnouncement>
            }
        ]
    },
    {
        path: '/*',
        element: <ErrorPage></ErrorPage>
    }

]);