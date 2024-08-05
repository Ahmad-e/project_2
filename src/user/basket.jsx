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
import Img from '../images/home2.jpg'
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
import Err401 from '../SVGs/err401'

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
  
const Basket=()=>{

  const apiurl = useSelector(state=>state.url);
  const token = useSelector(state=>state.token);
  const acc = useSelector(state=>state.account);
  const basket = useSelector(state=>state.basket);
  const {clearBasket,addProduct,deleteProduct , deleteFullProduct} = modeActions;
  const dispatch = useDispatch();
    const [delaviryServe, setDelaviryServe] = React.useState(0);

    const handleChangeDelaviryServe = (event) => {
      setDelaviryServe(event.target.value);
    };


    const changeNumberOfProduct=(product,newQuantity)=>{
      if(newQuantity > product.quantity)
        dispatch(addProduct(product))
      if(newQuantity<product.quantity)
        dispatch(deleteProduct(product.id))
      
    }

    const test =()=>{
      
      /*dispatch(addProduct({
        id:10,
        name:"test",
        type_id:1,
        quantity:1,
      }))*/
      //dispatch(deleteFullProduct(1))
      dispatch(clearBasket())
      console.log(basket)
    }

    const Total=()=>{
      var sum=0;
      for(var i=0;i<basket.length;i++){
        sum=sum+(basket[i].salary * basket[i].quantity)
      }
      return sum;
    }

    if(acc!=="3")
      return(
        <div>
          <Err401 />
        </div>

      )

    return(
        <Container>
            <Row className='pt_50 justify-content-center'>
                <Col sm={12} md={7} lg={8}>
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
                        </TableBody>
                    </Table>
                    </TableContainer>
                </Col>
                <Col sm={8} md={5} lg={4}>
                    <div className='order-main-div' >
                    <h3 className='main-color t-a-c' >Purchase voucher</h3>
                    {basket.map((row) => (
                        <div className='order-line' >
                            <span > {row.name} <span className='main-color font_larg'>x</span> {row.quantity} : </span><span> {row.salary * row.quantity} $ </span>
                        </div>
                        ))}
                        <h5 className='order-line main-color' >
                            <span> total : </span><span>  {Total()}$ </span>
                        </h5>
                        <div className='p-10 t-a-c' >
                             <FormControl theme={darkTheme} fullWidth>
                                <InputLabel id="demo-simple-select-label">Delivery method</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={delaviryServe}
                                label="Delivery method"
                                onChange={handleChangeDelaviryServe}
                                >
                                  <MenuItem value={10}>Ten</MenuItem>
                                  <MenuItem value={20}>Twenty</MenuItem>
                                  <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <h4 className='p-10 t-a-c' >
                            <button onClick={()=>test()} style={{ minWidth:"220px" }} type="button" class="btn btn-primary">Order confirmation</button>
                        </h4>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default Basket


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