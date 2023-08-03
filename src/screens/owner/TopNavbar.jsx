import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import Logo from "../../assets/img/Logo1.jpg";
import BurgerIcon from "../../assets/svg/BurgerIcon";

export default function TopNavbar() {
  const [y, setY] = useState(window.scrollY);
  const [sidebarOpen, toggleSidebar] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => setY(window.scrollY));
    return () => {
      window.removeEventListener("scroll", () => setY(window.scrollY));
    };
  }, [y]);

  return (
    <>
      <Wrapper className="flexCenter animate blackBg" style={y > 100 ? { height: "60px" } : { height: "80px" }}>
        <NavInner className="container flexSpaceCenter">
          <RouterLink className="" to="/owner" smooth={true}>
            <img
              src={Logo}
              alt="Call-Jack"
              style={{ width: "200px", height: "50px", marginTop: "15px", marginLeft: "-150px" }}
            />
          </RouterLink>

          <BurderWrapper className="pointer" onClick={() => toggleSidebar(!sidebarOpen)}>
            <BurgerIcon />
          </BurderWrapper>

          <UlWrapper className="flexNullCenter">
            <li className="semiBold font15 pointer">
              <RouterLink to="/owner/settings" style={{ padding: "10px 30px 10px 0" }}></RouterLink>
            </li>
            <li className="semiBold font15 pointer">
              <RouterLink to="/owner/profile" style={{ padding: "10px 30px 10px 0" }}></RouterLink>
            </li>
            <li className="semiBold font15 pointer">
              <CurrentTime style={{ padding: "10px 30px 10px 10px", fontSize: "18px", fontWeight: "bold", color: "white" }}>
                {new Date().toLocaleTimeString()}
              </CurrentTime>
            </li>
            <li className="semiBold font15 pointer">
              <RouterLink
                to="/"
                style={{ padding: "10px 30px 10px 10px", fontSize: "18px", fontWeight: "bold", color: "white" }}
              >
                Logout
              </RouterLink>
            </li>
          </UlWrapper>

          <SidebarContainer isOpen={sidebarOpen}>
            <UlWrapperSidebar>
              <li className="semiBold font15 pointer">
                <RouterLink to="/owner/settings">Settings</RouterLink>
              </li>
              <li className="semiBold font15 pointer">
                <RouterLink to="/owner/profile">Profile</RouterLink>
              </li>
              <li className="semiBold font15 pointer">
                <RouterLink to="/">Logout</RouterLink>
              </li>
            </UlWrapperSidebar>
          </SidebarContainer>
        </NavInner>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;

const NavInner = styled.div`
  position: relative;
  height: 100%;
`;

const BurderWrapper = styled.button`
  outline: none;
  border: 0px;
  background-color: transparent;
  height: 100%;
  padding: 0 15px;
  display: none;
  @media (max-width: 760px) {
    display: block;
  }
`;

const UlWrapper = styled.ul`
  display: flex;
  @media (max-width: 760px) {
    display: none;
  }
`;

const UlWrapperRight = styled.ul`
  @media (max-width: 760px) {
    display: none;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

const CurrentTime = styled.p`
  font-size: 18px;
  color: Black;
`;

const SidebarContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  background-color: #ffffff;
  width: 70%;
  z-index: 1000;
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;
  @media (min-width: 760px) {
    display: none;
  }
`;

const UlWrapperSidebar = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  & li {
    padding: 10px 0;
    border-bottom: 1px solid #e5e5e5;
  }
  & li:last-child {
    border-bottom: none;
  }
  @media (max-width: 760px) {
    flex-direction: column;
    justify-content: center;
    & li {
      width: 100%;
      text-align: center;
      padding: 10px;
    }
  }
`;
