import { createBrowserRouter, RouterProvider } from "react-router-dom";
import * as lunatic from "@inseefr/lunatic";
import Welcome from "./pages/welcome";
import ErrorPage from "./pages/error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
    children: [{ path: "/:survey", element: <Welcome /> }],
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
