import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WelcomeSurvey from "./pages/WelcomeSurvey";
import Welcome from "./pages/welcome";
import ErrorPage from "./pages/error";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:survey",
    element: <WelcomeSurvey />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
