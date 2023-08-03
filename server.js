const express = require('express');
const app = express();
const PORT = 3001;
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51NNWAySCTPDkRA5G0CP2aNpOeB4i4yw7Pw6MSghyGeT8yAJbQ3enWtAtp5Q465W3sRLhYqIrxWPh4pVSMzsrApMx00AKME9VU5');



// Middleware for parsing JSON bodies
app.use(express.json());

// Session middle
// Session middleware
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);
require('dotenv').config();
// MySQL database connection
const connection = mysql.createConnection({
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  port: process.env.MYSQL_ADDON_PORT,
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Registration endpoint
app.post('/register', (req, res) => {
  const { username, password, email, role, phoneNumber, experience, reputation, bio, fieldOfWork } = req.body;

  // Check if the email already exists in the database
  const emailCheckQuery = 'SELECT * FROM users WHERE email = ? AND role = ?';
  connection.query(emailCheckQuery, [email,role], (emailError, emailResults) => {
    if (emailError) {
      console.error('Error executing MySQL query:', emailError);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (emailResults.length > 0) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    if (role === 'contractor') {
      // Check if the phone number already exists in the database
      const phoneCheckQuery = 'SELECT * FROM users WHERE phone_number = ?';
      connection.query(phoneCheckQuery, [phoneNumber], (phoneError, phoneResults) => {
        if (phoneError) {
          console.error('Error executing MySQL query:', phoneError);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (phoneResults.length > 0) {
          return res.status(409).json({ error: 'Phone number already exists' });
        }

        registerUser();
      });
    } else {
      registerUser();
    }

    function registerUser() {
      bcrypt.hash(password, saltRounds, (bcryptError, hash) => {
        if (bcryptError) {
          console.error('Error hashing password:', bcryptError);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

         // Find the previous id column value
          const prevIdQuery = 'SELECT id FROM users ORDER BY id DESC LIMIT 1';
          connection.query(prevIdQuery, (prevIdError, prevIdResult) => {
            if (prevIdError) {
              console.error('Error executing MySQL query:', prevIdError);
              return res.status(500).json({ error: 'Internal Server Error' });
            }
        
            let prevId = 0;
            if (prevIdResult.length > 0) {
              prevId = prevIdResult[0].id;
            }
        
            // Generate the userid
            const firstLetter = username.charAt(0).toUpperCase();
            const userid = `${firstLetter}-${prevId + 1}`;

        const insertQuery = 'INSERT INTO users (username, password, email, role, phone_number, experience, reputation, bio, field_of_work, userid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        connection.query(insertQuery, [username, hash, email, role, phoneNumber, experience, reputation, bio, fieldOfWork, userid], (insertError, insertResults) => {
          if (insertError) {
            console.error('Error executing MySQL query:', insertError);
            return res.status(500).json({ error: 'Internal Server Error' });
          }

          if (insertResults.affectedRows > 0) {
            // Retrieve the inserted user's details from the database
            const userQuery = 'SELECT * FROM users WHERE id = ?';
            connection.query(userQuery, [insertResults.insertId], (userError, userResults) => {
              if (userError) {
                console.error('Error retrieving user details:', userError);
                return res.status(500).json({ error: 'Internal Server Error' });
              }

              const user = userResults[0];

              res.json({
                message: 'Registration successful',
                user: {
                  id: user.id,
                  username: user.username,
                  email: user.email,
                  role: user.role,
                  phoneNumber: user.phone_number,
                  experience: user.experience,
                  reputation: user.reputation,
                  bio: user.bio,
                  fieldOfWork: user.field_of_work,
                  userid: user.userid,
                },
              });
            });
          } else {
            res.status(500).json({ error: 'Failed to register user' });
          }
        });
      });
    })
  });
});



// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  connection.query(query, [email], (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (bcryptError, match) => {
      if (bcryptError) {
        console.error('Error comparing passwords:', bcryptError);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (!match) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Store user ID in session
      req.session.userId = user.id;

      res.json({ role: user.role, id: user.id });
    });
  });
});

//Forgot Password
app.post('/forgot-password', (req, res) => {
  const { email } = req.body;

  // Check if the user exists in the database (similar to your registration and login checks)
  const checkQuery = 'SELECT * FROM users WHERE email = ?';
  connection.query(checkQuery, [email], (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 0) {
      // If the email does not exist in the database, return an error or redirect to an error page
      return res.status(404).json({ error: 'Email not found' });
    }

    // Generate a unique reset URL (can include a token or a unique identifier)
    const resetURL = `${process.env.REACT_APP_FRONTEND_URL}/reset-password?email=${encodeURIComponent(email)}`;

    // Redirect the user to the reset password page with the generated URL
    return res.redirect(resetURL);
  });
});

