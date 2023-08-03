import React from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom"; 

// Assets
import LogoImg from "../../assets/svg/Logo";
import Logo from "../../assets/img/Logo1.jpg"

export default function Contact() {

  const getCurrentYear = () => {
    return new Date().getFullYear();
  }

  return (
    <Wrapper>
      <div className="blackBg">
        <div className="container">
          <InnerWrapper className="flexSpaceCenter" style={{ padding: "30px 0" }}>
          {/* <RouterLink className="" to="/contractor" smooth={true}>
          <img
             src={Logo}
              alt="Call-Jack"
              style={{ width: "200px", height: "50px", marginTop:"20px", marginLeft:"-300px"}}
            /> 
          </RouterLink> */}
            {/* <Link className="flexCenter animate pointer" to="home" smooth={true} offset={-80}>
              <LogoImg />
              <h1 className="font15 extraBold whiteColor" style={{ marginLeft: "15px" }}>
                CALL-JACK
              </h1>
            </Link> */}
            <StyleP className="whiteColor font13" style={{ marginLeft:"400px", fontSize:"18px", fontWeight:"bold"}}>
              © {getCurrentYear()} - <span className="purpleColor font13">CALL-JACK</span> All Right Reserved
            </StyleP>

            <Link className="whiteColor animate pointer font13" to="home" smooth={true} offset={-80} style={{ fontSize: "18px" ,fontWeight:"bold" , marginRight:"-300px"}}>
              Loyalist College in Toronto
            </Link>
          </InnerWrapper>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 110%;
  height: 100%;
`;
const InnerWrapper = styled.div`
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;
const StyleP = styled.p`
  @media (max-width: 550px) {
    margin: 20px 0;
  }
`;