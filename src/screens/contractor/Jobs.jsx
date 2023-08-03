import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import Footer from "./Footer";
import TopNavbar from "./TopNavbar";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [contractorId, setContractorId] = useState("");
  const navigate = useNavigate(); // Use the useNavigate hook

  useEffect(() => {
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

    const fetchContractorId = async () => {
      try {
        const response = await fetch("/api/contractor/current");
        const data = await response.json();
        setContractorId(data.id);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPostedJobs();
    fetchContractorId();
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
              <Link to="/contractor/payment">Payment Info</Link>
            </NavItem>
            <NavItem>
            <Link to="/contractor/posted">Accepted-jobs</Link>
          </NavItem>
          </SidebarNav>
        </LeftSidebar>
        <MainContent>
          <h2>Posted Jobs</h2>
          {jobs.length > 0 ? (
            <JobCardWrapper>
              {jobs.map((job) => (
                <JobCard key={job.id}>
                  <JobTitle>{job.jobTitle}</JobTitle>
                  <JobDescription>{job.jobDescription}</JobDescription>
                  <JobDetails>
                    <p>Owner: {job.ownerName}</p>
                    {/* Display additional job details */}
                    <p>Capacity: {job.capacity}</p>
                    <p>Time Period: {job.timePeriod}</p>
                    <p>Cost: {job.cost}</p>
                    <p>Location: {job.location}</p>
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
    font-weight:bold;

    transition: color 0.3s;

    &:hover {
      color: lightblue;
    }
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  margin-top:70px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const JobCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const JobCard = styled.div`
  background-color: #f4f4f4;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const JobTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const JobDescription = styled.p`
  font-size: 16px;
  line-height: 1.5rem;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const JobDetails = styled.div`
  margin-bottom: 20px;

  p {
    font-size: 14px;
    margin-bottom: 5px;

    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const AcceptButton = styled.button`
  background-color: green;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    background-color: darkgreen;
  }
`;

const MessageButton = styled.button`
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: darkblue;
  }
`;

const NoJobsMessage = styled.p`
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
