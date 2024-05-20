import React, {useState} from 'react';
import './auth.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/RadioGroup';
import Radio from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/RadioGroup';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/RadioGroup';

export default function Register() {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});

    // Validate the form fields
    const newErrors = {};

    if (fullName.trim() === '') {
      newErrors.fullName = 'Please enter your full name';
    }

    if (email.trim() === '') {
      newErrors.email = 'Please enter your email address';
    }

    if (password.trim() === '') {
      newErrors.password = 'Please enter a password';
    }

    if (day.trim() === '' || month.trim() === '' || year.trim() === '') {
      newErrors.dateOfBirth = 'Please enter a valid date of birth';
    } else if (!/^\d{2}$/.test(day) || !/^\d{2}$/.test(month) || !/^\d{4}$/.test(year)) {
      newErrors.dateOfBirth = 'Please enter a valid date of birth';
    }

    if (gender !== 'male' && gender !== 'female') {
      newErrors.gender = 'Please select a gender';
    }

    if (phoneNumber.trim() === '') {
      newErrors.phoneNumber = 'Please enter a phone number';
    }

    if (!termsAccepted) {
      newErrors.termsAccepted = 'Please accept the terms and conditions';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      
    }

    
    // Log the form details in the console
    console.log('Full Name:', fullName);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Day of Birth:', day);
    console.log('Month of Birth:', month);
    console.log('Year of Birth:', year);
    console.log('Gender:', gender);
    console.log('Phone Number:', phoneNumber);
    console.log('Terms Accepted:', termsAccepted);
  };

  

  return(
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <h4>Create New Account</h4>
          <div className="input-group login-input-group input-group-icon">
            <TextField
              className='login-input'
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              variant="filled"
              id="filled-disabled"
              required
            />
            <div className="input-icon">
              <i className="fa fa-user" />
            </div>
          </div>
          {errors.fullName && <p className="error-message">{errors.fullName}</p>}
          <div className="input-group login-input-group input-group-icon">
            <TextField
              className='login-input'
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="filled"
              id="filled-disabled"
              required
            />
            <div className="input-icon">
              <i className="fa fa-envelope" />
            </div>
          </div>
          {errors.email && <p className="error-message">{errors.email}</p>}
          <div className="input-group login-input-group input-group-icon">
            <TextField
              className='login-input'
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="filled"
              id="filled-disabled"
              required
            />
            <div className="input-icon">
              <i className="fa fa-key" />
            </div>
          </div>
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <div className="row">
          <div className="col-half">
            <h4>Date of Birth</h4>
            <div className="input-group login-input-group">
              <div className="col-third">
                <TextField
                  className='login-input'
                  type="text"
                  placeholder="DD"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  variant="filled"
                  id="filled-disabled"
                  required
                />
              </div>
              <div className="col-third">
                <TextField
                  className='login-input'
                  type="text"
                  placeholder="MM"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  variant="filled"
                  id="filled-disabled"
                  required
                />
              </div>
              <div className="col-third">
                <TextField
                  className='login-input'
                  type="text"
                  placeholder="YYYY"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  variant="filled"
                  id="filled-disabled"
                  required
                />
              </div>
            </div>
            {errors.day && <p className="error-message">{errors.day}</p>}
          </div>
          <div className="col-half">
            <h4>Gender</h4>
            <div className="input-group">
              <input
                className='login-input'
                id="gender-male"
                type="radio"
                name="gender"
                value="male"
                checked={gender === 'male'}
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="gender-male">Male</label>
              <input
                className='login-input'
                id="gender-female"
                type="radio"
                name="gender"
                value="female"
                checked={gender === 'female'}
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="gender-female">Female</label>
            </div>
          </div>
          {errors.gender && <p className="error-message">{errors.gender}</p>}
        </div>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
          <RadioGroup>
            <FormControlLabel 
              className='login-input-radio'
              value="female" 
              control={<Radio />} 
              label="Female" 
            />
            <FormControlLabel
              className='login-input-radio'
              value="male" 
              control={<Radio />} 
              label="Male" 
            />
          </RadioGroup>
        </FormControl>
        <div className="row">
          <h4>Phone Details</h4>
          <div className="input-group login-input-group input-group-icon">
            <TextField
              className='login-input'
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              variant="filled"
              id="filled-disabled"
              required
            />
            <div className="input-icon">
              <i className="fa fa-credit-card" />
            </div>
          </div>
          {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
        </div>
        <button  type="submit" className='btn btn-primary'>Signin</button>
      </form>
    </div>
    </Box>
  )
}

