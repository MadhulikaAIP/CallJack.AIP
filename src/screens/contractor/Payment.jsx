import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import Footer from "./Footer";
import TopNavbar from "./TopNavbar";

export default function ReceivedPayments() {
  const [contractor, setContractor] = useState(null);
  const [payments, setPayments] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContractor = async () => {
      try {
        const response = await fetch("/api/contractor/current");
        const data = await response.json();
        setContractor(data);
        fetchReceivedPayments(data.id);
      } catch (error) {
        console.log(error);
      }
    };

    fetchContractor();
  }, []);

  const fetchReceivedPayments = async (contractorId) => {
    try {
      const response = await fetch(`/api/contractor/${contractorId}/payments`);
      const data = await response.json();
      setPayments(data);
      calculateTotalAmount(data);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateTotalAmount = (data) => {
    const total = data.reduce((accumulator, payment) => accumulator + payment.cost, 0);
    setTotalAmount(total);
  };

  const navigateToChat = (ownerId) => {
    console.log(`Establishing chat between job owner ${ownerId} and contractor ${contractor.id}`);
    navigate(`/contractor/messages?ownerId=${ownerId}&contractorId=${contractor.id}`);
  };

  return (
    <Wrapper>
      <TopNavbar />
      <ContentWrapper>
        <LeftSidebar>
          <SidebarNav>
            <NavItem>
              <Link to="/contractor">Dashboard</Link>
            </NavItem>
            <NavItem>
              <Link to="/contractor/jobs">Jobs</Link>
            </NavItem>
            <NavItem>
              <Link to="/contractor/payment">Payments Info</Link>
            </NavItem>
            <NavItem>
            <Link to="/contractor/posted">Accepted-jobs</Link>
           </NavItem>
            {/* <NavItem>
              <Link to=""></Link>
            </NavItem> */}
          </SidebarNav>
        </LeftSidebar>
        <MainContent>
          <h2 style={{border:"3px solid", backgroundColor:"lightgray"}}>Received Payments</h2>
          {payments.length > 0 ? (
            <PaymentTable>
              <TableHeader>
                <TableHeading>Job ID</TableHeading>
                <TableHeading>Owner Name</TableHeading>
                <TableHeading>Job Title</TableHeading>
                <TableHeading>Cost</TableHeading>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.jobId}</TableCell>
                    <TableCell>{payment.ownerName}</TableCell>
                    <TableCell>{payment.title}</TableCell>
                    <TableCell>{payment.cost}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableTotal>Total Amount Received:</TableTotal>
                <TableTotalAmount>${totalAmount}</TableTotalAmount>
              </TableFooter>
            </PaymentTable>
          ) : (
            <NoPaymentsMessage>No received payments</NoPaymentsMessage>
          )}
        </MainContent>
      </ContentWrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
`;

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
  padding: 20px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  a {
    color: white;
    text-decoration: none;
    font-size: 20px;
    font-weight: bold;

    transition: color 0.3s;

    &:hover {
      color: lightblue;
    }
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  margin-top: 90px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const PaymentTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 0px;
  border: 3px solid;
`;

const TableHeader = styled.thead`
  background-color: #f4f4f4;
  color: #333;
`;

const TableHeading = styled.th`
  padding: 10px;
  text-align: left;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f4f4f4;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const TableFooter = styled.tfoot``;

const TableTotal = styled(TableHeading)`
  text-align: right;
`;

const TableTotalAmount = styled(TableTotal)`
  font-weight: bold;
`;

const NoPaymentsMessage = styled.p`
  font-size: 16px;
  text-align: center;
  margin-top: 100px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const FooterWrapper = styled.footer`
margin-top: auto;
margin-left: -500px;
`;
