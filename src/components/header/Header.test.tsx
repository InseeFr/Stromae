import { render, screen } from "@testing-library/react";
import Header from "./Header";

test("renders Route", () => {
  render(<Header />);
  const route = screen.getByTestId("fr-header");
  expect(route).toBeInTheDocument();
});
