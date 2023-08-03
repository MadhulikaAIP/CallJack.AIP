import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
import Logo from "../../assets/img/Logo1.jpg"
import { Link as RouterLink } from "react-router-dom"; // Import the Link component from react-router-dom

// Components
// Assets
import LogoIcon from "../../assets/svg/Logo";
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
         {/*  <Link className="pointer flexNullCenter" to="home" smooth={true}>
            <LogoIcon />
            <h1 style={{ marginLeft: "15px" }} className="font20 extraBold">
              Call-Jack
            </h1>
          </Link> */}
          <RouterLink className="" to="/contractor" smooth={true}>
          <img
             src={Logo}
              alt="Call-Jack"
              style={{ width: "200px", height: "50px", marginTop:"15px", marginLeft:"-350px"}}
            /> 
          </RouterLink>
          <BurderWrapper className="pointer" onClick={() => toggleSidebar(!sidebarOpen)}>
            <BurgerIcon />
          </BurderWrapper>
          
          <UlWrapperRight className="flexNullCenter">
            <li className="semiBold font15 pointer">
              <RouterLink to="/owner/settings" style={{ padding: "10px 30px 10px 0" }}>
                
              </RouterLink>
            </li>
            <li className="semiBold font15 pointer">
              <RouterLink to="/owner/profile" style={{ padding: "10px 30px 10px 0" }}>
              </RouterLink>
            </li>
            <li className="semiBold font15 pointer">
              <CurrentTime style={{ padding: "10px 30px 10px 10px" ,color:"white", fontSize:"16px"}}>{new Date().toLocaleTimeString()}</CurrentTime>
            </li>
            <li className="semiBold font15 pointer">
              <RouterLink to="/" style={{ padding: "10px 30px 10px 10px" ,color:"white", fontSize:"16px"}}>
                Logout
              </RouterLink>
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
`
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
  font-size: 14px;
  color: black;
`;
