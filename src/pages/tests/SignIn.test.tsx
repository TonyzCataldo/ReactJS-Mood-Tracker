/// <reference types="vitest" />
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // para simular interação
import SignIn from "../SignIn";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";

describe("SignIn component", () => {
  test("should render SignIn component ", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  test("should type email and password", async () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText(/email address/i);
    const senhaInput = screen.getByLabelText(/password/i);

    await userEvent.type(emailInput, "exemplo@email.com");
    await userEvent.type(senhaInput, "123456");

    expect(emailInput).toHaveValue("exemplo@email.com");
    expect(senhaInput).toHaveValue("123456");
  });

  test("should show error for invalid email", async () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText(/email address/i);
    const senhaInput = screen.getByLabelText(/password/i);
    const button = screen.getByRole("button", { name: /log in/i });

    await userEvent.type(emailInput, "emailerrado");
    await userEvent.type(senhaInput, "123456");
    await userEvent.click(button);

    expect(
      await screen.findByText(/please enter a valid email address/i)
    ).toBeInTheDocument();
  });
});
