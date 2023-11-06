import React from "react";
import { VerificationProps } from "./verification";
import { ForgotPasswordForm, StyledInput, StyledButton } from "./index.styled";

const ConfirmPassword: React.FC<VerificationProps> = ({
  onSubmit,
  onChange,
}) => {
  return (
    <ForgotPasswordForm onSubmit={onSubmit}>
      <label htmlFor="password">
        <StyledInput
          type="password"
          name="password"
          id="password"
          onChange={onChange}
          placeholder="New Password"
        />
      </label>
      <label htmlFor="confirmPassword">
        <StyledInput
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          onChange={onChange}
          placeholder="Confirm Password"
        />
      </label>
      <StyledButton children="Submit" />
    </ForgotPasswordForm>
  );
};

export default ConfirmPassword;
