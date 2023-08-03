import React, { useState } from "react";
import styled from "styled-components";
import FullButton from "../components/Buttons/FullButton";
import LoginTopNav from "../components/Nav/LoginTopNav";
import Footer from "../components/Sections/Footer";
import HeaderImage from "../assets/img/add/b.png";
import axios from "axios";

export default function RegistrationPage() {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [experience, setExperience] = useState("");
  const [reputation, setReputation] = useState("");
  const [bio, setBio] = useState("");
  const [fieldOfWork, setFieldOfWork] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [errors, setErrors] = useState({}); // Store validation errors

  // Function to validate email format
  const isEmailValid = (email) => {
    // You can use a regular expression to validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to validate password format
  const isPasswordValid = (password) => {
    // You can use a regular expression to validate the password format
    // Minimum 8 characters, at least one capital letter, one number, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const isPhoneNumberValid = (phoneNumber) => {
    const phoneNumberRegex = /^\d{10}$/; // Matches a 10-digit number
    return phoneNumberRegex.test(phoneNumber);
  };

  const isValidName = (name) => {
    // Regular expression to check if the name contains only letters and spaces
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };

  const handleRegistration = (e) => {
    e.preventDefault();
  
    // Reset previous validation errors
    setErrors({});
  
    // Perform validation
    const validationErrors = {};
  
    if (name.trim() === "") {
      validationErrors.name = "Name is required";
    }else if(!isValidName(name)){
      validationErrors.name = "Invalid name. Please enter letters only";
    }
  
    if (email.trim() === "") {
      validationErrors.email = "Email is required";
    } else if (!isEmailValid(email)) {
      validationErrors.email = "Invalid email format";
    }
  
    if (password.trim() === "") {
      validationErrors.password = "Password is required";
    } else if (!isPasswordValid(password)) {
      validationErrors.password =
        "Password must be at least 8 characters long and contain one uppercase letter, one lowercase letter, one number, and one special character";
    }
  
    if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }
  
    if (role === "contractor") {
      if (phoneNumber.trim() === "") {
        validationErrors.phoneNumber = "Phone number is required";
      } else if (!isPhoneNumberValid(phoneNumber)) {
        validationErrors.phoneNumber = "Invalid phone number";
      }
    }
  
    // Check if there are any validation errors
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    // If there are no validation errors, proceed with registration
    // Register user with the provided details
    axios
      .post("/register", {
        username: name,
        email: email,
        password: password,
        role: role,
        phoneNumber: phoneNumber,
        experience: experience,
        reputation: reputation,
        bio: bio,
        fieldOfWork: fieldOfWork,
      })
      .then((response) => {
        setRegistrationStatus("success");
      })
      .catch((error) => {
        setRegistrationStatus("error");
        console.error("Error registering user:", error);
      });
  };
  

  const renderContractorForm = () => {
    return (
      <>
        <FormGroup>
          <InputLabel>Phone Number:</InputLabel>
          <Input
            type="text"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          {renderError("phoneNumber")}
        </FormGroup>
        <FormGroup>
          <InputLabel>Experience:</InputLabel>
          <Input
            type="text"
            placeholder="Enter your experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <InputLabel>Charges:</InputLabel>
          <Input
            type="text"
            placeholder="Enter your charges"
            value={reputation}
            onChange={(e) => setReputation(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <InputLabel>Bio:</InputLabel>
          <Input
            type="text"
            placeholder="Enter your bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <InputLabel>Field of Work:</InputLabel>
          <Input
            type="text"
            placeholder="Enter your field of work"
            value={fieldOfWork}
            onChange={(e) => setFieldOfWork(e.target.value)}
            required
          />
        </FormGroup>
      </>
    );
  };

  // Display validation errors in the UI
  const renderError = (field) => {
    return errors[field] ? <ErrorText>{errors[field]}</ErrorText> : null;
  };

  const ErrorText = styled.p`
  color: #ff4242;
  font-size: 14px;
  margin-top: 5px;
`;

  return (
    <Wrapper>
      <LoginTopNav />

      <ContentWrapper>
        <RegistrationContainer>
          <RegistrationHeadings>Register!</RegistrationHeadings>
          <RegistrationForm onSubmit={handleRegistration}>
            <Form>
              <FormGroup>
                <InputLabel>Role:</InputLabel>
                <Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="owner">Owner</option>
                  <option value="contractor">Contractor</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <InputLabel>Name:</InputLabel>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                {renderError("name")}
              </FormGroup>
              <FormGroup>
                <InputLabel>Email:</InputLabel>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {renderError("email")}
              </FormGroup>
              <FormGroup>
                <InputLabel>Password:</InputLabel>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {renderError("password")}
              </FormGroup>
              <FormGroup>
                <InputLabel>Confirm Password:</InputLabel>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {renderError("confirmPassword")}
              </FormGroup>
              {role === "contractor" && renderContractorForm()}
              <BtnWrapper>
                <StyledButton title="Register">Register</StyledButton>
              </BtnWrapper>
                {registrationStatus === "success" && (
                  <Alert success>Registration successful!</Alert>
                )}
                {registrationStatus === "error" && (
                  <Alert error>Error registering user. Please try again.</Alert>
                )}
                {registrationStatus === "Email already exists" && (
                <Alert error>Email already exists. Please use a different email.</Alert>
                )}
               {registrationStatus === "Phone number already exists" && (
                <Alert error>Phone number already exists. Please use a different phone number.</Alert>
               )}
            </Form>
          </RegistrationForm>
        </RegistrationContainer>
        <ImageContainer>
          <ImageWrapper>
            <Img src={HeaderImage} alt="office" />
          </ImageWrapper>
        </ImageContainer>
      </ContentWrapper>

      <Footer />

      
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
  background-color: #f2f2f2;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-grow: 1;
`;

const RegistrationContainer = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 400px;
  margin-top: 15%;
  margin-right: 2%;
  margin-bottom: 5%;
  height: relative;
  position: left;
`;

const RegistrationForm = styled.form`
  text-align: left;
`;

const RegistrationHeadings = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333333;
  text-align: left;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const InputLabel = styled.label`
  font-size: 16px;
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

const Select = styled.select`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #dddddd;
  font-size: 16px;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  font-size: 16px;
`;

const StyledButton = styled(FullButton)`
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  font-size: 16px;
`;

const ImageContainer = styled.div`
  margin-left: 300px;
`;

const ImageWrapper = styled.div`
  width: 600px;
  height: 600px;
  overflow: hidden;
  border-radius: 10px;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Alert = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-top: 10px;
  border-radius: 4px;
  font-weight: bold;

  ${(props) =>
    props.success &&
    `
    background-color: #dff0d8;
    color: #3c763d;
    border: 1px solid #d6e9c6;
  `}

  ${(props) =>
    props.error &&
    `
    background-color: #f2dede;
    color: #a94442;
    border: 1px solid #ebccd1;
  `}
`;
