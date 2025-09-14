import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe("Button Component", () => {
  test("applies primary variant by default", () => {
    render(<Button>Test Button</Button>);
    const buttonElement = screen.getByText(/test button/i);
    expect(buttonElement).toHaveClass("bg-blue-600");
    expect(buttonElement).toHaveClass("text-white");
  });

  test("applies secondary variant", () => {
    render(<Button variant="secondary">Test Button</Button>);
    const buttonElement = screen.getByText(/test button/i);
    expect(buttonElement).toHaveClass("bg-gray-200");
    expect(buttonElement).toHaveClass("text-gray-800");
  });

  test("shows loading state", () => {
    render(<Button loading={true}>Test Button</Button>);
    const buttonElement = screen.getByText(/loading.../i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toBeDisabled();
  });

  test("is disabled when loading", () => {
    render(<Button loading={true}>Test Button</Button>);
    const buttonElement = screen.getByText(/loading.../i);
    expect(buttonElement).toBeDisabled();
  });

  test("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const buttonElement = screen.getByText(/click me/i);
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("does not call onClick when disabled", () => {
    const handleClick = jest.fn();
    render(
      <Button disabled onClick={handleClick}>
        Click me
      </Button>
    );

    const buttonElement = screen.getByText(/click me/i);
    fireEvent.click(buttonElement);

    expect(handleClick).not.toHaveBeenCalled();
  });
});
