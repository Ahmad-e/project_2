import React, {useState} from 'react';
import './auth.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/RadioGroup';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Loading from '../component/loading';
import axios from "axios";
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import {modeActions} from "../Store/Store"

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [date, setDate] = useState("");
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [errServer, setErrServer] = useState('');

  const dispatch = useDispatch();
  const {setToken,setAcc} = modeActions;


  const handleChangeGender = (event, newAlignment) => {
    setGender(newAlignment);
  };

  const [file, setFile] = useState(null);
  const handleChangeFile=(e)=>{
    if (e.target.files) {
      setFile(e.target.files[0]);
      console.log(file);
    }
  }
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

    if (date.trim() === '') {
      newErrors.date = 'Please enter a your birthday';
    }


    if (gender === '' ) {
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

    



    if(!newErrors.password && !newErrors.email && !newErrors.fullName && !newErrors.date && !newErrors.gender && !newErrors.phoneNumber)
    {
        var form = new FormData();
        
            form.append('name', fullName);
            form.append('email', email);
            form.append('gender', gender);
            form.append('phone_no', phoneNumber);
            form.append('birth_date', date);
            form.append('password', password);
            if(file!==null)
              form.append('img_url', file);


            try {
                setLoading(true);
                const response = axios.post('http://127.0.0.1:8000/api/register',
                    form,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Accept':"application/json"
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
                          setErrServer(response.data.message)
                          console.log(response.data);
                        }
                        setLoading(false);

                    })
                    .catch((error) =>{
                        console.log(error)
                        setErrServer("There is a problem with the server, try again later")
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

            <br/>Create New Account<br/>
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

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker selected={date} onChange={(date) => setDate(date.year()+"-"+(date.month()+1)+"-"+date.date())} />
            </LocalizationProvider>
            {errors.date && <p className="error-message">{errors.date}</p>}<br/>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
          <ToggleButtonGroup
            className='justify-content-center'
            color="primary"
            value={gender}
            exclusive
            onChange={handleChangeGender}
            aria-label="Platform"
          >
            <ToggleButton value="male">mail</ToggleButton>
            <ToggleButton value="female">female</ToggleButton>
          </ToggleButtonGroup>
        </FormControl>
        {errors.gender && <p className="error-message">{errors.gender}</p>}<br/>
        <div >
          <div style={{ color : "black" }}>
          <PhoneInput
            country={'sy'}
            value={phoneNumber}
            onChange={(e)=>setPhoneNumber(e)}
            />
            
          </div>
          {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}

          <br />
        </div>
        <button onClick={()=>handleSubmit()}  className='btn btn-primary'> Sign up </button>
    </div>
    </Box>
    </>
  )
}

