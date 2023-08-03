import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Footer from "./Footer";
import TopNavbar from "./TopNavbar";
import OwnerProfileImage from "../../assets/img/nof.jpg";
import SideBar from "./elements/SideBar";


export default function OwnerPage() {
  const [currentTime, setCurrentTime] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerDetails, setOwnerDetails] = useState("");
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [allContractors, setAllContractors] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const timeString = date.toLocaleTimeString();
      setCurrentTime(timeString);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const fetchOwnerInfo = async () => {
      try {
        const response = await fetch("/api/owner/current");
        if (!response.ok) {
          throw new Error("Error fetching owner's information");
        }
        const data = await response.json();
        console.log("Owner Details:", data);
        const ownerName = data.username;
        setOwnerDetails(data);
        setOwnerName(ownerName);
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error("Error fetching owner's information:", error);
        setError("Error fetching owner's information. Please try again later.");
      }
    };

    fetchOwnerInfo();
  }, []);

  useEffect(() => {
    const fetchContractors = async () => {
      try {
        const response = await fetch("/api/contractors");
        if (!response.ok) {
          throw new Error("Error fetching contractor information");
        }
        const data = await response.json();
        setAllContractors(data);  
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching contractor information:", error);
        setError("Error fetching contractor information. Please try again later.");
      }
    };

    fetchContractors();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Perform the search on the client-side
  if (query.trim() === "") {
    // If the search query is empty, display all contractors
    setSearchResults(allContractors);
  } else {
    // Perform the search on the client-side with filter criteria
    const filteredResults = allContractors.filter((contractor) => {
      
      // Apply the selected filter criteria
      if (selectedFilter === 'all') {
        return contractor.username.toLowerCase().includes(query.toLowerCase());
      } else if (selectedFilter === 'name') {
        return contractor.username.toLowerCase().includes(query.toLowerCase());
      } else if (selectedFilter === 'email') {
        return contractor.email.toLowerCase().includes(query.toLowerCase());
      } else if (selectedFilter === 'work') {
        return contractor.field_of_work.toLowerCase().includes(query.toLowerCase());
      } else if (selectedFilter === 'experience') {
        return contractor.experience.toLowerCase().includes(query.toLowerCase());
      }else {
        // Add more filter criteria as needed
        return contractor.username.toLowerCase().includes(query.toLowerCase());
      }
    });
    setSearchResults(filteredResults);
  }
  };

  const openContractorDetails = (contractor) => {
    setSelectedContractor(contractor);
  };

  const closeContractorDetails = () => {
    setSelectedContractor(null);
  };

  const viewAllContractors = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleFilterChange = (event) => {
    const filter = event.target.value;
    setSelectedFilter(filter);
  };

   // Function to handle the form submission for updating owner details
   const handleUpdateOwnerDetails = async (updatedDetails) => {
    try {
      const response = await fetch("/api/owner/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDetails),
      });

      if (response.ok) {
        // Update the ownerDetails state with the new details
        setOwnerDetails({ ...ownerDetails, ...updatedDetails });

        // Close the edit modal
        setShowEditModal(false);
      } else {
        console.log("Failed to update owner details.");
      }
    } catch (error) {
      console.log(error);
    }
  };


  const renderContractorDetails = () => {
    if (selectedContractor) {
      return (
        <ContractorModal>
          <ModalContent>
            <ModalCloseButton onClick={closeContractorDetails}>
              X
            </ModalCloseButton>
            <ContractorDetails>
              <h3>{selectedContractor.username}</h3>
              <p>Email: {selectedContractor.email}</p>
              <p>Phone Number: {selectedContractor.phone_number}</p>
              <p>Experience: {selectedContractor.experience}</p>
              <p>Bio: {selectedContractor.bio}</p>
              <p>Work: {selectedContractor.field_of_work}</p>
              {/* Render other contractor details */}
            </ContractorDetails>
          </ModalContent>
        </ContractorModal>
      );
    }
    return null;
  };

  return (
    <Wrapper>
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

      <ContentWrapper>
        <TopNavbar />
        <OwnerSection>
          <OwnerProfile>
          <OwnerAvatar src={OwnerProfileImage} alt="Owner Profile" />
            <OwnerInfo>
              <OwnerName>Welcome Owner- {ownerDetails.username}</OwnerName>
              <OwnerDetails>
              <span style={{ fontWeight: "bold", fontSize: "18px" }}>Role:</span> {ownerDetails.role}
                <br />
                <span style={{ fontWeight: "bold", fontSize: "18px" }}>Phone Number:</span> {ownerDetails.phone_number}
                <br />
                <span style={{ fontWeight: "bold", fontSize: "18px" }}>Email:</span> {ownerDetails.email}
              </OwnerDetails>
              <CurrentTime>Current Time: {currentTime}</CurrentTime>
              <EditButton onClick={() => setShowEditModal(true)}>
                Edit Profile
              </EditButton>
            </OwnerInfo>
          </OwnerProfile>
        </OwnerSection>

        <SearchSection>
          <SearchTitle>Find Contractors</SearchTitle>
          <SearchBar
            type="text"
            placeholder="Search contractors..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <SearchFilter>
            <label htmlFor="filter">Filter by:</label>
            <select id="filter" value={selectedFilter} onChange={handleFilterChange}>
              <option value="all">All</option>
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="work">Work</option>
              <option value="experience">Experience</option>
              {/* Add more filter options as needed */}
            </select>
          </SearchFilter>
          {searchResults.length > 0 && (
            <SearchResults>
              {searchResults.map((contractor) => (
                <ContractorCard
                  key={contractor.id}
                  contractor={contractor}
                  onViewDetails={() => openContractorDetails(contractor)}
                />
              ))}
            </SearchResults>
          )}
          {searchResults.length === 0 && (
            <NoResultsMessage>No contractors found.</NoResultsMessage>
          )}
        </SearchSection>

        {renderContractorDetails()}

        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </ContentWrapper>
       {/* Conditionally render the EditModal */}
       {showEditModal && (
        <EditModal
          ownerDetails={ownerDetails}
          onUpdateOwner={handleUpdateOwnerDetails}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </Wrapper>
  );
}

const EditModal = ({ ownerDetails, onUpdateOwner, onClose }) => {
  const [editedDetails, setEditedDetails] = useState({ ...ownerDetails });

  // Function to handle changes in the input fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateOwner(editedDetails);
  };

  return (
    <ModalBackground>
      <ModalContents>
        <h2>Edit Owner Details</h2>
        <form onSubmit={handleSubmit}>
          {/* Add input fields for editing owner details */}
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              value={editedDetails.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={editedDetails.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="phone_number">Phone Number:</label>
            <input
              type="text"
              name="phone_number"
              value={editedDetails.phone_number}
              onChange={handleChange}
            />
          </div>
          {/* ... Other input fields for contractor details ... */}
          <ButtonWrappers>
            <CancelButton type="button" onClick={onClose}>
              Cancel
            </CancelButton>
            <UpdateButton type="submit">Update</UpdateButton>
          </ButtonWrappers>
        </form>
      </ModalContents>
    </ModalBackground>
  );
};



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
    font-weight:bold;

    transition: color 0.3s;

    &:hover {
      color: lightblue;
    }
  }
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const OwnerSection = styled.section`
  display: absolute;
  justify-content: center;
  margin-left: 10px;
  margin-right: 20px;
  margin-top: 90px;
  color
`;

const OwnerProfile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  border: 2px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  transition: box-shadow 0.3s ease;
  background-color:lightgrey;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
`;

const OwnerInfo = styled.div`
  margin-left: 20px;
`;

const OwnerName = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
`;
const OwnerDetails = styled.p`
  font-size: 16px;
  line-height: 1.5rem;
  margin-left: 30px;
`;
const CurrentTime = styled.p`
  font-size: 14px;
  color: gray;
  margin-top: 10px;
`;

const SearchSection = styled.section`
  margin-top: 20px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url("src/assets/img/add/no.png");
`;

const SearchFilter = styled.div`
  margin-bottom: 10px;
  label {
    margin-right: 5px;
  }
  select {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;

const SearchTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
`;

const SearchBar = styled.input`
  width: 300px;
  height: 40px;
  border-radius: 20px;
  border: 3px solid #ccc;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
`;
const OwnerAvatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;
const ViewAllButton = styled.button`
  background-color: lightblue;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  margin-bottom: 10px;
`;

const SearchResults = styled.div`
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const NoResultsMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

const ContractorCard = ({ contractor, onViewDetails }) => {
  return (
    <CardWrapper>
      <OwnerAvatar src={OwnerProfileImage} alt="Owner Profile" />
      <ContractorName>{contractor.username}</ContractorName>
      <ContractorInfo>
        <p>
        <span style={{ fontWeight: "bold", fontSize: "18px" }}>Email:</span>{" "} 
        <span style={{ fontStyle: "italic", color: "black" }}>
        {contractor.email}
        </span>
        </p>
        <p><span style={{ fontWeight: "bold", fontSize: "18px" }}>Phone Number:</span>{" "} 
        <span style={{ fontStyle: "italic", color: "black" }}>
        {contractor.phone_number}
        </span> 
        </p>
        <p><span style={{ fontWeight: "bold", fontSize: "18px" }}>Experience:</span>{" "} 
        <span style={{ fontStyle: "italic", color: "black" }}>
        {contractor.experience}
        </span>  
        </p>
        <p><span style={{ fontWeight: "bold", fontSize: "18px" }}>Bio:</span>{" "} 
        <span style={{ fontStyle: "italic", color: "black" }}>
        {contractor.bio}
        </span>   
        </p>
        <p><span style={{ fontWeight: "bold", fontSize: "18px" }}>Work:</span>{" "} 
        <span style={{ fontStyle: "italic", color: "black" }}>
        {contractor.field_of_work}
        </span>   
        </p>
        {/* Display other contractor information */}
      </ContractorInfo>
      <ButtonWrapper>
        <ContractorButton onClick={onViewDetails}>View</ContractorButton>
      </ButtonWrapper>
    </CardWrapper>
  );
};

const ChatPopup = ({ contractor, onClose }) => {
  return (
    <ChatContainer>
      <ChatHeader>
        <h3>Chat with {contractor.username}</h3>
        <CloseButton onClick={onClose}>X</CloseButton>
      </ChatHeader>
      {/* Add chat messages and input form here */}
    </ChatContainer>
  );
};

const ChatContainer = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 20px;
  max-width: 400px;
  width: 100%;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const CardWrapper = styled.div`
  width: 100%;
  background-color: lightgrey;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ContractorName = styled.h3`
  margin-bottom: 10px;
`;

const ContractorInfo = styled.div`
  /* Styles for contractor information */
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ContractorButton = styled.button`
  background-color: #65787D;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight:bold;
`;

const ContractorModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  position: relative;
  width: 400px;
  max-width: 90%;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const ContractorDetails = styled.div`
  /* Styles for contractor details */
`;

const FooterWrapper = styled.footer`
margin-top: auto;
margin-left: -500px;
`;

const EditButton = styled.button`
  background-color: #65787D;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight:bold;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContents = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 400px;

  h2 {
    font-size: 24px;
    margin-bottom: 15px;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  div {
    margin-bottom: 15px;
  }

  label {
    font-weight: bold;
    margin-bottom: 5px;
  }

  input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
    width: 100%;
  }
`;

const ButtonWrappers = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const CancelButton = styled.button`
  background-color: #f0f0f0;
  color: #333;
  padding: 8px 16px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-right: 10px;
`;

const UpdateButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

// Add other styled components as needed

export {
  ModalBackground,
  ModalContents,
  ButtonWrappers,
  CancelButton,
  UpdateButton,
  // Add other styled components as needed
};