//Reset Password
app.post('/reset-password', (req, res) => {
  const { email, newPassword } = req.body;

  // Find the user with the provided email in the database
  const selectQuery = 'SELECT * FROM users WHERE email = ?';
  connection.query(selectQuery, [email], (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 0) {
      // If the email does not exist in the database, return an error or redirect to an error page
      return res.status(404).json({ error: 'Email not found' });
    }

    // Update the user's password in the database
    const updateQuery = 'UPDATE users SET password = ? WHERE email = ?';
    connection.query(updateQuery, [newPassword, email], (updateError, updateResults) => {
      if (updateError) {
        console.error('Error updating password:', updateError);
        return res.status(500).json({ error: 'Failed to reset password' });
      }

      // Password updated successfully
      return res.json({ message: 'Password reset successful' });
    });
  });
});


// Authentication middleware
const authenticateUser = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};

// API endpoint to retrieve owner information based on the current session
app.get('/api/owner/current', authenticateUser, (req, res) => {
  const userId = req.session.userId;

  const query = 'SELECT * FROM users WHERE id = ?';
  connection.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = results[0];

    const ownerInfo = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      phone_number: user.phone_number,
    };

    res.json(ownerInfo);
  });
});

// API endpoint to retrieve contractor information based on the current session
app.get('/api/contractor/current', authenticateUser, (req, res) => {
  const userId = req.session.userId;

  const query = 'SELECT * FROM users WHERE id = ?';
  connection.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Contractor not found' });
    }

    const user = results[0];

    const contractorInfo = {
      id: user.id,
      userId: user.userId,
      username: user.username,
      password: user.password,
      email: user.email,
      role: user.role,
      phone_number: user.phone_number,
      experience: user.experience,
      reputation: user.reputation,
      bio: user.bio,
      field_of_work: user.field_of_work,
    };

    res.json(contractorInfo);
  });
});

// API endpoint to update contractor information based on the current session
app.put('/api/contractor/update', authenticateUser, (req, res) => {
  const userId = req.session.userId;
  const updatedDetails = req.body;

  // Remove the id and userId fields from the updatedDetails object
  delete updatedDetails.id;
  delete updatedDetails.userId;

  // Execute the query to update the contractor details in the database
  const query = 'UPDATE users SET ? WHERE id = ?';
  connection.query(query, [updatedDetails, userId], (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Contractor not found' });
    }

    res.json({ message: 'Contractor details updated successfully!' });
  });
});

// API endpoint to update owner information based on the current session
app.put('/api/owner/update', authenticateUser, (req, res) => {
  const userId = req.session.userId;
  const updatedDetails = req.body;

  // Remove the id and userId fields from the updatedDetails object
  delete updatedDetails.id;
  delete updatedDetails.userId;

  // Execute the query to update the owner details in the database
  const query = 'UPDATE users SET ? WHERE id = ?';
  connection.query(query, [updatedDetails, userId], (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Owner not found' });
    }

    res.json({ message: 'Owner details updated successfully!' });
  });
});

// ...
app.put('/api/jobs/:jobId', authenticateUser, (req, res) => {
  const { jobId } = req.params;
  const { paymentStatus, transactionId } = req.body;
  const ownerId = req.session.userId; // Access the owner ID from the session

  const query = `UPDATE jobs SET
    contractorId = ?,
    jobTitle = ?,
    jobDescription = ?,
    cost = ?,
    transactionId = ?,
    paymentStatus = ?
    WHERE id = ? AND ownerId = ?`; // Include the ownerId in the WHERE clause

  connection.query(
    query,
    [
      req.body.contractorId,
      req.body.jobTitle,
      req.body.jobDescription,
      req.body.cost,
      transactionId,
      paymentStatus,
      jobId,
      ownerId // Pass the ownerId as a parameter
    ],
    (error, results) => {
      if (error) {
        console.error('Error updating job:', error);
        res.status(500).json({ error: 'Failed to update job' });
      } else {
        res.json({ success: true });
      }
    }
  );
});

