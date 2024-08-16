import React, {useEffect, useState} from 'react';
import './auth.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/RadioGroup';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Loading from '../component/loading';
import axios, { Axios } from "axios";
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import {modeActions} from "../Store/Store"

export default function EditProfile() {

  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [errServer, setErrServver] = useState('');

  const [user,setUser] = useState([]);
  const url = useSelector(state => state.url);

  const dispatch = useDispatch();
  const {setToken,setAcc} = modeActions;

  const token = useSelector(state => state.token);



  const [file, setFile] = useState({});
  const handleChangeFile=(e)=>{
    if (e.target.files) {
      setFile(e.target.files[0]);
      console.log(file);
    }
  }

  useEffect(() => {
    axios.get( url+"profile",
        {
            headers:{
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' +token 
            }
        }
    )
        .then((response) => {
            setUser(response.data.user_data[0])
            console.log(response.data.user_messages);
        })
        .catch((error) => {
            setErrServver(true);
            console.log(error)
        });
}, []);

  const handleSubmit = () => {
    
    // Clear previous errors
    setErrors({});
    const newErrors = {};
    // Validate the form fields
    
    if (fullName.trim() === '') {
      newErrors.fullName = 'Please enter your full name';
    }
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.trim() === '') {
      newErrors.email = 'Please enter your email address';
    }
    if (!re.test(email)) {
      newErrors.email = 'Please enter a valid email ';
    }

    if (password.trim() === '') {
      newErrors.password = 'Please enter a password';
    }
    if (password.length <= 7) {
      newErrors.password = 'Password must be greater than 8 characters ';
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
    
    if(!newErrors.password && !newErrors.email && !newErrors.fullName && !newErrors.date && !newErrors.gender && !newErrors.phoneNumber)
    {
        var form = new FormData();
        
            form.append('name', fullName);
            form.append('email', email);
            form.append('phone_no', phoneNumber);
            form.append('password', password);
            form.append('img_url', file);

            
            try {
                setLoading(true);
                const response = axios.post('http://127.0.0.1:8000/api/editProfile',
                    form,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization' : 'Bearer ' +token 
                        }
                    })
                    .then((response) => {
                        if(response.data.status)
                        {
                            dispatch(setToken(response.data.access_token));
                            dispatch(setAcc(response.data.user_data.role_id));
                            console.log(response.data);
                        }
                        else
                        {
                          setErrServver(response.data.message)
                          console.log(response.data);
                        }
                        setLoading(false);

                    })
                    .catch((error) =>{
                        console.log(error)
                        setErrServver("There is a problem with the server, try again later")
                        setLoading(false);
                    });
            } catch (e) {
                throw e;
            }
    }
};

return(
    <>
    <Alert sx={errServer==="" ?   { display:"none" } : {}} variant='filled' severity="error">{errServer}</Alert>
    <Box
    
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      className="form_auth_r"
      autoComplete="off"
    >
        <Loading  loading={loading} />
        
        <div className="register-container">

            <br/>Edit Your Information<br/>
            <br/>
              <input accept="image/*" onChange={handleChangeFile} type="file" id="inputFile1" />
              <label className="btn-primary btn" for="inputFile1" > Upload image <FileUploadRoundedIcon/> </label>
              <br/><br/>
            <TextField
            fullWidth
              type="text"
              label="Full Name"
              variant="outlined"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              helperText={errors.fullName}
              error={errors.fullName}
              id="filled-disabled"
              required
            /><br/>
            <TextField
             fullWidth
              type="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              id="filled-disabled"
              error={errors.email}
              helperText={errors.email}
              required
            />
            <br/>
            <TextField
              fullWidth
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              id="filled-disabled"
              error={errors.password}
              helperText={errors.password}
              required
            /><br/>
        <div >
          <div style={{ color : "black" }}>
          <PhoneInput
            country={'th'}
            value={phoneNumber}
            onChange={(e)=>setPhoneNumber(e)}
            />
            
          </div>
          {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}

          <br />
        </div>
        <button onClick={()=>handleSubmit()}  className='btn btn-primary'> Save </button>
    </div>
    </Box>
    </>
  )
}

