import React from "react";
import { ForgotPasswordForm, FormLabel, StyledInput, StyledButton } from "./index.styled";
export interface FormFieldProps {
  first: string;
  second: string;
  third: string;
  fourth: string;
}
export interface VerificationProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formFields?: FormFieldProps;
}

const Verification: React.FC<VerificationProps> = ({
  onChange,
  onSubmit,
  formFields,
}) => {
  return (
    <ForgotPasswordForm onSubmit={onSubmit}>
      <span>Verification</span>
      <span>Enter Verification Code</span>
      <FormLabel className="verification_label">
        <StyledInput
          className="otp_input"
          onChange={onChange}
          type="number"
          name="first"
          value={formFields?.first.slice(0, 1)}
        />
        <StyledInput
          className="otp_input"
          onChange={onChange}
          type="number"
          name="second"
          value={formFields?.second.slice(0, 1)}
        />
        <StyledInput
          className="otp_input"
          onChange={onChange}
          type="number"
          name="third"
          value={formFields?.third.slice(0, 1)}
        />
        <StyledInput
          className="otp_input"
          onChange={onChange}
          type="number"
          name="fourth"
          value={formFields?.fourth.slice(0, 1)}
        />
      </FormLabel>
      <p className="resend">
        If you didn't receive a code, <span>Resend</span>
      </p>
      <StyledButton children="Submit" />
    </ForgotPasswordForm>
  );
};

export default Verification;
