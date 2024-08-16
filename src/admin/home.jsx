import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { MobileDateRangePicker } from '@mui/x-date-pickers-pro/MobileDateRangePicker';
import { DesktopDateRangePicker } from '@mui/x-date-pickers-pro/DesktopDateRangePicker';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import { pickersLayoutClasses } from '@mui/x-date-pickers/PickersLayout';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';


import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import DeliveryDiningRoundedIcon from '@mui/icons-material/DeliveryDiningRounded';
import CurrencyExchangeRoundedIcon from '@mui/icons-material/CurrencyExchangeRounded';
import TtyRoundedIcon from '@mui/icons-material/TtyRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';


import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import FastfoodIcon from '@mui/icons-material/Fastfood';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Err401 from '../SVGs/err401'
import Err500 from '../SVGs/err500';
import Loading from '../component/loading';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const AdminHome=()=>{
    const apiurl = useSelector(state=>state.url);
    const token = useSelector(state=>state.token);
    const [employee,setEmployee] = React.useState([]);
    const [data,setData] = React.useState([]);
    const [loading,setLoading] = React.useState(false);



    const handleChangeDate=(event)=>{
                
        console.log(event)
        if(event[0] && event[1])
        {
                setLoading(true);
                try {
                        const response = axios.post(apiurl+"getReport" , {
                                date1:event[0],
                                date2:event[1]
                                },{
                            headers:{
                                'Content-Type': 'application/json',
                                'Authorization' : 'Bearer ' +token 
                            }
                        }
                        ).then((response) => {
                            console.log(response.data);
                            setEmployee(response.data.users)
                            setData(response.data)
                            setLoading(false)
                        }).catch((error) => {
                            console.log(error)
                            setLoading(false)
                        });
                    } catch (e) {
                        throw e;
                    }
        }
}
    const tuggleBlock =(id)=>{
        //console.log(productIdToDelete);
        setLoading(true);
        axios.get(apiurl+"toggleBlockUser/"+id,
        {
            headers:{
            'Authorization' : 'Bearer ' +token ,
            }
        })
            .then((response) => {
                    console.log(response.data);
                    //setproducts(response.data.products)
                    setLoading(false)
                })
            .catch((error) =>{
                console.log(error);
                setLoading(false);
            });
    }

    return(
        <Container>
                        <Loading  loading={loading} />
            <Row className='justify-content-center' >
                <Col className='admin_col' xl={12} xs={12}>
                    <div className='Admin_item_in_home'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateRangePicker']}>
                                <DemoItem label="2 calendars">
                                    <DateRangeCalendar onChange={(date) => handleChangeDate(date)} calendars={2} />
                                </DemoItem>
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col  lg={6} md={6} sm={12} >
                    <div className='Admin_item_in_home'>
                        <PeopleRoundedIcon style={{ fontSize:"80px" }} />
                        <div className='Admin_item_content'>
                            <p className='Admin_item_name'>New users</p>
                            <p className='Admin_item_number' >{data.users_count} new users</p>
                        </div>
                    </div>
                </Col>
                <Col  lg={6} md={6} sm={12} >
                    <div className='Admin_item_in_home'>
                        < DeliveryDiningRoundedIcon style={{ fontSize:"80px" }} />
                        <div className='Admin_item_content'>
                            <p className='Admin_item_name'>Delivery profits</p>
                            <p className='Admin_item_number' >{data.$delivery_prices} $</p>
                        </div>
                    </div>
                </Col>
                <Col  lg={6} md={6} sm={12} >
                    <div className='Admin_item_in_home'>
                        < FastfoodIcon style={{ fontSize:"80px" }} />
                        <div className='Admin_item_content'>
                            <p className='Admin_item_name'>total sales products</p>
                            <p className='Admin_item_number' >{data.$total_products} $</p>
                        </div>
                    </div>
                </Col>
                <Col  lg={6} md={6} sm={12} >
                    <div className='Admin_item_in_home'>
                        < ListAltIcon style={{ fontSize:"80px" }} />
                        <div className='Admin_item_content'>
                            <p className='Admin_item_name'>Total product profits</p>
                            <p className='Admin_item_number' >{data.$orders_prices} $</p>
                        </div>
                    </div>
                </Col>
                <Col  lg={6} md={6} sm={12} >
                    <div className='Admin_item_in_home'>
                        <CurrencyExchangeRoundedIcon style={{ fontSize:"80px" }}/>
                        <div className='Admin_item_content'>
                            <p className='Admin_item_name'>Sales profits</p>
                            <p className='Admin_item_number' >{data.$total_prices} $</p>
                        </div>
                    </div>
                </Col>
                <Col  lg={6} md={6} sm={12} >
                    <div className='Admin_item_in_home'>
                        <TtyRoundedIcon style={{ fontSize:"80px" }}/>
                        <div className='Admin_item_content'>
                            <p className='Admin_item_name'> number of order </p>
                            <p className='Admin_item_number' >{data.orders_count} order</p>
                        </div>
                    </div>
                </Col>
                <Col  lg={12} sm={12} >
                    <div className='Admin_item_in_home'>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center" >name</StyledTableCell>
                                    <StyledTableCell align="center">email</StyledTableCell>
                                    <StyledTableCell align="center">phone numper</StyledTableCell>
                                    <StyledTableCell align="center">section id</StyledTableCell>
                                    <StyledTableCell align="center"> The job </StyledTableCell>
                                    <StyledTableCell align="center"> block </StyledTableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {employee.map((row) =>{
                                    if(row.role_id===2 || row.role_id===4)
                                    return(
                                    
                                        <StyledTableRow key={row.name}>
                                            <StyledTableCell align="center" component="th" scope="row">
                                                {row.name}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{row.email}</StyledTableCell>
                                            <StyledTableCell align="center">{row.phone_no}</StyledTableCell>
                                            <StyledTableCell align="center">{row.sector_id}</StyledTableCell>
                                            <StyledTableCell align="center">{row.role_id===2 ? ("section Employee") : ("delivary")}</StyledTableCell>
                                            <StyledTableCell align="center"><Button onClick={()=>tuggleBlock(row.id)} size="small" color="error" variant="outlined">block </Button></StyledTableCell>
                                        </StyledTableRow>
                                    )
                                } )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Col>
            </Row>
        </Container>
            
    )
}
export default AdminHome