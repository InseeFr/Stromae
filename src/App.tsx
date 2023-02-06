import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Questionnaire from "./pages/questionnaire";
import Portail from "./pages/deconnexion";
import ErrorPage from "./pages/error";
import { AuthProvider } from "./components/auth";

const router = createBrowserRouter([
  {
    path: "/questionnaire/:survey/deconnexion",
    element: <Portail />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/questionnaire/:survey",
    element: <Questionnaire />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <ErrorPage />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
