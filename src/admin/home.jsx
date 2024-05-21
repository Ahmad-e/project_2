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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
const AdminHome=()=>{
    return(
        <Container>
            <Row className='justify-content-center' >
                <Col className='admin_col' xl={12} xs={12}>
                    <div className='Admin_item_in_home'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateRangePicker']}>
                                <DemoItem label="2 calendars">
                                    <DateRangeCalendar calendars={2} />
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
                            <p className='Admin_item_good'>up to 20% <TrendingUpRoundedIcon/></p>
                            <p className='Admin_item_danger'>down to 20% <TrendingDownRoundedIcon/></p>
                            <p className='Admin_item_number' >2334 users</p>
                        </div>
                    </div>
                </Col>
                <Col  lg={6} md={6} sm={12} >
                    <div className='Admin_item_in_home'>
                        < DeliveryDiningRoundedIcon style={{ fontSize:"80px" }} />
                        <div className='Admin_item_content'>
                            <p className='Admin_item_name'>Delivery profits</p>
                            <p className='Admin_item_good'>up to 20% <TrendingUpRoundedIcon/></p>
                            <p className='Admin_item_danger'>down to 20% <TrendingDownRoundedIcon/></p>
                            <p className='Admin_item_number' >2334 $</p>
                        </div>
                    </div>
                </Col>
                <Col  lg={6} md={6} sm={12} >
                    <div className='Admin_item_in_home'>
                        <CurrencyExchangeRoundedIcon style={{ fontSize:"80px" }}/>
                        <div className='Admin_item_content'>
                            <p className='Admin_item_name'>Sales profits</p>
                            <p className='Admin_item_good'>up to 20% <TrendingUpRoundedIcon/></p>
                            <p className='Admin_item_danger'>down to 20% <TrendingDownRoundedIcon/></p>
                            <p className='Admin_item_number' >2334000 $</p>
                        </div>
                    </div>
                </Col>
                <Col  lg={6} md={6} sm={12} >
                    <div className='Admin_item_in_home'>
                        <TtyRoundedIcon style={{ fontSize:"80px" }}/>
                        <div className='Admin_item_content'>
                            <p className='Admin_item_name'>Delivery profits</p>
                            <p className='Admin_item_good'>up to 20% <TrendingUpRoundedIcon/></p>
                            <p className='Admin_item_danger'>down to 20% <TrendingDownRoundedIcon/></p>
                            <p className='Admin_item_number' >2334 $</p>
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
                                {rows.map((row) => (
                                    <StyledTableRow key={row.name}>
                                        <StyledTableCell align="center" component="th" scope="row">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row.calories}</StyledTableCell>
                                        <StyledTableCell align="center">{row.fat}</StyledTableCell>
                                        <StyledTableCell align="center">{row.carbs}</StyledTableCell>
                                        <StyledTableCell align="center">{row.protein}</StyledTableCell>
                                        <StyledTableCell align="center"><Button size="small" color="error" variant="outlined">block </Button></StyledTableCell>
                                    </StyledTableRow>
                                ))}
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