// API endpoint to update a job
app.put('/api/jobs/update/:id', (req, res) => {
  const jobId = req.params.id;
  const {
    jobTitle,
    jobDescription,
    capacity,
    timePeriod,
    cost,
    location,
  } = req.body;

  // Update the job in the database
  const sql = `
    UPDATE job_posts
    SET jobTitle = ?, jobDescription = ?, capacity = ?, timePeriod = ?, cost = ?, location = ?
    WHERE id = ?
  `;
  connection.query(
    sql,
    [jobTitle, jobDescription, capacity, timePeriod, cost, location, jobId],
    (err, result) => {
      if (err) {
        console.error('Error updating job:', err);
        res.status(500).json({ message: 'Server error' });
      } else {
        res.status(200).json({ message: 'Job updated successfully' });
      }
    }
  );
});

// Job creation endpoint
app.post("/jobs", authenticateUser, (req, res) => {
  const {
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
  } = req.body;
  const ownerId = req.session.userId;

  const newJob = {
    ownerId,
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
    status: "available", // Add status field with value "available"
  };

  const insertQuery =
    "INSERT INTO job_posts (ownerId, jobTitle, jobDescription, capacity, timePeriod, cost, location, pincode, city, state, country, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(
    insertQuery,
    [
      newJob.ownerId,
      newJob.jobTitle,
      newJob.jobDescription,
      newJob.capacity,
      newJob.timePeriod,
      newJob.cost,
      newJob.location,
      newJob.pincode,
      newJob.city,
      newJob.state,
      newJob.country,
      newJob.status,
    ],
    (error, results) => {
      if (error) {
        console.error("Error creating job post:", error);
        res.status(500).json({ error: "An error occurred while creating the job post" });
      } else {
        newJob.id = results.insertId;
        res.status(201).json({ message: "Job post created successfully", job: newJob });
      }
    }
  );
});

// ...
// API Endpoint to Insert Payment Details
app.post('/api/update-payment', (req, res) => {
  const { ownerId, contractorId, jobId, title, cost, paymentStatus, transactionId } = req.body;

  const sql = 'INSERT INTO payments (ownerId, contractorId, jobId, title, cost, paymentStatus, transactionId) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [ownerId, contractorId, jobId, title, cost, paymentStatus, transactionId];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Failed to insert payment details:', err);
      return res.status(500).json({ error: 'Failed to insert payment details' });
    }

    console.log('Payment details inserted into the database');

    // Update the payment status in the job_posts table
    const updateSql = 'UPDATE job_posts SET Pay = ? WHERE id = ?';
    const updateValues = ['successful', jobId];

    connection.query(updateSql, updateValues, (updateErr, updateResult) => {
      if (updateErr) {
        console.error('Failed to update payment status in the job_posts table:', updateErr);
        return res.status(500).json({ error: 'Failed to update payment status in the job_posts table' });
      }

      console.log('Payment status updated in the job_posts table');
      return res.sendStatus(200);
    });
  });
});



// 

app.get("/api/jobs", (req, res) => {
  const query = `
    SELECT job_posts.*, users.username AS ownerName
    FROM job_posts
    JOIN users ON job_posts.ownerId = users.id
    WHERE job_posts.status = 'available'
  `;
  
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.json(results);
  });
});



// API endpoint to accept a job
app.put('/api/jobs/:id/accept', authenticateUser, (req, res) => {
  const jobId = req.params.id;
  const contractorId = req.body.contractorId;

  // Update the job status and contractorId in the database
  const query = 'UPDATE job_posts SET status = ?, contractorId = ? WHERE id = ?';
  connection.query(query, ['accepted', contractorId, jobId], (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json({ message: 'Job accepted successfully' });
  });
});




// Endpoint to get all messages
// Endpoint to get all messages
app.get('/api/messages', authenticateUser, (req, res) => {
  const query = 'SELECT * FROM chat_messages';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.json(results);
  });
});

// API endpoint to fetch accepted jobs for the current logged-in contractor
app.get("/api/jobs/accepted", authenticateUser, (req, res) => {
  const contractorId = req.session.userId;

  const query = "SELECT * FROM job_posts WHERE status = 'accepted' AND contractorId = ?";

  connection.query(query, [contractorId], (error, results) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.json(results);
  });
});


