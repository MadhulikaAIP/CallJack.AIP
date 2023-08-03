import React, { useState } from "react";
import styled from "styled-components";
import Footer from "./Footer";
import TopNavbar from "./TopNavbar";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

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
    console.log("Settings updated");
  };

  return (
    <Wrapper>
      <TopNavbar />
      <MainContent>
        <LeftSidebar>
          <SidebarNav>
            <NavItem>
              <Link to="/owner">Dashboard</Link>
            </NavItem>
            <NavItem>
              <Link to="/jobs">Jobs</Link>
            </NavItem>
            <NavItem>
              <Link to="/messages">Messages</Link>
            </NavItem>
            <NavItem>
              <ActiveLink to="/profile">Profile</ActiveLink>
            </NavItem>
          </SidebarNav>
        </LeftSidebar>
        <ContentWrapper>
          <ContentHeader>
            <HeaderP>Profile</HeaderP>
          </ContentHeader>
          <ProfileForm onSubmit={handleProfileUpdate}>
            <FormField>
              <label>Name:</label>
              <input type="text" value={name} onChange={handleNameChange} />
            </FormField>
            <FormField>
              <label>Email:</label>
              <input type="email" value={email} onChange={handleEmailChange} />
            </FormField>
            <FormField>
              <label>Bio:</label>
              <textarea value={bio} onChange={handleBioChange}></textarea>
            </FormField>
            <FormButton type="submit">Update Profile</FormButton>
          </ProfileForm>
          <SettingsForm onSubmit={handleSettingsUpdate}>
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
`;

const MainContent = styled.div`
  flex-grow: 1;
  display: flex;
  padding: 20px;
`;

const LeftSidebar = styled.div`
  background-color: navy;
  margin-top: 70px;
  width: 290px;
  padding: 20px;
  margin-left: 0px;
  height: 500px;
`;

const SidebarNav = styled.ul`
  list-style: none;
  padding: 10px;
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
    color: white;
    text-decoration: none;
    font-size: 18px;
    transition: color 0.3s;

    &:hover {
      color: lightblue;
    }
  }
`;

const ActiveLink = styled(Link)`
  color: lightblue;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContentHeader = styled.div`
  margin-bottom: 30px;
  text-align: center;
`;

const HeaderP = styled.p`
  font-size: 24px;
  font-weight: bold;
`;

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  padding: 40px;
  background-color: #f1f1f1;
  border-radius: 4px;
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const SettingsForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  label {
    margin-bottom: 5px;
    font-weight: bold;
  }

  input,
  textarea {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
  }
`;

const FormButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: navy;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0a67a3;
  }
`;

const FooterSection = styled.div`
  background-color: ;
  padding: 20px;
  margin-top: auto;
`;

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};
