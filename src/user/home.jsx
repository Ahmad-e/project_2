import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Img from '../images/home.jpg';
import Card from '../component/card';
import Carousel from 'react-bootstrap/Carousel';
import {useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import Err500 from '../SVGs/err500';
import axios from "axios";



const Home=()=>{



    const [product,setProduct]=useState([]);
    const [types,setTypes]=useState([]);
    const [ads,setAds]=useState([]);
    const [errServer,setErrServver] = useState(false);
    const url = useSelector(state=>state.url);
    
    useEffect(() => {
        axios.get( url+"home",
            {
                headers:{
                    'Content-Type': 'application/json'
                }
            }
        )
            .then((response) => {
                console.log(response.data);
                setAds(response.data.ads);
                setProduct(response.data.best_products);
                setTypes(response.data.products_types);
            })
            .catch((error) => {
                setErrServver(true);
                console.log(error);
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
    return(
        <>
         <Carousel>
            {
                ads.map((item)=>{
                    return(
                        <Carousel.Item interval={60000}>
                            <img className='carousel-img' src={item.img_url} text="First slide" />
                            <Carousel.Caption>
                                <div className='home-image' >
                                <div className='home-text-main' style={{ color : "#222" }}>
                                    {item.disc}
                                </div>
                                <button onClick={()=>document.location.assign(item.link)} type="button" class="btn btn-primary home-button-main"> GET STARTED </button>
                                </div>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )
                })
            }
        </Carousel>

        <Container>
            
            <Row className='justify-content-center' >
                {
                    product.map((item)=>{
                        return(
                            <Col lg={4} md={6} sm={6} xs={12}>
                                <Card 
                                            id={item.id}
                                            name={item.name}
                                            imgURL={item.img_url}
                                            disc={item.disc}
                                            salary={item.price} 
                                            love={true} 
                                            type_id={item.type_id} />
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
        </>
    )
}
export default Home