// Endpoint to get sent messages for a specific owner
app.get('/api/messages/sent/:ownerId', authenticateUser, (req, res) => {
  const ownerId = req.params.ownerId;

  // Get sent messages for the owner from the database
  const query = 'SELECT * FROM chat_messages WHERE senderId = ?';
  connection.query(query, [ownerId], (error, results) => {
    if (error) {
      console.error('Error retrieving sent messages:', error);
      res.status(500).json({ error: 'Failed to retrieve sent messages' });
    } else {
      res.json(results);
    }
  });
});

// Endpoint to send a message from a specific contractor to the owner
app.post('/api/messages/:ownerId', authenticateUser, (req, res) => {
  const ownerId = req.params.ownerId;
  const contractorId = req.session.userId; // Assuming the contractor's ID is stored in the session

  const { message } = req.body;

  // Insert the new message into the database
  const query = 'INSERT INTO chat_messages (message, senderId, receiverId) VALUES (?, ?, ?)';
  connection.query(query, [message, contractorId, ownerId], (error, results) => {
    if (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ error: 'Failed to send message' });
    } else {
      // Fetch all received messages for the contractor from the database
      const receivedQuery = 'SELECT * FROM chat_messages WHERE receiverId = ?';
      connection.query(receivedQuery, [contractorId], (receivedError, receivedResults) => {
        if (receivedError) {
          console.error('Error retrieving received messages:', receivedError);
          res.status(500).json({ error: 'Failed to retrieve received messages' });
        } else {
          res.json(receivedResults);
        }
      });
    }
  });
});

// Endpoint to get received messages for a specific contractor
app.get('/api/messages/received/:contractorId', authenticateUser, (req, res) => {
  const contractorId = req.params.contractorId;

  // Get received messages for the contractor from the database
  const query = 'SELECT * FROM chat_messages WHERE receiverId = ?';
  connection.query(query, [contractorId], (error, results) => {
    if (error) {
      console.error('Error retrieving received messages:', error);
      res.status(500).json({ error: 'Failed to retrieve received messages' });
    } else {
      res.json(results);
    }
  });
});

// Assuming you have the required dependencies and setup for your backend

// GET /api/jobs/owner/:ownerId
app.get("/api/jobs/owner/:ownerId", authenticateUser, (req, res) => {
  const ownerId = req.params.ownerId;

  const selectQuery = "SELECT * FROM job_posts WHERE ownerId = ?";
  connection.query(selectQuery, [ownerId], (error, results) => {
    if (error) {
      console.error("Error fetching posted jobs:", error);
      res.status(500).json({ error: "An error occurred while fetching posted jobs" });
    } else {
      res.status(200).json(results);
    }
  });
});



// Endpoint to get the payment status for a specific job
app.get('/api/payment-status/:jobId', (req, res) => {
  const { jobId } = req.params;

  // Prepare the SQL query
  const query = 'SELECT paymentStatus FROM payments WHERE jobId = ?';
  const values = [jobId];

  // Execute the query
  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error fetching payment status:', error);
      res.status(500).json({ error: 'Failed to fetch payment status' });
    } else {
      if (results.length > 0) {
        const paymentStatus = results[0].paymentStatus;
        res.status(200).json({ paymentStatus });
      } else {
        res.status(404).json({ error: 'Payment status not found' });
      }
    }
  });
});

// DELETE /api/jobs/:jobId DELETE route to delete a job by its jobId
app.delete("/api/jobs/:jobId", authenticateUser, (req, res) => {
  const jobId = req.params.jobId;

  const deleteQuery = "DELETE FROM job_posts WHERE id = ?";
  connection.query(deleteQuery, [jobId], (error, results) => {
    if (error) {
      console.error("Error deleting job post:", error);
      res.status(500).json({ error: "An error occurred while deleting the job post" });
    } else {
      res.status(200).json({ message: "Job post deleted successfully" });
    }
  });
});

// UPDATE route to update a job by its jobId
app.put("/api/jobs/:jobId", authenticateUser, (req, res) => {
  const jobId = req.params.jobId;
  const updatedJob = req.body; // Assuming the updated job details are sent in the request body

  const updateQuery = "UPDATE job_posts SET ? WHERE id = ?";
  connection.query(updateQuery, [updatedJob, jobId], (error, results) => {
    if (error) {
      console.error("Error updating job post:", error);
      res.status(500).json({ error: "An error occurred while updating the job post" });
    } else {
      res.status(200).json({ message: "Job post updated successfully" });
    }
  });
});

