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

const Branches=()=>{

    const [lat, setLat] = React.useState(0);
    const [Ling, setLing] = React.useState(0);

    //const [errLat, setErrLat] = React.useState(0);
    //const [errLing, setErrLing] = React.useState(0);


    const [city, setCity] = React.useState('');
    const [openChangeDialog, setOpenChangeDialog] = React.useState(false);


    const handleChangeLat = (event) => {
        setLat(event.target.value);
    };

    const handleChangeLing = (event) => {
        setLing(event.target.value);
    };

    const handleChangeCity = (event) => {
        setCity(event.target.value);
    };

    const handleClickOpenChangeDialog = () => {
        setOpenChangeDialog(true);
    };
    const handleCloseChangeDialog = () => {
        setOpenChangeDialog(false);
    };



    const AddBramch = () => {
        console.log(city)        
        console.log(lat,Ling)
    }
    return(
        <Container>
            <br/><br/>
            <Row className=' justify-content-center'>
                <Col  lg={9} md={7} sm={12} >
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell sx={{ color:"#fff" , backgroundColor:"#bb252e" }} align="center" >address</TableCell>
                                <TableCell sx={{ color:"#fff" , backgroundColor:"#bb252e" }} align="center">lat</TableCell>
                                <TableCell sx={{ color:"#fff" , backgroundColor:"#bb252e" }} align="center">lng</TableCell>
                                <TableCell sx={{ color:"#fff" , backgroundColor:"#bb252e" }} align="center">change</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell align="center">
                                    text - text
                                </TableCell>
                                <TableCell align="center">{row.calories}</TableCell>
                                <TableCell align="center">{row.fat}</TableCell>
                                <TableCell align="center">
                                     <Button onClick={()=>setOpenChangeDialog(true)} sx={{ color:"#bb252e" }} >
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
                
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">city</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={city}
                        label="city"
                        onChange={handleChangeCity}
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
                        label="lat"
                        defaultValue=""
                        helperText="This field must not be empty"
                        onChange={handleChangeLat}
                        />
                        <TextField
                        type='number'
                        
                        id="outlined-error-helper-text"
                        label="ling"
                        defaultValue=""
                        helperText="This field must not be empty"
                        onChange={handleChangeLing}
                        />
                        <br/><br/>
                    <button onClick={()=>AddBramch()}  type="button" class="btn btn-primary "> save data <SaveAsTwoToneIcon /> </button>
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
                
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">city</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={city}
                    label="city"
                    onChange={handleChangeCity}
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
                    label="lat"
                    defaultValue=""
                    helperText="This field must not be empty"
                    onChange={handleChangeLat}
                    />
                    <TextField
                    type='number'
                    
                    id="outlined-error-helper-text"
                    label="ling"
                    defaultValue=""
                    helperText="This field must not be empty"
                    onChange={handleChangeLing}
                    />
                    <br/><br/>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button className="App_button" onClick={handleCloseChangeDialog}>console</Button>
                <Button className="App_button" onClick={handleCloseChangeDialog}>save</Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}
export default Branches