import Carousel from 'react-bootstrap/Carousel';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Img from '../images/home2.jpg'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';

import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import SaveAsTwoToneIcon from '@mui/icons-material/SaveAsTwoTone';



import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

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

const Ads=()=>{

    const [image, setImage] = React.useState("");
    const [url, seturl] = React.useState("");
    const [errUrl, setErrUrl] = React.useState(false);

    const [disc, setDisc] = React.useState("");
    const [errDisc, setErrdisc] = React.useState(false);

    const handleChangeDisc =(value)=>{
        setDisc(value.target.value);
        if(value.target.value==="")
            setErrdisc(true);
        else
            setErrdisc(false);
    }
    const handleChangeurl =(value)=>{
        seturl(value.target.value);
        if(value.target.value==="")
            setErrUrl(true);
        else
            setErrUrl(false);
    }
    const [openDealog, setOpenDealog] = React.useState(false);



    const handleChange = (file) => {
      const input = file.currentTarget;
  
      var reader = new FileReader();
      reader.onload = function () {
        const dataURL = reader.result;
        setImage({ name: input.files[0].name, src: dataURL });
      };
      reader.readAsDataURL(input.files[0]);
    };

    return(
        <Container>
            <Carousel>
                <Carousel.Item interval={60000}>
                <img id="imagen1" src={image.src} alt="Upload image to show it" className='carousel-img'  text="First slide" />
                <Carousel.Caption>
                    <div className='home-image' >
                        <div className='home-text-main'>
                            {disc}
                        </div>
                        <button  type="button" class="btn btn-primary home-button-main"> GET STARTED </button>
                    </div>
                </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <br/><br/><br/>

            
            <Row className=' justify-content-center'>
                <Col  lg={9} md={7} sm={12} >
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell sx={{ color:"#fff" , backgroundColor:"#bb252e" }} align="center" >image</TableCell>
                                <TableCell sx={{ color:"#fff" , backgroundColor:"#bb252e" }} align="center">discri</TableCell>
                                <TableCell sx={{ color:"#fff" , backgroundColor:"#bb252e" }} align="center">link</TableCell>
                                <TableCell sx={{ color:"#fff" , backgroundColor:"#bb252e" }} align="center">delete</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell align="center">
                                <img src={Img} className='table-c-img' />
                                </TableCell>
                                <TableCell align="center">{row.calories}</TableCell>
                                <TableCell align="center">{row.fat}</TableCell>
                                <TableCell align="center">
                                     <Button onClick={()=> setOpenDealog(true)} sx={{ color:"#bb252e" }} >
                                        Delete
                                    </Button> </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                </Col>
                <Col  lg={3} md={5} sm={10} >
                    <br/>
                    
                    <input accept="image/*" onChange={handleChange} type="file" id="inputFile1" />
                    <label className="btn-primary btn" for="inputFile1" > Upload image <FileUploadRoundedIcon/> </label>
                    <br/><br/>
                    <TextField
                        error={errDisc}
                        id="outlined-error-helper-text"
                        label="Description"
                        defaultValue=""
                        helperText="This field must not be empty"
                        onChange={handleChangeDisc}
                        />
                    <br/><br/>
                    <TextField
                        error={errUrl}
                        id="outlined-error-helper-text"
                        label="link"
                        defaultValue=""
                        helperText="This field must not be empty"
                        onChange={handleChangeurl}
                        />
                        <br/><br/>
                    <button href={url} type="button" class="btn btn-primary"> save data <SaveAsTwoToneIcon /> </button>
                </Col>
            </Row>
            <br/><br/><br/>
            <Dialog
                open={openDealog}
                TransitionComponent={Transition}
                keepMounted
                onClose={()=>setOpenDealog(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle> delete ads </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                
                Are you sure to delete permanently?


                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button className="App_button" onClick={()=>setOpenDealog(false)}>close</Button>
                <Button className="App_button" onClick={()=>setOpenDealog(false)}>delete</Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}
export default Ads