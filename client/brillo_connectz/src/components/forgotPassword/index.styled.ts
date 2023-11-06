import styled from "styled-components";

export const FormWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span {
    color: #000;
  }
`;

export const ForgotPasswordForm = styled.form`
  width: 900px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  gap: 2rem;
  background: #fff;
  box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%),
    0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);

  .resend {
    color: #000;

    span {
      color: #3bb19b;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .back {
    color: #3bb19b;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const FormLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;

  &.verification_label {
    flex-direction: row;
    gap: 1rem;
  }
`;

export const StyledInput = styled.input.attrs({
  required: true,
})`
  outline: none;
  border: none;
  width: 370px;
  padding: 15px;
  border-radius: 10px;
  background-color: #edf5f3;
  margin: 5px 0;
  font-size: 14px;
  color: #444444;

  &.otp_input {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    text-align: center;
  }
`;
export const StyledButton = styled.button`
  border: none;
  outline: none;
  padding: 12px 0;
  border-radius: 20px;
  width: 180px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  background-color: #3bb19b;
  color: white;
  margin: 10px;
`;
