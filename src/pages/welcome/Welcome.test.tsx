import { render, screen } from "@testing-library/react";
import Welcome from "./Welcome";

test("renders Route", () => {
  render(<Welcome />);
  const route = screen.getByTestId("welcome");
  expect(route).toBeInTheDocument();
});
