import type { FC } from "react"
import Main from "../pages/Main"
import { useRoutes } from "react-router-dom";
import ChatRoom from "../pages/ChatRoom";
import NewContact from "../pages/NewContact";
import MyContact from "../pages/MyContact";
import Welcome from "../pages/Welcome";
import Register from "../pages/Register";
import UpdateProfile from "../pages/UpdateProfile";
import ProtectedRoute from "./ProtectedRoute";

const Router: FC = () => {
    let element = [
        {
            path: '/',
            element: <Welcome />
        },
        {
            path: '/register',
            element: <Register />
        },
        {
            path: '/update-profile',
            element: <UpdateProfile />
        },
        {
            path: '/main',
            element: <ProtectedRoute><Main /></ProtectedRoute>
        },
        {
            path: '/chat',
            element: <ChatRoom />
        },
        {
            path: '/my-contact',
            element: <MyContact />
        },
        {
            path: '/new-contact',
            element: <NewContact />
        }
    ];

    let routes = useRoutes(element);

    return routes;
}

export default Router