import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import router from "./router";
import { useGlobal } from "./stores/global";

function App() {
  const { fetchMe } = useGlobal();

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  return <RouterProvider router={router} />;
}

export default App;
