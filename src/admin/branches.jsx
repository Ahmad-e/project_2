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

import { useDispatch, useSelector } from 'react-redux';
import Loading from '../component/loading';
import axios from "axios";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Branches=()=>{
    const apiurl = useSelector(state=>state.url);
    const token = useSelector(state=>state.token);
    const url = useSelector(state=>state.url);
    const [lat, setLat] = React.useState(0);
    const [Ling, setLing] = React.useState(0);
    const [loading,setLoading] = React.useState(false);
    //const [errLat, setErrLat] = React.useState(0);
    //const [errLing, setErrLing] = React.useState(0);


    const [city, setCity] = React.useState({});
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


    const [sectorIdToChange, setSectorIdToChange] = React.useState(0);
    const [changelat, setchangeLat] = React.useState(0);
    const [changeLing, setchangeLing] = React.useState(0);
    const [changecity, setchangeCity] = React.useState(0);

    const handleClickOpenChangeDialog = (data) => {
        setOpenChangeDialog(true);
        setSectorIdToChange(data.id)
        setchangeCity(data.city_id)
        setchangeLat(data.sector_lat)
        setchangeLing(data.sector_lng)
        
    };
    const handleCloseChangeDialog = () => {
        setOpenChangeDialog(false);
    };

    const handleChangeChangedLat = (event) => {
        setchangeLat(event.target.value);
    };

    const handleChangeChangedLing = (event) => {
        setchangeLing(event.target.value);
    };

    const handleChangeChangedCity = (event) => {
        setchangeCity(event.target.value);
    };




    const [sectors,setSectors] = React.useState([])
    const [cities,setCities] = React.useState([])
    React.useEffect(() => {
      axios.get(apiurl+"showCitiesSectors")
          .then((response) => {
              setSectors(response.data.sectors);
              setCities(response.data.cities)
              console.log(response.data);
          })
          .catch((error) => console.log(error));
  }, []);

    const AddBramch = () => {
        console.log(token)
        console.log({
            city_id:city.id,
            lat:city.lat,
            lng:city.lng
        })
        if(city)
        {
            try {
                setLoading(true)
                const response = axios.post(url+'addSector', 
                {
                    city_id:city.id,
                    lat:city.lat,
                    lng:city.lng
                },{
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' +token 
                    }
                }
                ).then((response) => {
                    console.log(response.data);
                    setSectors(response.data.sectors)
                    setLoading(false);
                }).catch((error) => {
                    
                    setLoading(false)
                    console.log(error);
                });
                } catch (e) {
                    throw e;
                }
            }
        
    }
    const ChangeBranch =()=>{
        console.log(changeLing , changelat , changecity)
        if(changeLing && changelat && changecity)
        {
            try {
                setLoading(true)
                const response = axios.post(url+'editSector', 
                {
                    sector_id:sectorIdToChange,
                    city_id:changecity,
                    lat:changelat,
                    lng:changeLing
                },{
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer ' +token 
                    }
                }
                ).then((response) => {
                    console.log(response.data);
                    setLoading(false);
                    setSectors(response.data.sectors)
                    setOpenChangeDialog(false)
                }).catch((error) => {
                    
                    setLoading(false)
                    console.log(error);
                });
                } catch (e) {
                    throw e;
                }
        }
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
                            {sectors.map((row) => (
                                <TableRow
                                key={row.city_name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >

                                <TableCell align="center">
                                    {row.city_name}
                                </TableCell>
                                <TableCell align="center">{row.sector_lat}</TableCell>
                                <TableCell align="center">{row.sector_lng}</TableCell>
                                <TableCell align="center">
                                     <Button onClick={()=>handleClickOpenChangeDialog(row)} sx={{ color:"#bb252e" }} >
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
                        {
                            cities.map((item)=>{
                                return(
                                    <MenuItem value={item}>{ item.city_name }</MenuItem>
                                )
                            })
                        }
                        </Select>
                    </FormControl>
                    <br/>
                   {/* 
                   <br/><TextField
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
                    />*/}
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
                    value={changecity}
                    label="city"
                    onChange={handleChangeChangedCity}
                    >
                        {
                            cities.map((item)=>{
                                return(
                                    <MenuItem value={item.id}>{ item.city_name }</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
                <br/><br/>
                <TextField
                    type='number'
                    
                    id="outlined-error-helper-text"
                    label="lat"
                    defaultValue=""
                    helperText="This field must not be empty"
                    value={changelat}
                    onChange={handleChangeChangedLat}
                    />
                    <TextField
                    type='number'
                    
                    id="outlined-error-helper-text"
                    label="ling"
                    defaultValue=""
                    helperText="This field must not be empty"
                    value={changeLing}
                    onChange={handleChangeChangedLing}
                    />
                    <br/><br/>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button className="App_button" onClick={handleCloseChangeDialog}>console</Button>
                <Button className="App_button" onClick={()=>ChangeBranch()}>save</Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}
export default Branches