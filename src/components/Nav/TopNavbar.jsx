import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import Sidebar from "../Nav/Sidebar";
import Backdrop from "../Elements/Backdrop";
import BurgerIcon from "../../assets/svg/BurgerIcon";
import Logo from "../../assets/img/Logo1.jpg";

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
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && <Backdrop toggleSidebar={toggleSidebar} />}
      <Wrapper
        className="flexCenter animate blackBg"
        style={y > 100 ? { height: "60px" } : { height: "80px" }}
      >
        <NavInner className="container flexSpaceCenter">
          <RouterLink className="" to="/" smooth={true}>
            <img
              src={Logo}
              alt="Call-Jack"
              style={{ width: "200px", height: "50px", marginTop: "8px", marginLeft: "-150px" }}
            />
          </RouterLink>

          <BurderWrapper className="pointer" onClick={() => toggleSidebar(!sidebarOpen)}>
            <BurgerIcon />
          </BurderWrapper>

          <UlWrapper className="flexNullCenter">
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px", fontSize: "18px", color: "white" }} to="home" spy={true} smooth={true} offset={-80}>
                Home
              </Link>
            </li>
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px", fontSize: "18px", color: "white" }} to="services" spy={true} smooth={true} offset={-80}>
                Services
              </Link>
            </li>
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px", fontSize: "18px", color: "white" }} to="portfolio" spy={true} smooth={true} offset={-80}>
                Work
              </Link>
            </li>
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px", fontSize: "18px", color: "white" }} to="projects" spy={true} smooth={true} offset={-80}>
                Team
              </Link>
            </li>
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px", fontSize: "18px", color: "white" }} to="contact" spy={true} smooth={true} offset={-80}>
                Contact Us
              </Link>
            </li>
            <li className="semiBold font15 pointer"></li>
          </UlWrapper>
          <UlWrapperRight className="flexNullCenter">
            <li className="semiBold font15 pointer">
              <RouterLink to="/login" style={{ padding: "10px 30px 10px 0", fontSize: "18px", color: "white" }}>
                Login
              </RouterLink>
            </li>
            <li className="semiBold font15 pointer">
              <RouterLink to="/register" style={{ padding: "10px 30px 10px 0", fontSize: "18px", color: "white" }}>
                Register
              </RouterLink>
            </li>
            <li className="semiBold font15 pointer flexCenter">
              <a href="/" className="radius8 lightBg" style={{ padding: "10px 15px", fontSize: "18px" }}>
                Get Started
              </a>
            </li>
          </UlWrapperRight>
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
  font-size: 16px;
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
  font-size: 16px;
  @media (max-width: 760px) {
    display: none;
  }
`;

const UlWrapperRight = styled.ul`
  @media (max-width: 760px) {
    display: none;
  }
`;
