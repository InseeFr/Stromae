import { render, screen } from "@testing-library/react";
import Header from "./Header";

test("renders Route", () => {
  render(<Header>Hello!</Header>);
  const route = screen.getByTestId("header");
  expect(route).toBeInTheDocument();
});
