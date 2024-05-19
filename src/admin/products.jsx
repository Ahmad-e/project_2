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
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';


import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

import Card from '../component/card'

import Img from '../images/home2.jpg';

//import axios from "axios";

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

const Products=()=>{
    const [name, setName] = React.useState(0);
    const [disc, setDisc] = React.useState(0);
    const [type, setType] = React.useState(0);

    const [errname, seterrName] = React.useState(false);
    const [errdisc, seterrDisc] = React.useState(false);
    const [errtype, seterrType] = React.useState(false);


    const [changeType, setChangeType] = React.useState(0);
    const [changename, setchangeName] = React.useState(0);
    const [changedisc, setchangeDisc] = React.useState(0);
    const [opendeleteDialog, setOpendeleteDialog] = React.useState(false);


    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleChangeDisc = (event) => {
        setDisc(event.target.value);
    };

    const handleChangeType = (event) => {
        setType(event.target.value);
    };

    
    const handleChangeChangeType = (event) => {
        setChangeType(event.target.value);
    };
    const handleChangeChangeName = (event) => {
        setchangeName(event.target.value);
    };
    const handleChangeChangeDisc = (event) => {
        setchangeDisc(event.target.value);
    };

    const handleClickOpenChangeDialog = () => {
        setOpenChangeDialog(true);
    };
    const handleCloseChangeDialog = () => {
        setOpenChangeDialog(false);
    };
    
    const handleClickOpenDeleteDialog = () => {
        setOpendeleteDialog(true);
    };
    const handleCloseDeleteDialog = () => {
        setOpendeleteDialog(false);
    };


    const AddBramch = () => {
        console.log(type)        
        console.log(name,disc)
    }

    const [openChangeDialog, setOpenChangeDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenChangeDialog(true);
  };

  const handleClose = () => {
    setOpenChangeDialog(false);
  };



    return(
        <Container>
            <br/><br/>
            <Row className=' justify-content-center'>
                <Col  lg={9} md={7} sm={12} >
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell sx={{ color:"#fff" , backgroundColor:"#bb252e" }} align="center" >image</TableCell>
                                <TableCell sx={{ color:"#fff" , backgroundColor:"#bb252e" }} align="center" >name</TableCell>
                                <TableCell sx={{ color:"#fff" , backgroundColor:"#bb252e" }} align="center">type</TableCell>
                                <TableCell sx={{ color:"#fff" , backgroundColor:"#bb252e" }} align="center">desc</TableCell>
                                <TableCell sx={{ color:"#fff" , backgroundColor:"#bb252e" }} align="center">change</TableCell>
                                <TableCell sx={{ color:"#fff" , backgroundColor:"#bb252e" }} align="center">deletw</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell align="center">
                                    <img style={{ borderRadius:"9px" }} src={Img} className='table-c-img' />
                                </TableCell>
                                <TableCell align="center">long disc</TableCell>
                                <TableCell align="center">{row.calories}</TableCell>
                                <TableCell align="center">{row.fat}</TableCell>
                                <TableCell align="center">
                                     <Button onClick={()=>handleClickOpenChangeDialog(true)} sx={{ color:"#bb252e" }} >
                                        change
                                    </Button>
                                </TableCell>
                                <TableCell align="center">
                                     <Button onClick={handleClickOpenDeleteDialog} sx={{ color:"#bb252e" }} >
                                        delete
                                    </Button>
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                </Col>
                <Col  lg={3} md={5} sm={10} >
                    <br/>
                    <input accept="image/*"  type="file" id="inputFile1" />
                    <label className="btn-primary btn" for="inputFile1" > Upload image <FileUploadRoundedIcon/> </label>
                    <br/><br/>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">type</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="type"
                        onChange={handleChangeType}
                        >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <br/><br/>
                    <TextField
                        type='number'
                        
                        id="outlined-error-helper-text"
                        label="name"
                        defaultValue=""
                        helperText="This field must not be empty"
                        onChange={handleChangeName}
                        />
                        <TextField
                        id="outlined-error-helper-text"
                        label="description"
                        defaultValue=""
                        helperText="This field must not be empty"
                        onChange={disc}
                        />
                        <br/><br/>
                    <button onClick={()=>AddBramch()}  type="button" class="btn btn-primary "> save data <SaveAsTwoToneIcon /> </button>
                </Col>
            </Row>
            <br/><br/><br/>
        
            {/* change Dialog */} 
            <Dialog
                fullScreen
                open={openChangeDialog}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                    >
                    <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        change data
                    </Typography>
                    
                </Toolbar>
                </AppBar>
                <Col lg={12} sm={12} className='col_in_change_dialog' >
                        <br/>
                        <input className='p_20' accept="image/*"  type="file" id="inputFile1" />
                        <label  className="btn-primary btn p_20" for="inputFile1" > Upload image <FileUploadRoundedIcon/> </label>
                        <br/><br/>
                        <FormControl  sx={{ width:"224px", margin:"16px" }}>
                            <InputLabel id="demo-simple-select-label">type</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            label="type"
                            onChange={handleChangeType}
                            >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            sx={{  margin:"16px" }}
                            className='p_20'
                            id="outlined-error-helper-text"
                            label="name"
                            defaultValue=""
                            helperText="This field must not be empty"
                            onChange={handleChangeName}
                            />
                            <TextField
                            sx={{  margin:"16px" }}
                            id="outlined-error-help-text"
                            className='p_20'
                            label="description"
                            defaultValue=""
                            helperText="This field must not be empty"
                            onChange={disc}
                            />
                            <br/><br/>
                        
                    </Col>
                    <div lg={12} sm={12} className='col_in_change_dialog'>
                        <Card name={changename} id={100} disc={changedisc} imgURL={Img} /><br/><br/>
                        <button onClick={()=>AddBramch()}  type="button" class="btn btn-primary"> save data <SaveAsTwoToneIcon /> </button><br/><br/><br/><br/>
                    </div>
                
            </Dialog>
            {/* delete Dialog */}
            <Dialog
                open={opendeleteDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseChangeDialog}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle> Deleting product </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Deleting means that the item will no longer be visible to users <br/>
                    The item can be recovered after deleting it
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button className="App_button" onClick={handleCloseDeleteDialog}>close</Button>
                <Button className="App_button" onClick={handleCloseDeleteDialog}>delete</Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}
export default Products