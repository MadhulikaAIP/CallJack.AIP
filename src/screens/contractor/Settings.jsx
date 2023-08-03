import React, { useState } from "react";
import styled from "styled-components";
import Footer from "./Footer";
import TopNavbar from "./TopNavbar";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Update profile logic
    console.log("Profile updated:", { name, email, bio });
  };

  const handleSettingsUpdate = (e) => {
    e.preventDefault();
    // Update settings logic
    console.log("Settings updated:", { darkMode });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Wrapper darkMode={darkMode}>
      <TopNavbar />
      <MainContent>
        <LeftSidebar>
          <SidebarNav>
            <NavItem>
              <Link to="/contractor">Dashboard</Link>
            </NavItem>
            <NavItem>
              <Link to="/contractor/jobs">Jobs</Link>
            </NavItem>
            <NavItem>
              <Link to="/contractor/messages">Messages</Link>
            </NavItem>
            <NavItem>
              <Link to="/contractor/profile">Profile</Link>
            </NavItem>
            <NavItem>
              <Link to="/contractor/settings">Settings</Link>
            </NavItem>
          </SidebarNav>
        </LeftSidebar>
        <ContentWrapper>
          <ContentHeader>
            <HeaderP>Settings</HeaderP>
          </ContentHeader>
          <SettingsForm onSubmit={handleSettingsUpdate}>
            <FormField>
              <label>Dark Mode:</label>
              <SwitchButton darkMode={darkMode} onClick={toggleDarkMode}>
                {darkMode ? "On" : "Off"}
              </SwitchButton>
            </FormField>
            <FormButton type="submit">Update Settings</FormButton>
          </SettingsForm>
        </ContentWrapper>
      </MainContent>
      <FooterSection>
        <Footer />
      </FooterSection>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${(props) => (props.darkMode ? "#333" : "#fff")};
  color: ${(props) => (props.darkMode ? "#fff" : "#333")};
  transition: background-color 0.3s, color 0.3s;
`;

const MainContent = styled.div`
  flex-grow: 1;
  display: flex;
`;

const LeftSidebar = styled.div`
  background-color: ${(props) => (props.darkMode ? "#222" : "#eee")};
  width: 300px;
  padding: 40px;
`;

const SidebarNav = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  a {
    color: ${(props) => (props.darkMode ? "#fff" : "#333")};
    text-decoration: none;
    font-size: 18px;
    transition: color 0.3s;

    &:hover {
      color: ${(props) => (props.darkMode ? "lightblue" : "blue")};
    }
  }
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentHeader = styled.div`
  margin-bottom: 30px;
  margin-top: 90px;
`;

const HeaderP = styled.p`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-top:20px;
`;

const SettingsForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  padding: 20px;
  background-color: ${(props) => (props.darkMode ? "#222" : "#f1f1f1")};
  border-radius: 4px;
  margin-bottom: 20px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  label {
    margin-bottom: 5px;
    font-weight: bold;
    color: ${(props) => (props.darkMode ? "#fff" : "#333")};
  }
`;

const SwitchButton = styled.button`
  padding: 5px 10px;
  font-size: 16px;
  background-color: ${(props) => (props.darkMode ? "#222" : "#ccc")};
  color: ${(props) => (props.darkMode ? "#fff" : "#333")};
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const FormButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: ${(props) => (props.darkMode ? "#222" : "navy")};
  color: ${(props) => (props.darkMode ? "#fff" : "#fff")};
  border: none;
  cursor: pointer;
`;

const FooterSection = styled.div`
  background-color: ${(props) => (props.darkMode ? "#222" : "navy")};
  padding: 20px;
`;

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};
