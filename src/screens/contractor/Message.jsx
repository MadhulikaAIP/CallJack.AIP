import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Components
import Footer from "./Footer";
import TopNavbar from "./TopNavbar";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  display: flex;
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
    font-weight:bold;

    transition: color 0.3s;

    &:hover {
      color: lightblue;
    }
  }
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
  margin-top: 70px;
  overflow-y: scroll;

  /* Hide the scrollbar */
  ::-webkit-scrollbar {
    width: 0.5em;
    background-color: #f5f5f5;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #000000;
  }
`;



const Title = styled.h2`
  margin-bottom: 10px;
`;

const Info = styled.p`
  margin-bottom: 5px;
`;

const MessageContainer = styled.div`
  flex-grow: 1;
  margin-top: 20px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ sent }) => (sent ? "flex-end" : "flex-start")};
  margin-bottom: 10px;
`;

const MessageContent = styled.p`
  margin-bottom: 5px;
  background-color: ${({ sent }) => (sent ? "#f1f0f0" : "#d6eaf8")};
  padding: 8px;
  border-radius: ${({ sent }) => (sent ? "10px 10px 0 10px" : "10px 10px 10px 0")};
`;

const MessageSender = styled.p`
  font-size: 0.8em;
  color: #888888;
  margin-top: 5px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  margin-left: 10px;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: #4caf50;
  color: #ffffff;
  cursor: pointer;
`;

export default function MessageScreen() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ownerId = queryParams.get("ownerId");
  const contractorId = queryParams.get("contractorId");

  const [sentMessages, setSentMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const sentResponse = await fetch(`/api/messages/sent/${contractorId}`);
        const sentData = await sentResponse.json();
        setSentMessages(sentData);

        const receivedResponse = await fetch(`/api/messages/received/${contractorId}`);
        const receivedData = await receivedResponse.json();
        setReceivedMessages(receivedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();

    const pollInterval = setInterval(fetchMessages, 3000); // Poll every 3 seconds (adjust as needed)

    return () => clearInterval(pollInterval);
  }, [contractorId]);

  const sendMessage = async () => {
    if (!newMessage) return;
  
    try {
      const response = await fetch(`/api/messages/${ownerId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: newMessage,
          contractorId: contractorId,
        }),
      });
  
      if (response.ok) {
        console.log("Message sent successfully");
        setNewMessage("");
        const sentData = await response.json();
        setSentMessages([...sentMessages, sentData]);
      } else {
        console.log("Failed to send message:", response.status);
      }
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
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
          </SidebarNav>
        </LeftSidebar>
        <Container>
          <Title>Chat</Title>
          <Info>Owner ID: {ownerId}</Info>
          <Info>Contractor ID: {contractorId}</Info>

          <MessageContainer>
            {([...sentMessages, ...receivedMessages] || [])
              .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
              .map((message) => (
                <Message
                  key={message.id}
                  sent={message.sender === contractorId}
                >
                  <MessageContent sent={message.sender === contractorId}>
                    {message.message}
                  </MessageContent>
                  <MessageSender>
                    {message.sender === contractorId ? "You" : "Owner"}:{" "}
                    {message.sender === contractorId ? contractorId : ownerId}
                  </MessageSender>
                </Message>
              ))}
          </MessageContainer>

          <InputContainer>
            <Input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress} // Call sendMessage when Enter key is pressed
              placeholder="Type your message..."
            />
            <Button onClick={sendMessage}>Send</Button>
          </InputContainer>
        </Container>
      </ContentWrapper>
      <Footer />
    </Wrapper>
  );
}
