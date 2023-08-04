import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import TopNavbar from './TopNavbar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';



const Posted = () => {
  const [postedJobs, setPostedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [editingJobId, setEditingJobId] = useState(null);

  // Add a state variable to store the updated job list
  const [updatedPostedJobs, setUpdatedPostedJobs] = useState(postedJobs);

  const fetchPostedJobs = async () => {
    try {
      const ownerResponse = await fetch('/api/owner/current');
      const ownerData = await ownerResponse.json();

      const ownerId = ownerData.id;

      const postedJobsResponse = await fetch(`/api/jobs/owner/${ownerId}`);
      const postedJobsData = await postedJobsResponse.json();

      setPostedJobs(postedJobsData);
    } catch (error) {
      console.log('Error fetching posted jobs:', error);
    }
  };

  useEffect(() => {
    fetchPostedJobs();
  }, []);

  const handlePaymentClick = (jobId) => {
    const selectedJob = postedJobs.find((job) => job.id === jobId);
    navigateToCheckout(selectedJob);
  };

  const navigateToCheckout = (selectedJob) => {
    navigate('/owner/payment', { state: { selectedJob } });
  };

  const isPaymentSuccessful = (job) => {
    return job.Pay === 'successful';
  };

  const handleUpdateJob = (jobId, updatedData) => {
    setPostedJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === jobId ? { ...job, ...updatedData } : job))
    );
  };

  const JobCard = ({ job, onUpdate }) => {
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({ ...job });

  const isJobAvailable = job.status === 'available';
  const isJobPaymentSuccessful = job.Pay === 'successful';
  
    const handleEditClick = () => {
      setEditing(true);
    };
  
    const handleCancelEdit = () => {
      setFormData({ ...job });
      setEditing(false);
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleUpdateJob = async () => {
      try {
        // Make the API call to update the job in the database
        const response = await fetch(`/api/jobs/update/${job.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jobTitle: formData.jobTitle,
            jobDescription: formData.jobDescription,
            capacity: formData.capacity,
            timePeriod: formData.timePeriod,
            cost: formData.cost,
            location: formData.location,
          }),
        });
  
        if (!response.ok) {
          // Handle the API error, if any
          throw new Error('Failed to update the job.');
        }
  
        // Call the onUpdate function to update the job details in the parent component
        onUpdate(job.id, formData);
  
        // Exit edit mode
        setEditing(false);
      } catch (error) {
        console.log('Error updating the job:', error);
        // Handle error, e.g., show an error message to the user
      }
    };
  
    
  
    return (
      <tr>
        <td>
        {isJobAvailable || !isJobPaymentSuccessful ? (
           <button onClick={handleEditClick}>Edit</button>
          
        ):(
          <span>NA</span>
        )}
         {editing && (
            <div>
              <button onClick={handleUpdateJob}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          )}
        </td>
        <td>
          {editing ? (
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
            />
          ) : (
            <span>{job.jobTitle}</span>
          )}
        </td>
        <td>
          {editing ? (
            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleInputChange}
            />
          ) : (
            <span>{job.jobDescription}</span>
          )}
        </td>
        {/* Add other fields here, e.g., capacity, timePeriod, cost, location */}
        <td>
          {editing ? (
            <input
              type="text"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
            />
          ) : (
            <span>{job.capacity}</span>
          )}
        </td>
        <td>
          {editing ? (
            <input
              type="text"
              name="timePeriod"
              value={formData.timePeriod}
              onChange={handleInputChange}
            />
          ) : (
            <span>{job.timePeriod}</span>
          )}
        </td>
        <td>
          {editing ? (
            <input
              type="number"
              name="cost"
              value={formData.cost}
              onChange={handleInputChange}
            />
          ) : (
            <span>{job.cost}</span>
          )}
        </td>
        <td>
          {editing ? (
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
          ) : (
            <span>{job.location}</span>
          )}
        </td>
        <td>{job.status}</td>
        <td>{job.contractorId}</td>
        <td>{job.Pay}</td>
        <td>
        {job.status === 'accepted' && !isJobPaymentSuccessful ? (
          <button
            className="payment-button"
            onClick={() => handlePaymentClick(job.id)}
          >
            Payment
          </button>
        ) : job.status === 'available' ? (
          <span className="payment-message">Not yet accepted</span>
        ) : (
          <span className="payment-message">
            {isJobPaymentSuccessful ? 'Payment is successful' : ''}
          </span>
        )}
      </td>
      
      </tr>
    );
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
      {/* <MainContent> */}
        <TopNavbar />
        <Container>
          <Title>Posted Jobs</Title>
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Job Title</th>
                  <th>Job Description</th>
                  <th>Capacity</th>
                  <th>Time Period</th>
                  <th>Cost</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Contractor ID</th>
                  <th>Pay</th>
                  <th>Payment</th>
                </tr>
              </thead>
                <tbody>
                  {postedJobs.map((job) => (
                  <JobCard key={job.id} job={job} onUpdate={handleUpdateJob} />
                  ))}
                </tbody>
            </Table>
          </TableWrapper>
          {selectedJob && (
            <CardWrapper>
              <div>
                <h2>Job Details</h2>
                <p>Job ID: {selectedJob.id}</p>
                <p>Contractor ID: {selectedJob.contractorId}</p>
                <p>Job Title: {selectedJob.jobTitle}</p>
                <p>Job Description: {selectedJob.jobDescription}</p>
                <p>Job Cost: {selectedJob.cost}</p>
              </div>
              <CheckoutForm selectedJob={selectedJob} />
            </CardWrapper>
          )}
         <FooterWrapper>
          <Footer />
          </FooterWrapper>
        </Container>
        
      {/* </MainContent> */}
    </Wrapper>
  );
};

export default Posted;

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
  }

  th {
    background-color: #f0f0f0;
    font-weight: bold;
    font-size: 20px;
  }

  td {
    a {
      color: #007bff;
      text-decoration: none;
    }

    .payment-button {
      padding: 5px 10px;
      border: none;
      background-color: #007bff;
      color: #fff;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.3s;
      font-size: 18px;

      &:hover {
        background-color: #0056b3;
      }
    }

    .payment-successful {
      color: green;
      font-weight: bold;
    }
  }
`;

const CardWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const JobCard = styled.tr`
  background-color: #f0f0f0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    font-size: 18px;

    a {
      color: #007bff;
      text-decoration: none;
    }

    .payment-button {
      padding: 5px 10px;
      border: none;
      background-color: #007bff;
      color: #fff;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.3s;

      &:hover {
        background-color: #0056b3;
      }
    }

    .payment-successful {
      color: green;
      font-weight: bold;
    }
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
    font-weight:bold;

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

const FooterWrapper = styled.footer`
margin-top: 620px;
margin-left: -500px;
`;
