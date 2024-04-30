import React, { useState } from 'react';
import axios from 'axios';
import { FormGroup, Label, Input,FormFeedback, Form, Button } from 'reactstrap';


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
    setLoading(true);
    setError(null);
    setSuccessMessage('');

    try {
      const response = await axios.post('https://aligned.corvo.com.np/api/Authentication/register', {
        username,
        email,
        password,
        
      });

      if (!response.data.success) {
        throw new Error(response.data.message || 'Signup failed');
      }

      // Signup successful
      setSuccessMessage('Signup successful. You can now login.');
      setUsername('');
      setPassword('');
      setEmail('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const clear=()=>{
    setUsername('')
    setEmail('')
    setPassword('')

  }

  return (
    <div>
      
      <h2>Signup</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <Form onSubmit={handleSubmit}>
        
          <FormGroup>
          <label htmlFor="username">Username:</label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
        </FormGroup>
        <div>
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
        </div>
        
        <div>
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
          
        </div>
        <FormGroup>
          <Label htmlFor='image'>Image</Label>
          <Input
          type='file'
          id='image'
          value={image}
          onChange={(e)=>setImage(e.target.value)}/>
        </FormGroup>
        <Button type="submit" disabled={loading} onClick={clear}>
          {loading ? 'Signing up...' : 'Signup'}
        </Button>
      </Form>
    </div>
  );
}

export default Test;
