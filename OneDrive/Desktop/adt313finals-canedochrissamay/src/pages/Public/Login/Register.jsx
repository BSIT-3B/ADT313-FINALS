import { useState } from 'react';
import './Register.css';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    middleName: '',
    contactNo: '',
    role: 'admin', // Default role
  });

  const [status, setStatus] = useState('idle');
  const [isFieldsDirty, setIsFieldsDirty] = useState(false);

  const handleOnChange = (event) => {
    setIsFieldsDirty(true);
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    if (formData.email && formData.password && formData.firstName && formData.lastName && formData.contactNo) {
      setStatus('loading');
      try {
        await axios.post('http://localhost/movieproject-api/register.php', formData, {
          headers: { 'Content-Type': 'application/json' },
        });
        setStatus('success');
        alert('User registered successfully');
      } catch (error) {
        console.log(error);
        setStatus('error');
        alert('Failed to register');
      }
    } else {
      setIsFieldsDirty(true);
      alert('All fields are required!');
    }
  };

  return (
    <div className='Register'>
      <div className='main-container'>
        <h3>Register</h3>
        <form>
          <div className='form-container'>
            <div className='form-group'>
              <label>Email:</label>
              <input type='email' name='email' value={formData.email} onChange={handleOnChange} required />
            </div>
            <div className='form-group'>
              <label>Password:</label>
              <input type='password' name='password' value={formData.password} onChange={handleOnChange} required />
            </div>
            <div className='form-group'>
              <label>First Name:</label>
              <input type='text' name='firstName' value={formData.firstName} onChange={handleOnChange} required />
            </div>
            <div className='form-group'>
              <label>Last Name:</label>
              <input type='text' name='lastName' value={formData.lastName} onChange={handleOnChange} required />
            </div>
            <div className='form-group'>
              <label>Middle Name:</label>
              <input type='text' name='middleName' value={formData.middleName} onChange={handleOnChange} />
            </div>
            <div className='form-group'>
              <label>Contacts:</label>
              <input type='text' name='contactNo' value={formData.contactNo} onChange={handleOnChange} required />
            </div>
            <div className='submit-container'>
              <button type='button' onClick={handleRegister} disabled={status === 'loading'}>
                {status === 'idle' ? 'Register' : 'Loading...'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
