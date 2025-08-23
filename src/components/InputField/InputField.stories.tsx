import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "./InputField";
import type { InputFieldProps } from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  tags: ["autodocs"], // optional, helps in Storybook 7 for auto docs
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["filled", "outlined", "ghost"],
      description: "Visual style of the input",
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "Size of the input",
    },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: "Name",
    placeholder: "Enter your name",
    variant: "outlined",
    size: "md",
    helperText: "This is a helper text",
  } as InputFieldProps,
};

export const ErrorState: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    invalid: true,
    errorMessage: "Invalid email",
    variant: "outlined",
  },
};

export const Disabled: Story = {
  args: {
    label: "Username",
    placeholder: "Disabled field",
    disabled: true,
    variant: "outlined",
  },
};

export const FilledGhost: Story = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    variant: "ghost",
    size: "lg",
  },
};
