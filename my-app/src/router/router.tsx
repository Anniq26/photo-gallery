import { RouteObject } from "react-router-dom";
import Layout from "../Layout/Layout";
import MainPage from "../Pages/MainPage";
import HistoryPage from "../Pages/HistoryPage";

const routes:RouteObject[] = [
    {
        element: <Layout />,
        path: '/',
        children: [
            {
                element: <MainPage />,
                index: true
            },
            {
                element: <HistoryPage />,
                path: '/history'
            }
        ]
    }
]

export default routes