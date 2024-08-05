
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';
import SaveAsTwoToneIcon from '@mui/icons-material/SaveAsTwoTone';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import Loading from '../component/loading';
import axios from "axios";
import {  useSelector } from 'react-redux';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });



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

const Types=()=>{
    const [loading,setLoading] = React.useState(false);
    const [data,setData] = React.useState([]);
    const apiurl = useSelector(state=>state.url);
    const token = useSelector(state=>state.token);
    React.useEffect(() => {
        //setLoading(true);
        axios.get(apiurl+"showProductTypes")
            .then((response) => setData(response.data.types))
            .catch((error) => console.log(error));
    }, []);

    const [url, seturl] = React.useState("");

    const [errUrl, setErrUrl] = React.useState(false);
    const [openChangeDialog, setOpenChangeDialog] = React.useState(false);
    const [tIdToChange, setTIdToChange] = React.useState(0);
    const [tNaneToChange, setTNameToChange] = React.useState("");
    const [errtNaneToChange, seterrTNameToChange] = React.useState("");
    const handleChangeurl =(value)=>{
        seturl(value.target.value);
        if(value.target.value==="")
            setErrUrl(true);
        else
            setErrUrl(false);
    }

    const handleChangeNewData =(value)=>{
        setTNameToChange(value.target.value);
        if(value.target.value==="")
            seterrTNameToChange(true);
        else
            seterrTNameToChange(false);
    }

    const handleClickOpenChangeDialog = (Tid) => {
        setOpenChangeDialog(true);
        setTIdToChange(Tid)
    };
    const handleCloseChangeDialog = () => {
        setOpenChangeDialog(false);
    };

    const addTProduct = ()=>{
        if(url!=="")
        {
            setLoading(true);
            try {
                const response = axios.post(apiurl+'addProductType', {
                    name:url
                },{
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' +token 
                    }
                }
                ).then((response) => {
                    setData(response.data.types);
                    console.log(response.data);
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

    const changeTProduct = ()=>{
        if(tNaneToChange!=="")
        {
            setLoading(true);
            try {
                const response = axios.post(apiurl+'editProductType', {
                    id:tIdToChange ,
                    name:tNaneToChange
                },{
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' +token 
                    }
                }
                ).then((response) => {
                    setData(response.data.types);
                    console.log(response.data);
                    setLoading(false)
                }).catch((error) => {
                    console.log(error)
                    setLoading(false)
                });
                setOpenChangeDialog(false);
            } catch (e) {
                throw e;
            }
        }
    }

    return(
        <Container>
            <Loading  loading={loading} />
            <br/><br/>
            <Row className=' justify-content-center'>
                <Col style={{ display: "flex" }} className=' justify-content-center' lg={7} md={6} sm={12} >
                    <TableContainer sx={{ maxWidth : 500 }} component={Paper}>
                        <Table sx={{ minWidth: 300 , maxWidth : 500 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell sx={{ color:"#fff" , backgroundColor:"#bb252e" }} align="center" >type</TableCell>
                                <TableCell sx={{ color:"#fff" , backgroundColor:"#bb252e" }} align="center">change</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {data.map((row) => (
                                <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell align="center">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">
                                     <Button onClick={()=>handleClickOpenChangeDialog(row.id)} sx={{ color:"#bb252e" }} >
                                        change data
                                    </Button> </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                </Col>
                <Col  lg={3} md={5} sm={10} >
                    <br/>

                        <TextField
                        error={errUrl}
                        id="outlined-error-helper-text"
                        label="type"
                        defaultValue=""
                        helperText="This field must not be empty"
                        onChange={handleChangeurl}
                        />
                        <br/><br/>
                    <button onClick={()=>addTProduct()} type="button" class="btn btn-primary "> save data <SaveAsTwoToneIcon /> </button>
                </Col>
            </Row>
            <br/><br/><br/>

            <Dialog
                open={openChangeDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseChangeDialog}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle> change data </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                <br/>
                    <TextField
                    error={errtNaneToChange}
                    
                    label="name"
                    defaultValue=""
                    helperText={ errtNaneToChange ?  "This field must not be empty" : ""}
                    onChange={handleChangeNewData}
                    />
                    <br/><br/>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button className="App_button" onClick={handleCloseChangeDialog}>console</Button>
                <Button className="App_button" onClick={changeTProduct}>save</Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}
export default Types