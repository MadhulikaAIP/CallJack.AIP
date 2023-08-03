import React from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
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
            <Link className="flexCenter animate pointer" to="home" smooth={true} offset={-80}>
            <img
             src={Logo}
              alt="Call-Jack"
              style={{ width: "150px", height: "50px", marginTop:"20px", marginLeft:"-200px"}}
            />  
              {/* <Logo/>
              <h1 className="font15 extraBold whiteColor" style={{ marginLeft: "15px" }}>
                Call Jack
              </h1> */}
            </Link>
            <StyleP className="whiteColor font13" style={{ fontSize:"16px", fontWeight:"bold"}}>
              © {getCurrentYear()} - <span className="purpleColor font13">CALL-JACK</span> All Right Reserved
            </StyleP>

            <Link className="whiteColor animate pointer font13" to="home" smooth={true} offset={-80} style={{fontSize:"16px", fontWeight:"bold"}}>
              Back to top
            </Link>
          </InnerWrapper>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 60%;

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