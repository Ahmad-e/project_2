
import React, {useState} from 'react';
import TextField from '@mui/material/TextField';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Support =()=>{

    const [Message, setMessage] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();

      console.log('Message:', Message);
    }
    
    
    return(
        <div className="support-container">
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
                    </Container>
                    
                </div>
            </section>
        </div>
    )
}
export default Support