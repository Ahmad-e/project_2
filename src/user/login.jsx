import React, { useState } from 'react';
import './auth.css';
import TextField from '@mui/material/TextField';
import Loading from '../component/loading';
import axios from "axios";
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import {modeActions} from "../Store/Store"

export default function Login() {
  const url = useSelector(state=>state.url);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const newErrors = {};
  const [errServer, setErrServer] = useState('');

  const dispatch = useDispatch();
  const {setToken,setAcc} = modeActions;


  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // Validate the form fields
    

    if (email.trim() === '') {
      newErrors.email = 'Please enter your email address';
    }

    if (password.trim() === '') {
      newErrors.password = 'Please enter a password';
    }

    if (password.length <= 7) {
      newErrors.password = 'Password must be greater than 8 characters ';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
          setLoading(true);
          try {
              const response = axios.post(url+'login', {
                  email:email,
                  password:password
              }).then((response) => {
                  if(response.data.status)
                  {     
                      console.log(response.data);
                      dispatch(setToken(response.data.access_token));
                      dispatch(setAcc(response.data.user_data.role_id));
                      setLoading(false)
                  }
                  else
                  {
                    console.log(response.data);
                    setLoading(false)
                  }

              }).catch((error) => {

                  console.log(error)
                  setErrServer('Email or password not correct')
                  setLoading(false)
              });
                  
          } catch (e) {
                  throw e;
          }
      
  };

  return (
    <div >
      <Loading  loading={loading} />
          <Alert sx={errServer==="" ?   { display:"none" } : {}} variant='filled' severity="error">{errServer}</Alert>
      <form className='form_auth' onSubmit={handleSubmit}>
        <div className="register-container">
          <br/>
          Enter your password and email
          <br/><br/>
          <div className="input-item-auth">
            <TextField
              fullWidth
              className='login-input'
              type="email"
              label="Email Address"
              value={email}
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
              helperText={errors.email}
              error={errors.email}
            />
          </div>
          <div className="input-item-auth">
            <TextField
            fullWidth
              className='login-input'
              type="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText={errors.password}
              error={errors.password}
            />
            <div className="input-icon">
              <i className="fa fa-key" />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
          Sign In
        </button>          
        </div>
        <br /> 

      </form>
      
    </div>

  );
}