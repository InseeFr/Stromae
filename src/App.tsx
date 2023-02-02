import { createBrowserRouter, RouterProvider } from "react-router-dom";
<<<<<<< HEAD
import WelcomeSurvey from "./pages/WelcomeSurvey";
=======
import * as lunatic from "@inseefr/lunatic";
>>>>>>> 0ada76658751ed6b705602751e5610ec218218a6
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
