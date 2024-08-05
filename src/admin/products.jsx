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

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

import Card from '../component/card'

import Img from '../images/home2.jpg';

import Loading from '../component/loading';
import axios from "axios";
import {  useSelector } from 'react-redux';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });




const Products=()=>{
    const [name, setName] = React.useState("");
    const [disc, setDisc] = React.useState("");
    const [type, setType] = React.useState(0);
    const [salary, setSalary] = React.useState(0);
    const [image, setImage] = React.useState(0);

    const [errname, seterrName] = React.useState(false);
    const [errdisc, seterrDisc] = React.useState(false);
    const [errtype, seterrType] = React.useState(false);
    const [errSalary, seterrSalary] = React.useState(false);

    const [productIdToDelete, setProductIdToDelete] = React.useState(0);

    const [changeType, setChangeType] = React.useState(0);
    const [changename, setchangeName] = React.useState(0);
    const [changedisc, setchangeDisc] = React.useState(0);
    const [opendeleteDialog, setOpendeleteDialog] = React.useState(false);

    const [loading,setLoading] = React.useState(false);
    const [types,settypes] = React.useState([]);
    const [products,setproducts] = React.useState([]);
    const apiurl = useSelector(state=>state.url);
    const token = useSelector(state=>state.token);
    React.useEffect(() => {
        //setLoading(true);
        axios.get(apiurl+"showProducts")
            .then((response) => {
                settypes(response.data.products_types)
                setproducts(response.data.products)
            })
            .catch((error) => console.log(error));
    }, []);


    const handleChangeName = (event) => {
        setName(event.target.value);
        if(event.target.value === "")
            seterrName(true);
        else
            seterrName(false);
    };

    const handleChangeDisc = (event) => {
        setDisc(event.target.value);
        if(event.target.value === "")
            seterrDisc(true);
        else
            seterrDisc(false);
    };

    const handleChangeType = (event) => {
        setType(event.target.value);
    };
    const handleChangeSalary = (event) => {
        setSalary(event.target.value);
        if(event.target.value <= 0)
            seterrSalary(true);
        else
            seterrSalary(false);
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
  const handleChangeFile=(e)=>{
    if (e.target.files) {
      setImage(e.target.files[0]);
      
    }
  }


  const addProduct =()=>{
    console.log(token);


    if(name!=="" && disc !=="" && type!==0 && salary>0 && image)
        {
            var form = new FormData();
            form.append('name', name);
            form.append('disc', disc);
            form.append('type_id', type);
            form.append('price', salary);
            form.append('quantity', 100);
            form.append('img_url', image);
            setLoading(true);
            try {
                const response = axios.post(apiurl+'addProduct',
                form,
                {
                    headers:{
                        'Content-Type': 'multipart/form-data',
                        'Authorization' : 'Bearer ' +token ,
                        'Accept':"application/json"
                    }
                }
                ).then((response) => {
                    console.log(response.data);
                    setproducts(response.data.products)
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
    const tuggleBlock =()=>{
        //console.log(productIdToDelete);
        setOpendeleteDialog(false)
        setLoading(true);
        axios.get(apiurl+"toggleBlockProduct/"+productIdToDelete,
        {
            headers:{
            'Authorization' : 'Bearer ' +token ,
            }
        })
            .then((response) => {
                    console.log(response.data);
                    setproducts(response.data.products)
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
                            {products.map((row) => (
                                <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell align="center">
                                    <img style={{ borderRadius:"9px" }} src={row.img_url} className='table-c-img' />
                                </TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.type_name}</TableCell>
                                <TableCell align="center">{row.disc}</TableCell>
                                <TableCell align="center">
                                     <Button onClick={()=>handleClickOpenChangeDialog(true)} sx={{ color:"#bb252e" }} >
                                        change
                                    </Button>
                                </TableCell>
                                <TableCell align="center">
                                     <Button onClick={()=>{setProductIdToDelete(row.id); handleClickOpenDeleteDialog()}} sx={{ color:"#bb252e" }} >
                                        {row.visible===1 ? "delete" : "recovery"}
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
                    <input accept="image/*" onChange={handleChangeFile}  type="file" id="inputFile1" />
                    <label className="btn-primary btn" for="inputFile1" > Upload image <FileUploadRoundedIcon/> </label>
                    <br/><br/>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">type</InputLabel>
                        <Select
                            error={errtype}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            label="type"
                            onChange={handleChangeType}
                        >
                            {
                                types.map((item)=>{
                                    return(
                                        <MenuItem value={item.id}>{item.name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    <br/><br/>
                        <TextField
                            error={errname}
                            id="outlined-error-helper-text"
                            label="name"
                            defaultValue=""
                            helperText="This field must not be empty"
                            onChange={handleChangeName}
                            />
                        <TextField
                            error={errdisc}
                            id="outlined-error-helper-text"
                            label="description"
                            defaultValue=""
                            helperText="This field must not be empty"
                            onChange={handleChangeDisc}
                            />
                        <TextField
                            error={errSalary}
                            type='number'
                            min={0}
                            id="outlined-error-helper-text"
                            label="salary"
                            helperText="This field must not be empty"
                            onChange={handleChangeSalary}
                            />
                        <br/><br/>
                    <button onClick={()=>addProduct()}  type="button" class="btn btn-primary "> save data <SaveAsTwoToneIcon /> </button>
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
                    Delet and recovery returning an item means that it will or may not appear to customers
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button className="App_button" sx={{ color:"#bb252e" }} onClick={handleCloseDeleteDialog}>close</Button>
                <Button className="App_button" sx={{ color:"#bb252e" }} onClick={()=>tuggleBlock()}>delete</Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}
export default Products