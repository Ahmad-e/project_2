import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from '../component/card';
import img1 from '../images/home.jpg';
import img2 from '../images/home2.jpg';
import {useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import Err500 from '../SVGs/err500';
import Err401 from '../SVGs/err401';
import axios from "axios";


const Favorite=()=>{
    const [data,setData]=useState([]);
    const url = useSelector(state=>state.url);
    const token = useSelector(state=>state.token);
    const acc = useSelector(state=>state.account);
    const [errServer,setErrServver] = useState(false);
    useEffect(() => {
        if(acc==="3")
        axios.get( url+"showFavourites",
            {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' +token 
                }
            }
        )
            .then((response) => {
                console.log(response.data);
                
                setData(response.data.message)
            })
            .catch((error) => {
                console.log(error)
                setErrServver(true);
            });
    }, []);

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
        <Container>
            <Row className='justify-content-center' >
                {
                    data.map((item)=>{
                        return(
                            <Col lg={3} md={4} sm={6} xs={11} >
                                <Card id={item.product_id} name={item.name} imgURL={item.img_url} disc={item.disc} salary={item.price} love={true} />
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    )
}
export default Favorite