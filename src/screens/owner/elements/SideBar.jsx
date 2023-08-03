import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function SideBar(){

      <LeftSidebar>
        <SidebarNav>
          <NavItem>
            <Link to="/owner">Dashboard</Link>
          </NavItem>
          <NavItem>
            <Link to="/owner/post">Job-Post</Link>  
          </NavItem>
          <NavItem>
            <Link to="/owner/posted">Posted-Jobs</Link>  
          </NavItem>
          <NavItem>
            <Link to="/owner/paymentHistory">Payment History</Link>
          </NavItem>
          <NavItem>
            {/* /owner/posted */}
            <Link to="/owner/message">Messages</Link>
          </NavItem>
        </SidebarNav>
      </LeftSidebar>

}


const LeftSidebar = styled.div`
  background-color: black;
  margin-top: 90px;
  width: 300px;
  padding: 10px 10px 10px 50px;
  height: fit-content;
  border-radius: 5px;
`;

const SidebarNav = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  padding: 30px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  a {
    color: white;
    text-decoration: none;
    font-size: 18px;
    font-weight:bold;

    transition: color 0.3s;

    &:hover {
      color: lightblue;
    }
  }
`;