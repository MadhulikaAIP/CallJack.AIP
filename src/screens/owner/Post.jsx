import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Footer from "./Footer";
import TopNavbar from "./TopNavbar";
import { Link } from "react-router-dom";
import data from "../../assets/data/data.json"; // Import the JSON data


export default function JobPostPage() {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [capacity, setCapacity] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const [cost, setCost] = useState("");
  const [location, setLocation] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { provinces, cities } = data;

  const [filteredCities, setFilteredCities] = useState(cities); // Initialize filtered cities with all cities

 

  const handleCityChange = (selectedCity) => {
    // Find the corresponding province for the selected city
    const selectedCityObject = cities.find((city) => city.name === selectedCity);
    const selectedProvinceId = selectedCityObject?.provinceId;
    const selectedProvince = provinces.find((province) => province.id === selectedProvinceId)?.name;
    
    // Set the selected city and province in the state
    setCity(selectedCity);
    setState(selectedProvince);
  };

  useEffect(() => {
    // Update the filtered cities based on the selected province
    if (state) {
      setFilteredCities(cities.filter((city) => city.provinceId === provinces.find((p) => p.name === state)?.id));
    } else {
      setFilteredCities(cities);
    }
  }, [state, cities, provinces]);


  const handleJobPost = (event) => {
    event.preventDefault(); // Prevent form submission

    // Check if any required fields are empty
    if (
      !jobTitle ||
      !jobDescription ||
      !capacity ||
      !timePeriod ||
      !cost ||
      !location ||
      !pincode ||
      !city||
      !state ||
      !country
    ) {
      setError("Please fill in all the fields.");
      return;
    }

    // Create a new job object with the entered details
    const newJob = {
      jobTitle,
      jobDescription,
      capacity,
      timePeriod,
      cost,
      location,
      pincode,
      city,
      state,
      country,
    };

    // Send a POST request to your backend API
    axios
      .post("/jobs", newJob)
      .then((response) => {
        console.log("Job Posted!", response.data);
        // Reset the form fields
        setJobTitle("");
        setJobDescription("");
        setCapacity("");
        setTimePeriod("");
        setCost("");
        setLocation("");
        setPincode("");
        setCity("");
        setState("");
        setCountry("");
        setError("");
        setSuccessMessage("Job posted successfully!");
        // Show success alert
        alert("Job posted successfully!");
      })
      .catch((error) => {
        console.error("Error posting job:", error);
        setError("Failed to post the job. Please try again later.");
        // Show error alert
        alert("Failed to post the job. Please try again later.");
      });
  };

  return (
    <Wrapper>
      <TopNavbar />
      <MainContent>
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
        <ContentWrapper>
          <ContentHeader>
            <HeaderP>Post a Construction Job</HeaderP>
          </ContentHeader>
          <JobForm onSubmit={handleJobPost}>
            <FormItem>
              <Label>Job Title *</Label>
              <Input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Enter job title"
                required
              />
            </FormItem>
            <FormItem>
              <Label>Job Description *</Label>
              <Textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Enter job description"
                required
              />
            </FormItem>
            <FormItem>
              <Label>Capacity *</Label>
              <Input
                type="text"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="Enter capacity"
                required
              />
            </FormItem>
            <FormItem>
              <Label>Time Period *</Label>
              <Input
                type="text"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                placeholder="Enter time period"
                required
              />
            </FormItem>
            <FormItem>
              <Label>Cost *</Label>
              <Input
                type="text"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                placeholder="Enter cost"
                required
              />
            </FormItem>
            <FormItem>
              <Label>Location *</Label>
              <Input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
                required
              />
            </FormItem>
            <FormItem>
              <Label>Pincode *</Label>
              <Input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter pincode"
                required
              />
            </FormItem>
            <FormItem>
              <Label>City *</Label>
              <select value={city} onChange={(e) => handleCityChange(e.target.value)} required>
                <option value="">Select City</option>
                {filteredCities.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </FormItem>
            <FormItem>
              <Label>Province *</Label>
              <select value={state} onChange={(e) => setState(e.target.value)} required>
                <option value="">Select Province</option>
                {provinces.map((province) => (
                  <option key={province.id} value={province.name}>
                    {province.name}
                  </option>
                ))}
              </select>
            </FormItem>
            <FormItem>
              <Label>Country *</Label>
              <Input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Enter country"
                required
              />
            </FormItem>
            <SubmitButton type="submit">Post Job</SubmitButton>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
          </JobForm>
        </ContentWrapper>
      </MainContent>
      <FooterWrapper>
          <Footer />
          </FooterWrapper>
    </Wrapper>
  );
}

// Styled components and styling code...

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const MainContent = styled.div`
  flex-grow: 1;
  display: flex;
  padding-top: 64px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftSidebar = styled.div`
background-color: black;
  margin-top: 20px;
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
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ContentHeader = styled.div`
  margin-bottom: 20px;
  padding: 0px;
  background-color: lightgrey;
  color: black;
  border-radius: 10px 10px 0 0;
`;

const HeaderP = styled.p`
  font-size: 25px;
  font-weight: bold;
  margin: 0 0 0 600px;

`;

const JobForm = styled.form`
  max-width: 500px;
  margin: 0 auto;
`;

const FormItem = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  background-color: black;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background-color: lightgrey;
  }
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  font-weight: bold;
`;

const SuccessMessage = styled.p`
  color: #28a745;
  font-weight: bold;
`;
const FooterWrapper = styled.footer`
margin-top: 0px;
margin-left: 0px;
`;
// End of the file...
