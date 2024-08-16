

import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '@mui/material/Button';

import Err401 from '../SVGs/err401'
import Err500 from '../SVGs/err500';
import Loading from '../component/loading';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';









export default function UserOrder() {

  const apiurl = useSelector(state=>state.url);
  const token = useSelector(state=>state.token);
  const acc = useSelector(state=>state.account);
  const [errServer,setErrServver] = React.useState(false);
  const [data,setData] = React.useState([]);
  React.useEffect(() => {
    axios.get( apiurl+"showUserOrders",
        {
            headers:{
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' +token 
            }
        }
    )
        .then((response) => {
            setData(response.data.orders)
            console.log(response.data);

        })
        .catch((error) => {
            console.log(error)
            setErrServver(true);
        });
}, []);

const consoleOrder=(id)=>{
    axios.get( apiurl+"cancelOrder/"+id,
          {
              headers:{
                  'Content-Type': 'application/json',
                  'Authorization' : 'Bearer ' +token 
              }
          }
      )
          .then((response) => {
              setData(response.data.orders)
              console.log(response.data);

          })
          .catch((error) => {
              console.log(error)
              setErrServver(true);
          });
}

function TRow(props) {
  var row = props.row
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell align="center">{row.status_name}</TableCell>
        <TableCell align="center">{row.delivery_price} $</TableCell>
        <TableCell align="center">{row.total_price - row.delivery_price} $</TableCell>
        <TableCell align="center">{row.products.length}</TableCell>
        <TableCell align="center">{row.total_price}  $</TableCell>
        <TableCell align="center"><Button onClick={()=>consoleOrder(row.order_id)} hidden={row.status_id!==1} size="small" color="error" variant="outlined">concole </Button></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, maxWidth:"600px" }}>
              <Typography variant="h6" gutterBottom component="div">
                Order  data
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    
                    <TableCell align="center" >name of product</TableCell>
                    <TableCell align="center" > price </TableCell>
                    <TableCell align="center"> quantity </TableCell>
                    <TableCell align="center">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell align="center" component="th" scope="row">
                        {historyRow.name}
                      </TableCell>
                      <TableCell align="center" >{historyRow.price}</TableCell>
                      <TableCell align="center">{historyRow.quantity}</TableCell>
                      <TableCell align="center">
                        {historyRow.price * historyRow.quantity}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

  

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

  return (
    <Container className='pt_50'>
        <TableContainer component={Paper}>
        <Table  aria-label="collapsible table">
            <TableHead>
                <TableRow>
                    <TableCell />  
                    <TableCell align="center"> state of order </TableCell>
                    <TableCell align="center"> delivery price </TableCell>
                    <TableCell align="center"> product total </TableCell>
                    <TableCell align="center"> product quantity </TableCell>
                    <TableCell align="center"> order total </TableCell>
                    <TableCell align="center"> cancel </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {data.map((row) => (
                <TRow key={row.order_id} row={row} />
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </Container>
  );
}