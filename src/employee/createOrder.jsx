
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';
import { Unstable_NumberInput as BaseNumberInput } from '@mui/base/Unstable_NumberInput';
import { styled } from '@mui/system';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {  createTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import {modeActions} from "../Store/Store"
import axios from "axios";

import Loading from '../component/loading';



const NumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
    return (
      <BaseNumberInput
        slots={{
          root: StyledInputRoot,
          input: StyledInput,
          incrementButton: StyledButton,
          decrementButton: StyledButton,
        }}
        slotProps={{
          incrementButton: {
            children: <AddIcon fontSize="small" />,
            className: 'increment',
          },
          decrementButton: {
            children: <RemoveIcon fontSize="small" />,
          },
        }}
        {...props}
        ref={ref}
      />
    );
  });
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  
const CreateOrder=()=>{

  const apiurl = useSelector(state=>state.url);
  const token = useSelector(state=>state.token);
  const acc = useSelector(state=>state.account);
  const basket = useSelector(state=>state.basket);
  const {clearBasket,addProduct,deleteProduct , deleteFullProduct} = modeActions;
  const dispatch = useDispatch();
    const [delaviryServe, setDelaviryServe] = React.useState(0);
    const [products,setproducts] = React.useState([]);
    const [cities,setCities] =React.useState([]);
    const [loading,setLoading] = React.useState(false);
    const [selectedCity,setSelectedCity] =React.useState({});
    const [errselectedCity,seterrSelectedCity] =React.useState(false);


    const handleChangeSelectedLocation = (event) => {
      setSelectedCity(event.target.value);
    };

    React.useEffect(() => {
        //setLoading(true);
        axios.get(apiurl+"showProducts")
            .then((response) => {
                setproducts(response.data.products)
            })
            .catch((error) => console.log(error));

        axios.get(apiurl+"showCitiesSectors")
            .then((response) => {
                setCities(response.data.cities)
            })
            .catch((error) => console.log(error));
    }, []);


    const handleChangeDelaviryServe = (event) => {

      dispatch(addProduct(
        {
            id:event.target.value.id,
            name:event.target.value.name,
            imgURL:event.target.value.img_url,
            salary:parseInt(event.target.value.price) ,
            quantity:1,
        }))
    };
    const changeNumberOfProduct=(product,newQuantity)=>{
      if(newQuantity > product.quantity)
        dispatch(addProduct(product))
      if(newQuantity<product.quantity)
        dispatch(deleteProduct(product.id))
      
    }
    const Total=()=>{
      var sum=0;
      for(var i=0;i<basket.length;i++){
        sum=sum+(basket[i].salary * basket[i].quantity)
      }
      return sum;
    }
    const add_req =()=>{
      if(!selectedCity.lat)
        seterrSelectedCity(true)
      if(selectedCity.lat && basket.length>0)
      {
            setLoading(true);
            try {
                const response = axios.post(apiurl+'addOrder', {
                  lat:selectedCity.lat,
                  lng:selectedCity.lng,
                  products:basket
                },{
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' +token 
                    }
                }
                ).then((response) => {

                    console.log(response.data);
                    setLoading(false)
                    dispatch(clearBasket())
                    window.location.reload();
                }).catch((error) => {
                    console.log(error)
                    setLoading(false)
                });
            } catch (e) {
                throw e;
            }        
        }
    }


    return(
        <Container>
            <Loading  loading={loading} />
            <Row className=' product_table pt_50 justify-content-center'>
                <Col lg={5} md={12}>
                    <FormControl theme={darkTheme} fullWidth>
                        <InputLabel id="demo-simple-select-label">selecte product</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={delaviryServe}
                        label="selecte product"
                        onChange={handleChangeDelaviryServe}
                            >
                            {
                                products.map((item)=>{
                                    return(
                                        <MenuItem value={item}>{item.name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Col>
                <Col lg={5} md={12} >
                        <FormControl theme={darkTheme} fullWidth>
                                <InputLabel id="demo-simple-select-label">Delivery method</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedCity}
                                label="Delivery method"
                                onChange={handleChangeSelectedLocation}
                                >
                                  {cities.map((item)=>{
                                    return(
                                      <MenuItem value={item}>{item.city_name}</MenuItem>
                                    )
                                  })}
                                </Select>
                                {errselectedCity && <p className="error-message"> Select the address to deliver to </p>}
                            </FormControl>
                </Col>
                <Col>
                
                </Col>

            </Row>
            <Row className=' product_table pt_50 justify-content-center'>
                <Col  sm={12} lg={12}>
                <TableContainer sx={{ borderRadius:"12px" }}  component={Paper}>
                    <Table sx={{ minWidth: 520 , color:"#fff" }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color:"#fff" , backgroundColor:"#bb252e" }} align="center" >image</TableCell>
                                <TableCell sx={{ color:"#fff" , backgroundColor:"#bb252e" }} align="center" >name of product</TableCell>
                                <TableCell sx={{ color:"#fff" , backgroundColor:"#bb252e" }} align="center">quantity</TableCell>
                                <TableCell sx={{ color:"#fff" , backgroundColor:"#bb252e" }} align="center">total</TableCell>
                                <TableCell sx={{ color:"#fff" , backgroundColor:"#bb252e" }} align="center">delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                        {basket.map((row,index) => (
                            <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell
                                  align="center"
                                  > 
                                    <img src={row.imgURL} className='table-c-img' />
                                </TableCell>
                                <TableCell
                                  align="center"
                                  >
                                   {row.name}
                                 </TableCell>
                                <TableCell 
                                  align="center"
                                  >
                                    <NumberInput value={row.quantity}  onChange={(event, newValue) => changeNumberOfProduct(row,newValue)} aria-label="Quantity Input" min={1} max={99} />    
                                </TableCell>
                                <TableCell 
                                  align="center"
                                  >
                                    {row.salary  } $
                                </TableCell>
                                <TableCell 
                                  align="center"
                                 >
                                    <Button onClick={()=>dispatch(deleteFullProduct(index))} sx={{ color:"#bb252e" }} >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell align="center"><Button onClick={()=>dispatch(clearBasket())}  color="error" variant="outlined"> clear  </Button></TableCell>
                            <TableCell></TableCell><TableCell></TableCell>
                            <TableCell align="center" >
                            <p className=' main-color'>toale :  {Total()} $ </p>  
                            </TableCell>
                            <TableCell align="center">
                            <Button onClick={()=>add_req()} color="error" variant="outlined"> add order  </Button>

                            </TableCell>

                        </TableRow>
                        </TableBody>
                    </Table>
                    </TableContainer>
                </Col>
                
            </Row>
        </Container>
    )
}
export default CreateOrder


const blue = {
    100: '#bb252e',
    200: '#bb252e',
    300: '#bb252e',
    400: '#bb252e',
    500: '#bb252e',
    600: '#bb252e',
    700: '#bb252e',
    800: '#bb252e',
  };
  
  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };
  
  const StyledInputRoot = styled('div')(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 400;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  `,
  );
  
  const StyledInput = styled('input')(
    ({ theme }) => `
    font-size: 0.875rem;
    font-family: inherit;
    font-weight: 400;
    line-height: 1.375;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 4px ${
      theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
    };
    border-radius: 8px;
    margin: 0 8px;
    padding: 10px 12px;
    outline: 0;
    min-width: 0;
    width: 4rem;
    text-align: center;
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
    }
  
    &:focus-visible {
      outline: 0;
    }
  `,
  );
  
  const StyledButton = styled('button')(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    line-height: 1.5;
    border: 1px solid;
    border-radius: 999px;
    border-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
    width: 32px;
    height: 32px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
  
    &:hover {
      cursor: pointer;
      background: ${theme.palette.mode === 'dark' ? blue[700] : blue[500]};
      border-color: ${theme.palette.mode === 'dark' ? blue[500] : blue[400]};
      color: ${grey[50]};
    }
  
    &:focus-visible {
      outline: 0;
    }
  
    &.increment {
      order: 1;
    }
  `,
  );