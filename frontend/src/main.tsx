import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import AproposPage from "./pages/AproposPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import PrestationPage from "./pages/PrestationPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";

const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <HomePage />
            },
            {
                path:"/a-propos",
                element: <AproposPage/>
            },
            {
                path:"/contact",
                element: <ContactPage/>
            },
            {
                path:"/prestations",
                element: <PrestationPage/>
            },
            {
                path:"/admin",
                element: <AdminPage/>
            }
        ]
    }
])

const rootReactContainer = createRoot(
    document.querySelector("#root") as HTMLElement,
);

rootReactContainer.render(
    <RouterProvider router={router} />
);