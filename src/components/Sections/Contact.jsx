import React, { useState }  from "react";
import styled from "styled-components";
import axios from "axios"; // Import Axios
// Assets
import ContactImg1 from "../../assets/img/logo.jpeg";
import ContactImg2 from "../../assets/img/add/b.png";
import ContactImg3 from "../../assets/img/contact-3.png";

export default function Contact() {
  const [formData, setFormData] = useState({
    fname: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log(formData);
    // Make an API request to store the data in the database
    axios.post("/api/sendMessage", formData) // Replace "/api/sendMessage" with the actual endpoint URL for sending messages
      .then((response) => {
        console.log("Message sent successfully:", response.data);
        // Optionally, you can reset the form after successful submission
        setFormData({
          fname: "",
          email: "",
          subject: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  return (
    <Wrapper id="contact">
      <div className="lightBg">
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Let's get in touch</h1>
            <p className="font13">
            Please fill out the form below to send us an email and we will   
              <br />
              get back to you as soon as possible.
            </p>
          </HeaderInfo>
          <div className="row" style={{ paddingBottom: "30px" }}>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <Form onSubmit={handleSubmit}>
                <label className="font13">Full name:</label>
                <input type="text" id="fname" name="fname" className="font20 extraBold" style={{color:"black"}} value={formData.fname}
                 onChange={handleChange} />
                <label className="font13">Email:</label>
                <input type="text" id="email" name="email" className="font20 extraBold"  value={formData.email}
                  onChange={handleChange}/>
                <label className="font13">Subject:</label>
                <input type="text" id="subject" name="subject" className="font20 extraBold" value={formData.subject}
                  onChange={handleChange} />
                <textarea rows="4" cols="50" type="text" id="message" name="message" className="font20 extraBold" value={formData.message}
                  onChange={handleChange}/>
              <SumbitWrapper className="flex">
                <ButtonInput type="submit" value="Send Message" className="pointer animate radius8" style={{ maxWidth: "200px",paddingTop:"9px",backgroundColor:"black",color:"white" }} />
              </SumbitWrapper>
              </Form>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 flex">
              <div style={{ width: "50%" }} className="flexNullCenter flexColumn">
                <ContactImgBox>
                  <img src={ContactImg1} alt="office" className="radius6" />
                </ContactImgBox>
                <ContactImgBox>
                  <img src={ContactImg2} alt="office" className="radius6" />
                </ContactImgBox>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;
const HeaderInfo = styled.div`
  padding: 70px 0 30px 0;
  @media (max-width: 860px) {
    text-align: center;
  }
`;
const Form = styled.form`
  padding: 70px 0 30px 0;
  input,
  textarea {
    width: 100%;
    background-color: white;
    border: 1px;
    outline: none;
    box-shadow: none;
    border-bottom: 1px solid #707070;
    height: 30px;
    margin-bottom: 30px;
  }
  textarea {
    min-height: 100px;
  }
  @media (max-width: 860px) {
    padding: 30px 0;
  }
`;
const ButtonInput = styled.input`
  border: 1px solid black;
  background-color: black;
  width: 100%;
  padding: 15px;
  outline: none;
  color: #fff;
  font-weight: bold;
  :hover {
    background-color: grey;
    border: 1px solid white;
    color: #fff;
  }
  @media (max-width: 991px) {
    margin: 0 auto;
  }
`;
const ContactImgBox = styled.div`
  max-width: 180px; 
  align-self: flex-end; 
  margin: 10px 30px 10px 0;
`;
const SumbitWrapper = styled.div`
  @media (max-width: 991px) {
    width: 100%;
    margin-bottom: 50px;
  }
`;









