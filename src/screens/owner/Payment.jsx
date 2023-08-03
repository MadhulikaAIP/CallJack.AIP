import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import TopNavbar from "./TopNavbar";
import styled from "styled-components";
import Footer from "./Footer";
import { Link } from "react-router-dom";


//pulishable key -//pk_test_51NVJ9eJBaY5nzPbLvv2bbpRY8H3sS6p2GmP5pti9jbZ7kBXGZx2LR71sGmyIlEL6OKHYZjqSaI7dVFb5MEflASrw00p4TqgwyR
const stripePromise = loadStripe('pk_test_51NNWAySCTPDkRA5GSf2feejob1kIXbiZYYxnnDG4HEi1pA95oC7FTMHb4rTxuZuq9nDBpLITaMDxk805L945JGWR00UO2SSZbd');

const App = () => {
  return (
    <Wrapper>
      <TopNavbar />
      
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
    <FooterSection>
        <Footer />
      </FooterSection>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const FooterSection = styled.div`
  background-color: ;
  padding: 20px;
  margin-top: auto;
`;
const LeftSidebar = styled.div`
background-color: navy;
margin-top: 40px;
width: 300px;
padding: 40px;
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
export default App;
