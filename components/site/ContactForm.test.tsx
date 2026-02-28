import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ContactForm } from "./ContactForm";

describe("ContactForm", () => {
  test("shows inline validation errors and focuses first invalid field", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: "Send Project Details" }));

    expect(screen.getByText("Please add your name.")).toBeInTheDocument();
    expect(screen.getByText("Please add your business name.")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveFocus();
  });

  test("accepts valid input and shows success state", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Name"), "Josh");
    await user.type(screen.getByLabelText("Business Name"), "Prarie AI");
    await user.type(screen.getByLabelText("Email"), "hello@example.com");
    await user.selectOptions(screen.getByLabelText("Primary Goal"), "assistant_setup");
    await user.type(
      screen.getByLabelText("Project Details"),
      "I need a first-pass automation for lead response."
    );

    await user.click(screen.getByRole("button", { name: "Send Project Details" }));

    expect(
      await screen.findByText(/Your request is ready to send|has been sent/i)
    ).toBeInTheDocument();
  });
});
