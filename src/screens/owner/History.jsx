import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import TopNavbar from './TopNavbar';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
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
    font-weight: bold;

    transition: color 0.3s;

    &:hover {
      color: lightblue;
    }
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 0px;
  margin-top: 70px;
  padding-left: 500px;
  border: 3px solid;
  background-color: lightgray;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  width: auto;
  padding-left: 0px;
  border: 3px solid;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 0px;

  th,
  td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    font-size: 18px
  }

  th {
    background-color: #f0f0f0;
    font-weight: bold;
    font-size: 20px;
  }
`;

const FooterWrapper = styled.footer`
margin-top: auto;
margin-left: -500px;
`;

const PaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);

  const fetchPaymentHistory = async () => {
    try {
      const paymentHistoryResponse = await fetch('/api/payment/history');
      const paymentHistoryData = await paymentHistoryResponse.json();

      setPaymentHistory(paymentHistoryData);
    } catch (error) {
      console.log('Error fetching payment history:', error);
    }
  };

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  return (
    <Wrapper>
      <LeftSidebar>
        <SidebarNav>
          <NavItem>
            <Link to="/owner">Dashboard</Link>
          </NavItem>
          <NavItem>
            <Link to="/owner/post">Job Post</Link>
          </NavItem>
          <NavItem>
            <Link to="/owner/posted">Posted-Jobs</Link>  
          </NavItem>
          <NavItem>
            <Link to="/owner/paymentHistory">Payment History</Link>
          </NavItem>
          <NavItem>
            <Link to="/owner/message">Messages</Link>
          </NavItem>
        </SidebarNav>
      </LeftSidebar>
      {/* <MainContent> */}
        <TopNavbar />
        <Container>
          <Title>Payment History</Title>
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <th>Job Title: </th>
                  <th>Reciever ID: </th>
                  <th>Amount: </th>
                  <th>Transaction ID: </th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.title}</td>
                    <td>{payment.contractorId}</td>
                    <td>{payment.cost}</td>
                    <td>{payment.transactionId}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
          <Link to="/owner">Go back to Dashboard</Link>
          <FooterWrapper>
          <Footer />
          </FooterWrapper>
          
        </Container>
        
      {/* </MainContent> */}
    </Wrapper>
  );
};

export default PaymentHistory;
