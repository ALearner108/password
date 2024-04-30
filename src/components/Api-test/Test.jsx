import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { FormGroup, Label, Input, Form, Button, FormFeedback } from 'reactstrap';

function Test() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === '' || email === '' || password === '') {
      toast.warn("Filds cannot be empty")
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage('');

    try {
      const response = await axios.post('https://aligned.corvo.com.np/api/Authentication/register', {
        username,
        email,
        password,
        image // Assuming you want to include the image in the request
      });
      if (response===''){
        alert("fetching data failed")
      }

      if (!response.data.success) {
        throw new Error(response.data.message || 'Signup failed');
      }

      // Signup successful
      setSuccessMessage('Signup successful. You can now login.');
      setUsername('');
      setPassword('');
      setEmail('');
      setImage(''); 
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setImage('');
  };

  return (
    <div>
      <h2>Signup</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="username">Username:</Label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
          <FormFeedback>Username is required</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="image">Image</Label>
          <Input
            type="file"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </FormGroup>
        <Button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Signup'}
        </Button>
        <Button type="button" disabled={loading} onClick={clear} style={{margin:'30px', color:''}}>
          Clear
        </Button>
      </Form>
      <ToastContainer/>
    </div>
  );
}

export default Test;
