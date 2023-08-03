import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const PaymentDetails = styled.div`
  flex: 1;
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;

const CheckoutContainer = styled.div`
  flex: 1;
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;

const Container = styled.div`
  display: flex;
  margin-top: 90px;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #3366cc;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: #555;
`;

const Input = styled.input`
  padding: 12px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  background-color: #f0f0f0;
  color: #333;
  transition: background-color 0.3s ease-in-out;

  &:focus {
    outline: none;
    background-color: #e0e0e0;
  }
`;

const Button = styled.button`
  background-color: #3366cc;
  color: #fff;
  padding: 16px;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #1a4da0;
  }
`;

const ErrorText = styled.p`
  color: #ff4242;
  font-size: 14px;
  margin-top: 0.5rem;
  text-align: center;
`;

const SuccessText = styled.p`
  color: #00bd00;
  font-size: 18px;
  margin-top: 0.5rem;
  text-align: center;
`;

const HomeButton = styled(Button)`
  background-color: #ff6a00;
  margin-top: 1rem;

  &:hover {
    background-color: #ee0979;
  }
`;

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentError, setPaymentError] = useState(null);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const selectedJob = location.state?.selectedJob;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setPaymentError(error.message);
      setPaymentComplete(false);
    } else {
      try {
        const response = await fetch('/process-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentMethodId: paymentMethod.id,
            amount: selectedJob.cost * 100,
          }),
        });

        const { clientSecret } = await response.json();

        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
          },
        });

        if (confirmError) {
          setPaymentError(confirmError.message);
          setPaymentComplete(false);
        } else {
          setPaymentError(null);
          setPaymentComplete(true);

          // Update the payment details in the MySQL database
          const paymentDetails = {
            ownerId: selectedJob.ownerId,
            contractorId: selectedJob.contractorId,
            jobId: selectedJob.id,
            title: selectedJob.jobTitle,
            cost: selectedJob.cost,
            paymentStatus: 'successful',
            transactionId: paymentIntent.id, // Assuming the paymentIntent object contains the transaction ID
          };

          try {
            const updateResponse = await fetch('/api/update-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(paymentDetails),
            });

            if (updateResponse.ok) {
              // Payment details updated successfully in the database
              console.log('Payment details updated in the database');
            } else {
              // Failed to update payment details in the database
              console.log('Failed to update payment details in the database');
            }
          } catch (error) {
            console.error('Error updating payment details:', error);
          }
        }
      } catch (error) {
        console.error('Error processing payment:', error);
        setPaymentError('Payment failed');
        setPaymentComplete(false);
      }
    }
  };

  const handleGoHome = () => {
    navigate('/owner');
  };

  return (
    <Container>
      <Wrapper>
        <PaymentDetails>
          <h2>Job Details</h2>
          {selectedJob && (
            <div>
              <p>Job ID: {selectedJob.id}</p>
              <p>Contractor ID: {selectedJob.contractorId}</p>
              <p>Job Title: {selectedJob.jobTitle}</p>
              <p>Job Description: {selectedJob.jobDescription}</p>
              <p>Job Cost: {selectedJob.cost}</p>
            </div>
          )}
        </PaymentDetails>
        <CheckoutContainer>
          <Title>Stripe Payment Gateway</Title>
          <Form onSubmit={handleSubmit}>
            <Label>Amount ($)</Label>
            <Input
              type="number"
              min="0"
              value={selectedJob.cost}
              disabled
            />
            <Label>Card Details</Label>
            <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
            <Button type="submit" disabled={!stripe}>
              Pay Now
            </Button>
            {paymentError && <ErrorText>{paymentError}</ErrorText>}
            {paymentComplete && (
              <>
                <SuccessText>Payment successful!</SuccessText>
                <HomeButton onClick={handleGoHome}>Go Back to Home</HomeButton>
              </>
            )}
          </Form>
        </CheckoutContainer>
      </Wrapper>
    </Container>
  );
};

export default CheckoutForm;
