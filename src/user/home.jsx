import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Img from '../images/home.jpg';
import Card from '../component/card';
import Carousel from 'react-bootstrap/Carousel';


const Home=()=>{
    return(
        <>
         <Carousel>
            <Carousel.Item interval={60000}>
                <img className='carousel-img' src={Img} text="First slide" />
                <Carousel.Caption>
                    <div className='home-image' >

                    <h1 className='home-text-main main-color'>
                        We’re keeping it fresh around here.
                    </h1>
                    <div className='home-text-main' style={{ color : "#222" }}>
                    We’ve got an entire lineup of classic burgers. Our nuggs have become nothing short of legendary and there are so many other fan faves throughout our menu. But if you’re looking for a detour on your order, give our latest creations and flavor combinations a look-see.
                    </div>
                    <button type="button" class="btn btn-primary home-button-main"> GET STARTED </button>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={60000}>
                <img src={Img} className='carousel-img' text="Second slide" />
                <Carousel.Caption>
                    <div className='home-image' >

                    <h1 className='home-text-main main-color'>
                        We’re keeping it fresh around here.
                    </h1>
                    <div className='home-text-main' style={{ color : "#222" }}>
                        We’ve got an entire lineup of classic burgers. Our nuggs have become nothing short of legendary and there are so many other fan faves throughout our menu. But if you’re looking for a detour on your order, give our latest creations and flavor combinations a look-see.
                    </div>
                    <button type="button" class="btn btn-primary home-button-main"> GET STARTED </button>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src={Img} className='carousel-img' text="Third slide" />
                <Carousel.Caption>
                    <div className='home-image' >

                    <h1 className='home-text-main main-color'>
                        We’re keeping it fresh around here.
                    </h1>
                    <div className='home-text-main' style={{ color : "#222" }}>
                        We’ve got an entire lineup of classic burgers. Our nuggs have become nothing short of legendary and there are so many other fan faves throughout our menu. But if you’re looking for a detour on your order, give our latest creations and flavor combinations a look-see.
                    </div>
                    <button type="button" class="btn btn-primary home-button-main"> GET STARTED </button>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>

        {/*<div className='home-image' style={{ backgroundImage:`url(${Img})` }} >

            <h1 className='home-text-main main-color'>
                We’re keeping it fresh around here.
            </h1>
            <div className='home-text-main' style={{ color : "#222" }}>
            We’ve got an entire lineup of classic burgers. Our nuggs have become nothing short of legendary and there are so many other fan faves throughout our menu. But if you’re looking for a detour on your order, give our latest creations and flavor combinations a look-see.
            </div>
            <button type="button" class="btn btn-primary home-button-main"> GET STARTED </button>
        </div>*/}
        <Container>
            
            <Row className='justify-content-center' >
                <Col>
                <Card id={1} name="product name" imgURL={Img} disc="long discription from product" salary={10} love={true} />
                </Col>
                <Col>
                <Card id={1} name="product name" imgURL={Img} disc="long discription from product" salary={10} love={true} />
                </Col>
                <Col>
                <Card id={1} name="product name" imgURL={Img} disc="long discription from product" salary={10} love={true} />
                </Col>
            </Row>
            
        </Container>
        </>
    )
}
export default Home

