import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Footer from "./Footer";
import TopNavbar from "./TopNavbar";
import { Link } from "react-router-dom";

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
`;

const ChatItem = styled.div`
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: ${(props) => (props.selected ? '#f0f0f0' : 'transparent')};

  &:hover {
    background-color: #f0f0f0;
  }

  p {
    margin: 5px 0;
  }
`;

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

const SendMessageContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;

  input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
  }

  button {
    padding: 10px 20px;
    border: none;
    background-color: #007bff;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
  }

  p {
    color: red;
    margin-top: 10px;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ChatPopup = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  width: 100%;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatTitle = styled.h2`
  margin: 0;
`;

const ChatCloseButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 20px;
  cursor: pointer;
`;

const ChatContent = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

const SentMessage = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 5px 0;
`;

const ReceivedMessage = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 5px 0;
`;

const MessageBubble = styled.div`
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  border-radius: 8px;
`;

const ChatInputContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
`;

const ChatSendButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
`;

const FooterWrapper = styled.footer`
margin-top: 760px;
margin-left: -500px;
`;

const Messages = () => {
  const [chatInbox, setChatInbox] = useState([]);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [sendMessageError, setSendMessageError] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isChatPopupOpen, setChatPopupOpen] = useState(false);

  const fetchChatInbox = async () => {
    try {
      const ownerResponse = await fetch('/api/owner/current');
      const ownerData = await ownerResponse.json();

      const ownerId = ownerData.id;

      const chatInboxResponse = await fetch(`/api/chat/inbox/owner/${ownerId}`);
      const chatInboxData = await chatInboxResponse.json();

      setChatInbox(chatInboxData);
    } catch (error) {
      console.log('Error fetching chat inbox:', error);
    }
  };

  useEffect(() => {
    fetchChatInbox();
  }, []);

  const handleContractorClick = async (contractorId) => {
    setSelectedContractor(contractorId);

    try {
      const response = await fetch(`/api/chat/messages/${contractorId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch chat messages');
      }
      const data = await response.json();
      setChatMessages(data.messages);
      setChatPopupOpen(true);
    } catch (error) {
      console.log('Error fetching chat messages:', error);
    }
  };

  const handleSendMessage = async () => {
    try {
      const ownerResponse = await fetch('/api/owner/current');
      const ownerData = await ownerResponse.json();

      const ownerId = ownerData.id;

      const response = await fetch('/api/chat/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderId: ownerId,
          receiverId: selectedContractor,
          message: messageInput,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      // Clear the message input and reset the selected contractor
      setMessageInput('');
      setSendMessageError('');
      // Fetch the updated chat messages
      handleContractorClick(selectedContractor);
    } catch (error) {
      console.log('Error sending message:', error);
      setSendMessageError('Failed to send message');
    }
  };

  const handleCloseChatPopup = () => {
    setChatPopupOpen(false);
    setSelectedContractor(null);
    setChatMessages([]);
  };

  const uniqueSenders = [...new Set(chatInbox.map((chat) => chat.senderId))];

   const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <Wrapper>
      <TopNavbar />
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
            <Link to="/owner/message">Messages</Link>
          </NavItem>
        </SidebarNav>
      </LeftSidebar>

      <Container>
        <h1>Chat Inbox</h1>
        {uniqueSenders.map((senderId) => {
          const latestChat = chatInbox.find((chat) => chat.senderId === senderId);
          return (
            <ChatItem
              key={latestChat.id}
              selected={selectedContractor === latestChat.senderId}
              onClick={() => handleContractorClick(latestChat.senderId)}
            >
              <p>Sender: {latestChat.senderId}</p>
              <p>Message: {latestChat.message}</p>
              <p>Timestamp: {latestChat.timestamp}</p>
              <hr />
            </ChatItem>
          );
        })}
        {isChatPopupOpen && (
          <Overlay>
            <ChatPopup>
              <ChatHeader>
                <ChatTitle>Chat with Contractor: {selectedContractor}</ChatTitle>
                <ChatCloseButton onClick={handleCloseChatPopup}>X</ChatCloseButton>
              </ChatHeader>
              <ChatContent>
                {chatMessages.map((chat) => (
                  <div key={chat.id}>
                    {chat.senderId === selectedContractor ? (
                      <ReceivedMessage>
                      <MessageBubble>{chat.message}</MessageBubble>
                    </ReceivedMessage>
                      
                    ) : (
                      <SentMessage>
                        <MessageBubble>{chat.message}</MessageBubble>
                      </SentMessage>
                    )}
                    <hr />
                  </div>
                ))}
              </ChatContent>
              <ChatInputContainer>
                <ChatInput
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={handleKeyPress} // Call sendMessage when Enter key is pressed
                  placeholder="Type your message..."
                />
                <ChatSendButton onClick={handleSendMessage}>Send</ChatSendButton>
              </ChatInputContainer>
              {sendMessageError && <p>{sendMessageError}</p>}
            </ChatPopup>
          </Overlay>
        )}
        <FooterWrapper>
        <Footer />
        </FooterWrapper>
        
      </Container>
    </Wrapper>
  );
};

export default Messages;
