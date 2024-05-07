import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from '../component/card';
import img1 from '../images/home.jpg';
import img2 from '../images/home2.jpg'
const Favorite=()=>{
    return(
        <Container>
            <Row className='justify-content-center' >
                <Col lg={3} md={4} sm={6} xs={11} >
                    <Card id={1} name="product name" imgURL={img2} disc="long discription from product" salary={10} love={true} />
                </Col>
                <Col lg={3} md={4} sm={6} xs={11} >
                    <Card id={1} name="product name" imgURL={img1} disc="long discription from product" salary={10} love={true} />
                </Col>
                <Col lg={3} md={4} sm={6} xs={11} >
                    <Card id={1} name="product name" imgURL={img2} disc="long discription from product" salary={10} love={true} />
                </Col>
                <Col lg={3} md={4} sm={6} xs={11} >
                    <Card id={1} name="product name" imgURL={img1} disc="long discription from product" salary={10} love={true} />
                </Col>
                <Col lg={3} md={4} sm={6} xs={11} >
                    <Card id={1} name="product name" imgURL={img2} disc="long discription from product" salary={10} love={true} />
                </Col>
            </Row>
        </Container>
    )
}
export default Favorite