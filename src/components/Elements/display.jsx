import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 20px;
  background-color: #f8f8f8;
`;

const Section = styled.section`
  margin-bottom: 20px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchBar = styled.input`
  height: 40px;
  width: 300px;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const FilterSelect = styled.select`
  height: 40px;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  margin-left: 10px;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const Card = styled.div`
  position: relative;
  padding: 20px;
  background-color:  rgb(112 112 112 / 14%);
  border-radius: 5px;
  border: 1px solid;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 26px;
  font-weight: bold;
  color: #101715;
`;

const CardDescription = styled.p`
  margin: 10px 0;
  color: black;
`;

const ViewButton = styled.button`
  padding: 8px 16px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  cursor: pointer;
  font-weight:bold;

  &:hover {
    background-color: #0056b3;
  }
`;

const PopUpCard = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const PopUpContent = styled.div`
  position: relative;
  width: 80%;
  max-width: 600px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 8px 16px;
  margin-left: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const SearchIndex = () => {
  const navigate = useNavigate();
  const [contractors, setContractors] = useState([]);
  const [jobPosts, setJobPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContractors, setFilteredContractors] = useState([]);
  const [filteredJobPosts, setFilteredJobPosts] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loginPopupOpen, setLoginPopupOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchContractors();
    fetchJobPosts();
  }, []);

  useEffect(() => {
    filterContractors();
    filterJobPosts();
  }, [searchQuery, filter]);

  const fetchContractors = async () => {
    try {
      const response = await axios.get('/api/contractors');
      setContractors(response.data);
      setFilteredContractors(response.data);
    } catch (error) {
      console.log('Error fetching contractors:', error);
    }
  };

  const fetchJobPosts = async () => {
    try {
      const response = await axios.get('/api/jobs');
      setJobPosts(response.data);
      setFilteredJobPosts(response.data);
    } catch (error) {
      console.log('Error fetching job posts:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filterContractors = () => {
    const filteredContractors = contractors.filter((contractor) => {
      if (filter === 'all' || filter === 'contractor') {
        return contractor.username.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return false;
    });
    setFilteredContractors(filteredContractors);
  };

  const filterJobPosts = () => {
    const filteredJobPosts = jobPosts.filter((jobPost) => {
      if (filter === 'all' || filter === 'jobPost') {
        return jobPost.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return false;
    });
    setFilteredJobPosts(filteredJobPosts);
  };

  const openPopUp = (item) => {
    setSelectedItem(item);
  };

  const closePopUp = () => {
    setSelectedItem(null);
  };

  const openLoginPopup = () => {
    setLoginPopupOpen(true);
  };

  const closeLoginPopup = () => {
    setLoginPopupOpen(false);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/register');
  };

  return (
    <Container>
      <Section>
        <SectionTitle>Search Contractors and Jobs</SectionTitle>
        <SearchBarContainer>
          <SearchBar
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <FilterSelect value={filter} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="contractor">Contractors</option>
          <option value="jobPost">Jobs</option>
            {/* Add other filter options if needed */}
          </FilterSelect>
        </SearchBarContainer>
      </Section>

      <CardContainer>
        {/* Render the contractor cards */}
        {filteredContractors.map((contractor) => (
          <Card key={contractor.id}>
            {/* <ProfileImage src={contractor.profile_image} alt="Profile" /> */}
            <CardContent>
              <CardTitle>{contractor.username}</CardTitle>
              {/* <CardDescription>{contractor.email}</CardDescription>
              <CardDescription>{contractor.phone_number}</CardDescription> */}
              <CardDescription><span style={{ fontWeight:'bold', fontSize:'16px'}}>Contractor Experience: </span> {contractor.experience}</CardDescription>
              <CardDescription><span style={{ fontWeight:'bold', fontSize:'16px'}}>Contractor Charges: </span>{contractor.reputation}</CardDescription>
              <ViewButton onClick={() => openPopUp(contractor)}>View</ViewButton>
            </CardContent>
          </Card>
        ))}

        {/* Render the job post cards */}
        {filteredJobPosts.map((jobPost) => (
          <Card key={jobPost.id}>
            <CardContent>
              <CardTitle>{jobPost.jobTitle}</CardTitle>
              <CardDescription><span style={{ fontWeight:'bold', fontSize:'16px'}}>Job Description: </span> {jobPost.jobDescription}</CardDescription>
              <CardDescription><span style={{ fontWeight:'bold', fontSize:'16px'}}>Job Capacity: </span>{jobPost.capacity}</CardDescription>
              <CardDescription><span style={{ fontWeight:'bold', fontSize:'16px'}}>Job TimPeriod: </span>{jobPost.timePeriod}</CardDescription>
              <CardDescription><span style={{ fontWeight:'bold', fontSize:'16px'}}>Job Cost: </span>{jobPost.cost}</CardDescription>
              <CardDescription><span style={{ fontWeight:'bold', fontSize:'16px'}}>Job Location: </span>{jobPost.location}</CardDescription>
              <CardDescription><span style={{ fontWeight:'bold', fontSize:'16px'}}>Job Pincode: </span>{jobPost.pincode}</CardDescription>
              <CardDescription><span style={{ fontWeight:'bold', fontSize:'16px'}}>Job Province: </span>{jobPost.state}</CardDescription>
              <CardDescription><span style={{ fontWeight:'bold', fontSize:'16px'}}>Job Country: </span>{jobPost.country}</CardDescription>
              <ViewButton onClick={() => openPopUp(jobPost)}>View</ViewButton>
            </CardContent>
          </Card>
        ))}
      </CardContainer>

      {/* Render the pop-up card */}
      {selectedItem && (
        <PopUpCard>
          <PopUpContent>
            <Card>
              <CloseButton onClick={closePopUp}>Close</CloseButton>
              <CardContent>
                {selectedItem.username && (
                  <CardTitle>{selectedItem.username}</CardTitle>
                )}
               {/*  {selectedItem.email && (
                  <CardDescription>{selectedItem.email}</CardDescription>
                )}
                {selectedItem.phone_number && (
                  <CardDescription>{selectedItem.phone_number}</CardDescription>
                )} */}
                {selectedItem.experience && (
                  <CardDescription>{selectedItem.experience}</CardDescription>
                )}
                {selectedItem.reputation && (
                  <CardDescription>{selectedItem.reputation}</CardDescription>
                )}
                {selectedItem.profile_image && (
                  <ProfileImage src={selectedItem.profile_image} alt="Profile" />
                )}
                {selectedItem.jobTitle && (
                  <CardTitle>{selectedItem.jobTitle}</CardTitle>
                )}
                {selectedItem.jobDescription && (
                  <CardDescription>{selectedItem.jobDescription}</CardDescription>
                )}
                {selectedItem.capacity && (
                  <CardDescription>{selectedItem.capacity}</CardDescription>
                )}
                {selectedItem.timePeriod && (
                  <CardDescription>{selectedItem.timePeriod}</CardDescription>
                )}
                {selectedItem.cost && (
                  <CardDescription>{selectedItem.cost}</CardDescription>
                )}
                {selectedItem.location && (
                  <CardDescription>{selectedItem.location}</CardDescription>
                )}
                {selectedItem.pincode && (
                  <CardDescription>{selectedItem.pincode}</CardDescription>
                )}
                {selectedItem.state && (
                  <CardDescription>{selectedItem.state}</CardDescription>
                )}
                {selectedItem.country && (
                  <CardDescription>{selectedItem.country}</CardDescription>
                )}
                <ActionButtons>
                  <Button onClick={openLoginPopup}>Check</Button>
                </ActionButtons>
              </CardContent>
            </Card>
          </PopUpContent>
        </PopUpCard>
      )}

      {/* Render the login/signup pop-up */}
      {loginPopupOpen && (
        <PopUpCard>
          <PopUpContent>
            <Card>
              <CloseButton onClick={closeLoginPopup}>Close</CloseButton>
              <CardContent>
                <CardTitle>Login to see more</CardTitle>
                <ActionButtons>
                  <Button onClick={handleLogin}>Login</Button>
                  <Button onClick={handleSignup}>Signup</Button>
                </ActionButtons>
              </CardContent>
            </Card>
          </PopUpContent>
        </PopUpCard>
      )}
    </Container>
  );
};

export default SearchIndex;
