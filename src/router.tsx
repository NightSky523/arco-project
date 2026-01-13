import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./layout/main-layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        handle: { title: "首页" },
      },
      {
        path: "contact",
        element: <Contact />,
        handle: { title: "联系" },
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
