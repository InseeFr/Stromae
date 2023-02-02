import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WelcomeSurvey from "./pages/WelcomeSurvey";
import Welcome from "./pages/welcome";
import ErrorPage from "./pages/error";
 import { AuthProvider } from "./components/auth";


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
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
