
import React, {useState} from 'react';
import TextField from '@mui/material/TextField';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Err500 from '../SVGs/err500';
import Err401 from '../SVGs/err401';
import Loading from '../component/loading';

import { useSelector } from 'react-redux';
import axios from "axios";

const Support =()=>{
    const url = useSelector(state=>state.url);
    const token = useSelector(state=>state.token);
    const acc = useSelector(state=>state.account);
    const [errServer,setErrServver] = useState(false);
    const [Message, setMessage] = useState('');
    const [sended, setSended] = useState(true);
    const [loading,setLoading] = React.useState(false);
    
    const handleSubmit = (e) => {
      e.preventDefault();
        console.log(token)
      console.log('Message:', Message);

      try {
        setLoading(true)
        const response = axios.post(url+'sendMsg', 
        {
            question:Message
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
            setLoading(false)
        }).catch((error) => {
            setErrServver(true);
            setLoading(false)
            console.log(error);
        });
        } catch (e) {
            throw e;
        }
    }

    if(errServer)
        return(
            <div>
                <Err500/>
                <p>
                    There was a problem with the servers , You can try later
                </p>
            </div>
        )

        if(acc!=="3")
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
                        <Row className=' justify-content-center' >
                            <Col style={{ textAlign:"center" }} lg={6} md={8} sm={11}><br /><br />
                                    <h5>If you encounter a problem while using our platform, you can send a message to technical support and you will be answered from the profile page.</h5><br />
                                    <div  /> 
                                        <form onSubmit={handleSubmit} method="" id="contactForm" name="contactForm">
                                            <div>
                                                    <TextField 
                                                        fullWidth
                                                        type='text'
                                                        minRows={7}
                                                        
                                                        //sx={{ width:"400px" }}
                                                        name="message" 
                                                          multiline id="message" 
                                                          placeholder="Write one letter explaining the problem" 
                                                          defaultValue={""} 
                                                          className="support-textarea"
                                                          value={Message}
                                                          onChange={(e) => setMessage(e.target.value)}
                                                          required
                                                    />
                                            <br /><br />
                                        <div>
                                            <input type="submit" defaultValue="Send Message" className=" btn btn-primary" />
                                            <div className="submitting" />
                                            <br />
                                        </div>
                                    </div>
                                </form>
                            </Col>
                        </Row>
                        <Stack >
                            <Alert hidden={sended}  variant="outlined" severity="success">Sent successfully , You will be answered as quickly as possible. Just monitor your <a href='/profile' >profile page</a></Alert>
                            
                        </Stack>
                    </Container>
                    
                </div>
            </section>
        </div>
    )
}
export default Support