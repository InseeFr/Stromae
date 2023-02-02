import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./components/auth";
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
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
