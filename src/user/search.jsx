import * as React from 'react';
//import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from '../component/card';
import img1 from '../images/home.jpg';
import img2 from '../images/home2.jpg';


import Slider from '@mui/material/Slider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function valuetext(value) {
    return `${value}°C`;
  }
  

const Search=()=>{

    const [value, setValue] = React.useState([1, 300]);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const [type, setType] = React.useState('');

    const handleChangeType = (event) => {
      setType(event.target.value);
    };
    
    return(
        <>
            <Row style={{ margin:"0px" }} className='justify-content-center'  >
                <Col style={{ padding: "45px 15px" }} lg={2} md={3} sm={4} xs={12} >
                    <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        min={1}
                        max={1000}
                        getAriaValueText={valuetext}
                    />
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
                        <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={type}
                        label="Age"
                        onChange={handleChangeType}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <FormHelperText>With label + helper text</FormHelperText>
                    </FormControl>
                </Col>
                <Col lg={10} md={9} sm={8} xs={12} >
                    <Row style={{ margin:"0px" }} className='justify-content-center' >
                        <Col xl={3} lg={4} md={6} sm={11} xs={11} >
                            <Card id={1} name="product name" imgURL={img2} disc="long discription from product" salary={10} love={true} />
                        </Col>
                        <Col xl={3} lg={4} md={6} sm={11} xs={11} >
                            <Card id={1} name="product name" imgURL={img2} disc="long discription from product" salary={10} love={true} />
                        </Col>
                        <Col xl={3} lg={4} md={6} sm={11} xs={11} >
                            <Card id={1} name="product name" imgURL={img2} disc="long discription from product" salary={10} love={true} />
                        </Col>
                        <Col xl={3} lg={4} md={6} sm={11} xs={11} >
                            <Card id={1} name="product name" imgURL={img2} disc="long discription from product" salary={10} love={true} />
                        </Col>
                        <Col xl={3} lg={4} md={6} sm={11} xs={11} >
                            <Card id={1} name="product name" imgURL={img2} disc="long discription from product" salary={10} love={true} />
                        </Col>
                        <Col xl={3} lg={4} md={6} sm={11} xs={11} >
                            <Card id={1} name="product name" imgURL={img2} disc="long discription from product" salary={10} love={true} />
                        </Col>
                        <Col xl={3} lg={4} md={6} sm={11} xs={11} >
                            <Card id={1} name="product name" imgURL={img2} disc="long discription from product" salary={10} love={true} />
                        </Col>
                        
                    </Row>
                </Col>
            </Row>
        </>
    )
}
export default Search