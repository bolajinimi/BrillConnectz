import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Verification, { FormFieldProps } from "./verification";
import ConfirmPassword from "./confirmPassword";
import {
  FormWrapper,
  ForgotPasswordForm,
  FormLabel,
  StyledInput,
  StyledButton,
} from "./index.styled";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>();
  const [emailSent, setEmailSent] = useState(false);
  const [validOtp, setValidOtp] = useState(false);
  const [otpFields, setOtpFields] = useState<FormFieldProps>({
    first: "",
    second: "",
    third: "",
    fourth: "",
  });
  const [passwords, setPasswords] = useState<{
    password: string;
    newPassword: string;
  }>({
    password: "",
    newPassword: "",
  });

  const otp = Number(Object.values(otpFields).join(""));
  console.log(otp);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value } = event.target;
    setEmail(value);
  };

  const submitEmailAddress = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      localStorage.setItem("emailStatus", JSON.stringify("email sent"));
      setEmailSent(true);
      const response = await axios.post("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeOtp = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    setOtpFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  const submitOtp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem("otpStatus", JSON.stringify("otp sent"));
    setValidOtp(true);
    const response = axios.post("");
  };

  const handleChangeNewPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const { name, value } = event.target;
    setPasswords((prevPasswords) => ({ ...prevPasswords, [name]: value }));
  };

  const submitNewPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.removeItem("emailStatus");
    localStorage.removeItem("otpStatus");
    setEmailSent(false);
    setValidOtp(false);
    navigate("/login");
    const response = axios.post("");
  };
  console.log(validOtp, emailSent);

  useEffect(() => {
    const emailStatusFromStorage = localStorage.getItem("emailStatus");
    const emailStatus =
      emailStatusFromStorage && JSON.stringify(emailStatusFromStorage);
    emailStatus && setEmailSent(true);
    const otpStatusFromStorage = localStorage.getItem("otpStatus");
    const otpStatus =
      otpStatusFromStorage && JSON.stringify(otpStatusFromStorage);
    otpStatus && setValidOtp(true);
  }, [emailSent, validOtp]);

  return (
    <FormWrapper>
      {emailSent && !validOtp ? (
        <Verification
          onSubmit={submitOtp}
          onChange={handleChangeOtp}
          formFields={otpFields}
        />
      ) : emailSent && validOtp ? (
        <ConfirmPassword
          onChange={handleChangeNewPassword}
          onSubmit={submitNewPassword}
        />
      ) : (
        <ForgotPasswordForm onSubmit={submitEmailAddress}>
          <span className="title">Forgot Password</span>
          <FormLabel htmlFor="email">
            <span>Enter Email Address</span>
            <StyledInput
              id="email"
              type="email"
              placeholder="Email"
              onChange={handleEmailChange}
            />
          </FormLabel>
          <Link className="back" to="/login">
            Back to Sign In
          </Link>
          <StyledButton type="submit">Submit</StyledButton>
        </ForgotPasswordForm>
      )}
    </FormWrapper>
  );
};

export default ForgotPassword;
