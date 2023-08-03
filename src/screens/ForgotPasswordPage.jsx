import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import FullButton from "../components/Buttons/FullButton";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [resetRequestSent, setResetRequestSent] = useState(false);
  const [error, setError] = useState("");


  const handleForgotPassword = async (event) => {
    event.preventDefault();

    // Reset previous error message
    setError("");

    try {
       // Make API call to check if the email exists and request password reset
       const response = await axios.post("/forgot-password", { email });
       const resetURL = `${process.env.REACT_APP_FRONTEND_URL}/reset-password?email=${encodeURIComponent(email)}`;;
       window.location.href = resetURL; // Redirect the user to the reset password page   
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("Email not found"); // Display error message when the email is not found
      } else {
        setError("Something went wrong"); // Display a generic error message for other errors
      }
    }
  };

  return (
    <Wrapper>
     {/*  {resetRequestSent ? (
        <Message>
          Email validated Successfully and Redirecting to Password Rest Page.
        </Message>
      ) : ( */}
        <Form onSubmit={handleForgotPassword}>
          <FormGroup>
            <InputLabel>Email:</InputLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          {error && <ErrorText>{error}</ErrorText>}
          <BtnWrapper>
            <FullButton type="submit" title="Request Password Reset" />
          </BtnWrapper>
        </Form>
      {/* )} */}
    </Wrapper>
  );
}

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
