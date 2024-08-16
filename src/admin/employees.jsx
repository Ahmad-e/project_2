

import React, {useState , useEffect} from 'react';
//import './auth.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Employees() {
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [roleId, setRoleId] = useState(0);
  const [sectionId, setSectionId] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [date, setDate] = useState("");
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [errServer, setErrServer] = useState('');
  const apiurl = useSelector(state=>state.url);
  const token = useSelector(state=>state.token);
  const dispatch = useDispatch();
  const {setToken,setAcc} = modeActions;


  const [openDialog,setOpenDealog] = useState(false);

  const handleChangeGender = (event, newAlignment) => {
    setGender(newAlignment);
  };
  const handleChangeRole = (event, newAlignment) => {
    setRoleId(newAlignment);
  };
  const handleChangesection = (event, newAlignment) => {
    setSectionId(event.target.value);
  };
  const [file, setFile] = useState(null);
  const handleChangeFile=(e)=>{
    if (e.target.files) {
      setFile(e.target.files[0]);
      
    }
  }
  const [sectors,setSectors] = useState([])
  useEffect(() => {
    axios.get(apiurl+"showSectors")
        .then((response) => {
            setSectors(response.data.sectors);
            console.log(response.data.sectors);
        })
        .catch((error) => console.log(error));
}, []);



  const[userData , setUserData] = useState({});
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

    if (roleId === 0 ) {
        newErrors.roleId = 'Please select type of employee account';
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

    


console.log(sectionId)
    if(!newErrors.password && !newErrors.email && !newErrors.fullName && !newErrors.date && !newErrors.gender && !newErrors.phoneNumber)
    {
        var form = new FormData();
        
            form.append('name', fullName);
            form.append('email', email);
            form.append('gender', gender);
            form.append('phone_no', phoneNumber);
            form.append('birth_date', date);
            form.append('password', password);

            form.append('role_id', roleId);
            if(roleId===2)
            form.append('sector_id', sectionId);
            if(file!==null)
              form.append('img_url', file);


            try {
                setLoading(true);
                const response = axios.post(apiurl+'createEmpAccount',
                    form,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization' : 'Bearer ' +token ,
                            'Accept':"application/json"
                        }
                    })
                    .then((response) => {
                        if(response.data.status)
                        {
                            //dispatch(setToken(response.data.access_token));
                            //dispatch(setAcc(response.data.user_data.role_id));
                            setOpenDealog(true);
                            setUserData(response.data.user_data)
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
            {errors.date && <p className="error-message">{errors.date}</p>}<br/><br />
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

        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Type of account</FormLabel>
          <ToggleButtonGroup
            className='justify-content-center'
            color="primary"
            value={roleId}
            exclusive
            onChange={handleChangeRole}
            aria-label="Platform"
          >
            <ToggleButton value={2}>section employee </ToggleButton>
            <ToggleButton value={4}>delivary employee</ToggleButton>
          </ToggleButtonGroup>
        </FormControl>

        <br /><br />

        <FormControl  sx={ roleId===2  ? { minWidth:"70%" } : {display:"none"}} >
                <InputLabel id="demo-simple-select-label">branch</InputLabel>
                <Select

                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sectionId}
                    label="branch"
                    onChange={handleChangesection}
                >
                  {
                      sectors.map((item)=>{
                        return(
                          <MenuItem value={item.id}>{item.city_name}</MenuItem>
                        )
                      })
                    }

                </Select>
        </FormControl>
        {errors.roleId && <p className="error-message">{errors.roleId}</p>}
        <br /><br />
        <div  style={{ color : "black"}}
                    >
          <div style={{ color : "black"}}>
          <PhoneInput
            country={'sy'}
            value={phoneNumber}
            onChange={(e)=>setPhoneNumber(e)}
            />
            
          </div> <br />
          {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}

          <br />
        </div>
        <button onClick={()=>handleSubmit()}  className='btn btn-primary'> Sign up </button>
    </div>
    </Box>
            <Dialog
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={()=>setOpenDealog(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle> Created successfully  </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    employee data<br/>
                    name :{userData.name}<br/>
                    email : {userData.email}<br/>
                    password : {password}<br/>
                    phone number : {userData.phone_no}<br/>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button className="App_button" sx={{ color:"#bb252e" }} onClick={()=>setOpenDealog(false)}>close</Button>
                </DialogActions>
            </Dialog>
    </>
  )
}