// API endpoint for sending messages
app.post('/api/sendMessage', (req, res) => {
  const { fname, email, subject, message } = req.body;
  console.log('Form data received:', { fname, email, subject, message });

  // Create an SQL query to insert the message into the 'messages' table
  const sql = `INSERT INTO contact_info (Full_name, Email, Subject, message) VALUES (?, ?, ?, ?)`;

  connection.query(sql, [fname, email, subject, message], (err, result) => {
    if (err) {
      console.error('Error inserting message:', err);
      res.status(500).json({ error: 'Error sending message' });
    } else {
      console.log('Message sent successfully:', result);
      res.status(200).json({ message: 'Message sent successfully' });
    }
  });
});


// API endpoint to fetch received payments for the current logged-in contractor
app.get('/api/contractor/:contractorId/payments', authenticateUser, (req, res) => {
  const contractorId = req.params.contractorId;

  const query = `
    SELECT p.id, p.jobId, p.ownerId, u.username AS ownerName, p.title, p.cost
    FROM payments AS p
    JOIN users AS u ON p.ownerId = u.id
    WHERE p.contractorId = ?
  `;

  connection.query(query, [contractorId], (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.json(results);
  });
});

// Endpoint to get the chat inbox for the owner
app.get('/api/chat/inbox/owner/:ownerId', authenticateUser, (req, res) => {
  const ownerId = req.params.ownerId;

  // Retrieve the chat messages for the owner from the database
  const query = `
    SELECT *
    FROM chat_messages
    WHERE receiverId = ?
  `;
  connection.query(query, [ownerId], (error, results) => {
    if (error) {
      console.error('Error retrieving chat messages:', error);
      res.status(500).json({ error: 'Failed to retrieve chat messages' });
    } else {
      res.json(results);
    }
  });
});


// GET endpoint for retrieving chat messages with a specific contractor
app.get('/api/chat/messages/:contractorId', (req, res) => {
  // Extract the contractorId from the request parameters
  const { contractorId } = req.params;

  // Prepare the SQL query to fetch chat messages
  const query = 'SELECT * FROM chat_messages WHERE (senderId = ? AND receiverId = ?) OR (senderId = ? AND receiverId = ?)';

  // Assuming ownerId is the current owner's ID, extract it from the session or wherever it's stored
  const ownerId = req.session.userId;

  // Execute the query with the contractorId and ownerId as the parameters
  connection.query(query, [contractorId, ownerId, ownerId, contractorId], (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Return the chat messages as a JSON response
    res.json({ messages: results });
  });
});



// Fetch contractor information from the MySQL database
app.get("/api/contractors", (req, res) => {
  // Execute the query to fetch contractor information
  connection.query(
    "SELECT * FROM users WHERE role = 'contractor'",
    (error, results) => {
      if (error) {
        console.error("Error fetching contractor information:", error);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.json(results);
    }
  );
});


// Endpoint to get the current logged-in owner
app.get('/api/owner/current', authenticateUser, (req, res) => {
  const userId = req.session.userId;

  const query = 'SELECT * FROM users WHERE id = ?';
  connection.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = results[0];

    const ownerInfo = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    res.json(ownerInfo);
  });
});

// API endpoint to fetch payment history for the current logged-in owner
app.get('/api/payment/history', authenticateUser, (req, res) => {
  const ownerId = req.session.userId;

  const query = 'SELECT * FROM payments WHERE ownerId = ?';

  connection.query(query, [ownerId], (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.json(results);
  });
});

// Endpoint to send a message to a contractor
app.post('/api/chat/send-message', authenticateUser, (req, res) => {
  const { senderId, receiverId, message } = req.body;

  const query = `
    INSERT INTO chat_messages (senderId, receiverId, message, timestamp)
    VALUES (?, ?, ?, NOW())
  `;
  connection.query(query, [senderId, receiverId, message], (error, results) => {
    if (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ error: 'Failed to send message' });
    } else {
      res.json({ message: 'Message sent successfully' });
    }
  });
});

app.use(express.static("public"));
app.use(express.json());

app.post('/process-payment', async (req, res) => {
  try {
    const { paymentMethodId, amount } = req.body;

    // Create a PaymentIntent with the payment method ID and amount
    const paymentIntent = await stripe.paymentIntents.create({
      payment_method: paymentMethodId,
      amount: amount,
      currency: 'inr',
      confirm: true,
    });

    // Return the PaymentIntent ID to the client
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error processing payment:', error.message);
    res.status(500).json({ error: 'Payment failed' });
  }
});


// completed built by anonymous   
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
