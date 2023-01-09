import { render, screen } from "@testing-library/react";
import PrivateRoute from "./PrivateRoute";

test("renders Route", () => {
  render(<PrivateRoute />);
  const route = screen.getByTestId("private-route");
  expect(route).toBeInTheDocument();
});
