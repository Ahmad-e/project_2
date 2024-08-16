
import React, {useState,useEffect} from 'react';

import PhoneInput from 'react-phone-input-2'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Err500 from '../SVGs/err500';
import Err401 from '../SVGs/err401';
import Loading from '../component/loading';
import TextField from '@mui/material/TextField';

import { useSelector } from 'react-redux';
import axios from "axios";

const AddMoney =()=>{
    const url = useSelector(state=>state.url);
    const token = useSelector(state=>state.token);
    const acc = useSelector(state=>state.account);
    const [errServer,setErrServver] = useState(false);
    const [Message, setMessage] = useState('');
    const [sended, setSended] = useState(true);
    const [loading,setLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [salary, setSalary] = React.useState(0);

    

    const [errSalary, seterrSalary] = React.useState(false);
    const handleChangeSalary = (event) => {
        setSalary(event.target.value);
        if(event.target.value <= 0)
            seterrSalary(true);
        else
            seterrSalary(false);
    };

    const handleSubmit = () => {

        if(salary>0 && phoneNumber)
            try {
                setLoading(true)
                const response = axios.post(url+'addCash', 
                {
                    phone_no:phoneNumber,
                    cash:salary
                },{
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' +token 
                    }
                }
                ).then((response) => {
                    console.log(response.data);
                    setSended(false);
                    setMessage("")
                    setLoading(false);
                    setErrServver(false);
                }).catch((error) => {
                    setErrServver(true);
                    setLoading(false)
                    setSended(true)
                    console.log(error);
                });
                } catch (e) {
                    throw e;
                }
    }

    if(acc==="4" || acc==="3")
        return(
            <div>
                <Err401/>
                <p>You cannot access this page. You must log in as an admin , go to <a href='/login'>Login</a></p>
            </div>
        )
    
    
    return(
        <div className="support-container">
            <Loading  loading={loading} />
            <section className="support-row">
                <div className="wrapper">
                    <Container className="contact-wrap">
                        <Row  className=' justify-content-center' >
                            
                            <Col lg={12} xs={12} style={{ textAlign:"center" }} ><br /><br />
                                <h5> Adding money to the user's wallet requires receiving cash from the customer </h5><br />
                            </Col>
                            <Col lg={12} xs={12} style={{  maxWidth: "347px" }}>
                                <div  className='register-container'>
                                    <PhoneInput
                                        style={{ maxWidth:"100px" }}
                                        country={'sy'}
                                        value={phoneNumber}
                                        onChange={(e)=>setPhoneNumber(e)}
                                        />
                                        <br/><br/>
                                    <TextField
                                        fullWidth
                                        error={errSalary}
                                        type='number'
                                        min={0}
                                        id="outlined-error-helper-text"
                                        label="salary"
                                        helperText="This field must not be empty"
                                        onChange={handleChangeSalary}
                                        />
                                        <br/><br/>
                                        <button onClick={()=>handleSubmit()}  type="button" class="btn btn-primary "> add  </button>
                                </div>
                            <br/>
                            </Col> 
                        </Row>
                        <Stack >
                            <Alert hidden={sended}  variant="outlined" severity="success">Sent successfully , You will be answered as quickly as possible. Just monitor your <a href='/profile' >profile page</a></Alert>
                            <Alert hidden={!errServer}  variant="outlined" severity="error"> The phone number entered does not exist in the system  </Alert>
                        </Stack>
                    </Container>
                    
                </div>
            </section>
        </div>
    )
}
export default AddMoney