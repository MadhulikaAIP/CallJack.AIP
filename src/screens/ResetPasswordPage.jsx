import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import FullButton from "../components/Buttons/FullButton";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleResetPassword = async (event) => {
    event.preventDefault();

    // Reset previous error message
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Make API call to update the password
      await axios.post("/reset-password", { email: getEmailFromURL(), newPassword: password });
      setResetSuccess(true);
    } catch (error) {
      setError("Failed to reset password");
    }
  };

  const getEmailFromURL = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("email") || "";
  };

  return (
    <Wrapper>
      {resetSuccess ? (
        <Message>Password reset successful. You can now log in with your new password.</Message>
      ) : (
        <Form onSubmit={handleResetPassword}>
          <FormGroup>
            <InputLabel>New Password:</InputLabel>
            <Input
              type="password"
              placeholder="Enter your new password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <InputLabel>Confirm Password:</InputLabel>
            <Input
              type="password"
              placeholder="Confirm your new password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormGroup>
          {error && <ErrorText>{error}</ErrorText>}
          <BtnWrapper>
            <FullButton type="submit" title="Reset Password" />
          </BtnWrapper>
        </Form>
      )}
    </Wrapper>
  );
}

// Style components

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f2f2f2;
`;

const Form = styled.form`
  width: 400px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  padding: 40px;
`;

const Message = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #333333;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const InputLabel = styled.label`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333333;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #dddddd;
  font-size: 16px;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const ErrorText = styled.p`
  color: #ff4242;
  font-size: 14px;
  margin-top: 5px;
`;

