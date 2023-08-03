import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

// Components
import Footer from "./Footer";
import TopNavbar from "./TopNavbar";

// Assets
import ContractorImage from "../../assets/img/nof.jpg";

export default function ContractorPage() {
  const [currentTime, setCurrentTime] = useState("");
  const [contractorDetails, setContractorDetails] = useState({});
  const [contractorId, setContractorId] = useState("");
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // state for search
  const [filter, setFilter] = useState("all"); //state for filter
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate(); // Use the useNavigate hook

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const timeString = date.toLocaleTimeString();
      setCurrentTime(timeString);
    }, 1000);

    // Fetch posted jobs data
    const fetchPostedJobs = async () => {
      try {
        const response = await fetch("/api/jobs");
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.log(error);
      }
    };
    // Fetch contractor details
    const fetchContractorDetails = async () => {
      try {
        const response = await fetch("/api/contractor/current"); // Replace with the appropriate API endpoint
        const data = await response.json();
        setContractorDetails(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchContractorId = async () => {
      try {
        const response = await fetch("/api/contractor/current");
        const data = await response.json();
        setContractorId(data.id);
      } catch (error) {
        console.log(error);
      }
    };

    fetchContractorDetails();
    fetchPostedJobs();
    fetchContractorId();

    return () => {
      clearInterval(interval);
    };
  }, []);

  const acceptJob = async (id) => {
    try {
      const response = await fetch(`/api/jobs/${id}/accept`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contractorId }),
      });

      if (response.ok) {
        console.log("Job accepted successfully");
      } else {
        console.log("Failed to accept job:", response.status);
      }
    } catch (error) {
      console.log("Error accepting job:", error);
    }
  };

  const navigateToChat = (ownerId) => {
    // Logic to establish a personal chat between the job owner (ownerId) and the contractor (contractorId)
    console.log(`Establishing chat between job owner ${ownerId} and contractor ${contractorId}`);

    // Navigate to the chat page with ownerId and contractorId as query parameters
    navigate(`/contractor/messages?ownerId=${ownerId}&contractorId=${contractorId}`);
  };

  // Function to handle the form submission for updating contractor details
  const handleUpdateContractorDetails = async (updatedDetails) => {
    try {
      const response = await fetch("/api/contractor/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDetails),
      });

      if (response.ok) {
        // Update the contractorDetails state with the new details
        setContractorDetails({ ...contractorDetails, ...updatedDetails });

        // Close the edit modal
        setShowEditModal(false);
      } else {
        console.log("Failed to update contractor details.");
      }
    } catch (error) {
      console.log(error);
    }
  };

   // Function to handle the search query input
   const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle the filter selection
  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);

  // Clear search query when a filter is selected
  if (
    selectedFilter === "filterTitle" ||
    selectedFilter === "filterTime" ||
    selectedFilter === "filterCost" ||
    selectedFilter === "filterLocation"
  ) {
    setSearchQuery("");
  }
  };

  const filteredJobs = jobs.filter((job) => {
    const searchMatch =
      job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.jobDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.timePeriod.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.cost.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
  
    if (filter === "all") {
      return searchMatch;
    } else if (filter === "filterTitle") {
      return job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (filter === "filterTime") {
      return job.timePeriod.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (filter === "filterCost") {
      return job.cost.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (filter === "filterLocation") {
      return job.location.toLowerCase().includes(searchQuery.toLowerCase());
    } else {
      return job.status === filter && searchMatch;
    }
  });
  

  return (
    <Wrapper>
      <TopNavbar />
      <LeftSidebar>
        <SidebarNav>
          <NavItem>
            <Link to="/contractor">Dashboard</Link>
          </NavItem>
          <NavItem>
            <Link to="/contractor/jobs">Jobs</Link>
          </NavItem>
          <NavItem>
            <Link to="/contractor/payment">Payment Info</Link>
          </NavItem>
          <NavItem>
            <Link to="/contractor/posted">Accepted-jobs</Link>
          </NavItem>
        </SidebarNav>
      </LeftSidebar>
      <ContentWrapper>
        <ContractorSection>
          <ContractorProfile>
            <ContractorImageWrapper>
              <ContractorImg src={ContractorImage} alt="Contractor" />
            </ContractorImageWrapper>
            <ContractorInfo>
              <ContractorName>
                Welcome Contractor - {contractorDetails.username}
              </ContractorName>
              <ContractorDetails>
              <span style={{ fontWeight: "bold", fontSize: "18px" }}>Role:</span> {contractorDetails.role}
                <br />
                <span style={{ fontWeight: "bold", fontSize: "18px" }}>Phone Number:</span> {contractorDetails.phone_number}
                <br />
                <span style={{ fontWeight: "bold", fontSize: "18px" }}>Experience:</span> {contractorDetails.experience}
                <br />
                <span style={{ fontWeight: "bold", fontSize: "18px" }}>Charges:</span> {contractorDetails.reputation}
                <br />
                <span style={{ fontWeight: "bold", fontSize: "18px" }}>Bio:</span> {contractorDetails.bio}
                <br />
                <span style={{ fontWeight: "bold", fontSize: "18px" }}>Field of Work:</span> {contractorDetails.field_of_work}
              </ContractorDetails>
              <CurrentTime>{currentTime}</CurrentTime>
              <EditButton onClick={() => setShowEditModal(true)}>
                Edit Profile
              </EditButton>
            </ContractorInfo>
          </ContractorProfile>
        </ContractorSection>
        <MainContent>
          <h2>Search for Jobs</h2>
          {/* Add search input and filter */}
          <SearchAndFilter>
            <SearchInput
              type="text"
              placeholder="Search for jobs..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <FilterSelect value={filter} onChange={handleFilterChange}>
              <option value="all">All</option>
              <option value="filterTitle">Job Title</option>
              <option value="filterTime">Job Time Period</option>
              <option value="filterCost">Job Cost</option>
              <option value="filterLocation">Job Location</option>
            </FilterSelect>
          </SearchAndFilter>
          {filteredJobs.length > 0 ? (
            <JobCardWrapper>
              {filteredJobs.map((job) => (
                <JobCard key={job.id}>
                  <JobTitle>{job.jobTitle}</JobTitle>
                  <JobDescription>{job.jobDescription}</JobDescription>
                  <JobDetails>
                    <p><span style={{ fontWeight: "bold", fontSize: "16px" }}>Owner:</span> {job.ownerName}</p>
                    {/* Display additional job details */}
                    <p><span style={{ fontWeight: "bold", fontSize: "16px" }}>Capacity:</span> {job.capacity}</p>
                    <p><span style={{ fontWeight: "bold", fontSize: "16px" }}>Time Period:</span> {job.timePeriod}</p>
                    <p><span style={{ fontWeight: "bold", fontSize: "16px" }}>Cost:</span> {job.cost}</p>
                    <p><span style={{ fontWeight: "bold", fontSize: "16px" }}>Location:</span> {job.location}</p>
                    {/* Add any other relevant job details */}
                  </JobDetails>
                  <ButtonWrapper>
                    <AcceptButton onClick={() => acceptJob(job.id)}>Accept Job</AcceptButton>
                    <MessageButton onClick={() => navigateToChat(job.ownerId)}>Message</MessageButton>
                  </ButtonWrapper>
                </JobCard>
              ))}
            </JobCardWrapper>
          ) : (
            <NoJobsMessage>No jobs posted</NoJobsMessage>
          )}
        </MainContent>

        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </ContentWrapper>
       {/* Conditionally render the EditModal */}
       {showEditModal && (
        <EditModal
          contractorDetails={contractorDetails}
          onUpdateContractor={handleUpdateContractorDetails}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </Wrapper>
  );
}


const EditModal = ({ contractorDetails, onUpdateContractor, onClose }) => {
  const [editedDetails, setEditedDetails] = useState({ ...contractorDetails });

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
    onUpdateContractor(editedDetails);
  };

  return (
    <ModalBackground>
      <ModalContent>
        <h2>Edit Contractor Details</h2>
        <form onSubmit={handleSubmit}>
          {/* Add input fields for editing contractor details */}
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
            <label htmlFor="role">Role:</label>
            <input
              type="text"
              name="role"
              value={editedDetails.role}
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
          <div>
            <label htmlFor="experience">Experience:</label>
            <input
              type="text"
              name="experience"
              value={editedDetails.experience}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="reputation">Charges:</label>
            <input
              type="text"
              name="charges"
              value={editedDetails.reputation}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="bio">Bio:</label>
            <textarea
              name="bio"
              value={editedDetails.bio}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="field_of_work">Field of Work:</label>
            <input
              type="text"
              name="field_of_work"
              value={editedDetails.field_of_work}
              onChange={handleChange}
            />
          </div>
          {/* ... Other input fields for contractor details ... */}
          <ButtonWrapper>
            <CancelButton type="button" onClick={onClose}>
              Cancel
            </CancelButton>
            <UpdateButton type="submit">Update</UpdateButton>
          </ButtonWrapper>
        </form>
      </ModalContent>
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

const ContractorSection = styled.section`
  display: absolute;
  justify-content: center;
  margin-left: 10px;
  margin-right: 20px;
  margin-top: 90px;
`;

const ContractorProfile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  border: 2px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  transition: box-shadow 0.3s ease;
  background-color: lightgray;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
`;

const ContractorImageWrapper = styled.div`
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 10%;
`;

const ContractorImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ContractorInfo = styled.div`
  margin-left: 20px;
`;

const ContractorName = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-left: 30px;
`;

const ContractorDetails = styled.p`
  font-size: 16px;
  line-height: 1.5rem;
  margin-left: 30px;
`;

const CurrentTime = styled.p`
  font-size: 14px;
  color: gray;
  margin-top: 10px;
  margin-left: 30px;
`;

const FooterWrapper = styled.footer`
  margin-top: auto;
  margin-left: -500px;
`;
 
const EditButton = styled.button`
  background-color: #33383c;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
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

const ModalContent = styled.div`
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

const ButtonWrapper = styled.div`
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
  ModalContent,
  ButtonWrapper,
  CancelButton,
  UpdateButton,
  // Add other styled components as needed
};


const MainContent = styled.div`
  padding: 40px;
`;

const SearchAndFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
`;

const FilterSelect = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;
`;

const JobCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const JobCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  background-color:rgb(204, 204, 204);
`;

const JobTitle = styled.h3`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const JobDescription = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
`;

const JobDetails = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`;

const AcceptButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
`;

const MessageButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const NoJobsMessage = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

export {
  MainContent,
  SearchAndFilter,
  SearchInput,
  FilterSelect,
  JobCardWrapper,
  JobCard,
  JobTitle,
  JobDescription,
  JobDetails,
  AcceptButton,
  MessageButton,
  NoJobsMessage,
};
