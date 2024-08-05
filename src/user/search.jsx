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
import { useParams } from "react-router-dom";

import Loading from '../component/loading';
import axios from "axios";
import {  useSelector } from 'react-redux';

function valuetext(value) {
    return `${value}°C`;
  }
  

const Search=()=>{
    const param = useParams();
    const apiurl = useSelector(state=>state.url);
    const token = useSelector(state=>state.token);

    const [loading,setLoading] = React.useState(false);
    const [value, setValue] = React.useState([1, 300]);
    const [data,setData] = React.useState([]);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const [type, setType] = React.useState('');

    const handleChangeType = (event) => {
      setType(event.target.value);
    };
    const [types, setTypes] = React.useState([]);

    React.useEffect(() => {
        
        axios.get(apiurl+"showProducts")
        .then((response) => {
            setTypes(response.data.products_types);
        })
        .catch((error) => console.log(error));

        //////////
        setLoading(true);
        var body={}
        if(param.name!=="-1")
            body={name:param.name}
        if(param.type!=="-1")
            body={type_id:param.type}
        try {
            const response = axios.post(apiurl+'search', body,{
                headers:{
                    'Content-Type': 'application/json'
                }
            }
            ).then((response) => {
                setData(response.data.products);
                console.log(response.data);
                setLoading(false);
            }).catch((error) => {
                console.log(error)
                setLoading(false)
            });
        } catch (e) {
            throw e;
        }
    }, []);


    return(
        <>
        <Loading  loading={loading} />
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
                        <InputLabel id="demo-simple-select-helper-label">type</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={type}
                            label="type"
                            onChange={handleChangeType}
                        >
                        {
                            types.map((item)=>{
                                return(
                                    <MenuItem onClick={()=>window.location.href = ('/search/-1/'+item.id)} >{item.name}</MenuItem>
                                )
                            })
                        }
                        </Select>
                        <FormHelperText>Choose the product you are looking for according to its type</FormHelperText>
                    </FormControl>
                </Col>
                <Col lg={10} md={9} sm={8} xs={12} >
                    <Row style={{ margin:"0px" }} className='justify-content-center' >
                        {
                            data.map((item)=>{
                                if(item.price>value[0] && item.price<value[1] )
                                return(
                                    <Col lg={4} md={6} sm={11} xs={11} >
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
                </Col>
            </Row>
        </>
    )
}
export default Search