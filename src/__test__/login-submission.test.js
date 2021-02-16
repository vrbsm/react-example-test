import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { LoginSubmission } from "../components";
const errorRequired = "Password required";
const server = setupServer(
  rest.post("https://reqres.in/api/login", async (req, res, ctx) => {
    if (!req.body.password) {
      return res(ctx.status(404), ctx.json({ message: errorRequired }));
    }
    return res(ctx.json({ token: req.body.email }));
  })
);
beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

test("login-submission and display token", async () => {
  render(<LoginSubmission />);
  const username = "vrbsm";
  userEvent.type(screen.getByLabelText(/username/i), username);
  userEvent.type(screen.getByLabelText(/password/i), "123456");

  userEvent.click(screen.getByRole("button", { name: /submit/i }));
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading.../i));

  const welcomeLabel = screen.getByText(/welcome/i);
  expect(welcomeLabel).toBeInTheDocument();
  expect(welcomeLabel.textContent).toBe(`Welcome - ${username}`);
});
test("omitting the password results in an error", async () => {
  render(<LoginSubmission />);
  const username = "vrbsm";
  userEvent.type(screen.getByLabelText(/username/i), username);
  userEvent.type(screen.getByLabelText(/password/i), "");

  userEvent.click(screen.getByRole("button", { name: /submit/i }));
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading.../i));

  const errorLabel = screen.getByText(errorRequired);
  expect(errorLabel).toHaveTextContent("Password required");
});

test("unknown server error", async () => {
  server.use(
    rest.post("https://reqres.in/api/login", async (req, res, ctx) => {
      return res(
        ctx.status(500),
        ctx.json({ message: "sorry try again later" })
      );
    })
  );
  render(<LoginSubmission />);
  userEvent.click(screen.getByRole("button", { name: /submit/i }));
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading.../i));
  expect(screen.getByText(/sorry try again/i)).toHaveTextContent("sorry try again later");
});
