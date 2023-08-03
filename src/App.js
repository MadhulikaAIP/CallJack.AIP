import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Elements } from "react-stripe-elements";
// Screens
import Landing from "./screens/Landing.jsx";
import LoginPage from "./screens/LoginPage.jsx";
import ForgotPasswordPage from "./screens/ForgotPasswordPage";
import ResetPasswordPage from "./screens/ResetPasswordPage.jsx";
import RegistrationPage from "./screens/RegistrationPage.jsx";
import Owner from "./screens/owner/OwnerIndex.jsx";
import Post from "./screens/owner/Post.jsx";
import Messages from "./screens/owner/Messages.jsx";
import Payment from "./screens/owner/Payment.jsx";
import Profile from "./screens/owner/Profile.jsx";
import Settings from "./screens/owner/Settings.jsx";
import Contractor from "./screens/contractor/ContractorIndex.jsx";
import Jobs from "./screens/contractor/Jobs.jsx";
import Settingsc from "./screens/contractor/Settings.jsx";
import Profilec from "./screens/contractor/Profile.jsx";
import Message from "./screens/contractor/Message.jsx";
import Posted from "./screens/owner/posted.jsx";
import POsted from "./screens/contractor/accepted.jsx";
import HistoryP from "./screens/owner/History.jsx"
import Pay from "./screens/contractor/Payment.jsx";





export default function App() {
  return (
    <Router>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap" rel="stylesheet" />
      </Helmet>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
        <Route path="/reset-password" element={<ResetPasswordPage/>}/>
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/owner" element={<Owner />} />
        <Route path="/owner/post" element={<Post />} />
        <Route path="/owner/message" element={<Messages />} />
        <Route path="/owner/payment" element={<Payment />} />
        <Route path="/owner/profile" element={<Profile />} />
        <Route path="/owner/settings" element={<Settings />} />
        <Route path="/contractor/profile" element={<Profilec />} />
        <Route path="/contractor/settings" element={<Settingsc />} />
        <Route path="/contractor" element={<Contractor />} />
        <Route path="/contractor/jobs" element={<Jobs />} />
        <Route path="/contractor/messages" element={<Message />} />
        <Route path="/owner/posted" element={<Elements><Posted /></Elements>} />
        <Route path="/contractor/posted" element={<POsted />} />
        <Route path="/owner/paymentHistory" element={<HistoryP />} />
        <Route path="/contractor/payment" element={<Pay />} />


      </Routes>
    </Router>
  );
}
