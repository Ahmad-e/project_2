
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

    const [url, seturl] = React.useState("");
    const [errUrl, setErrUrl] = React.useState(false);
    const [openChangeDialog, setOpenChangeDialog] = React.useState(false);

    const handleChangeurl =(value)=>{
        seturl(value.target.value);
        if(value.target.value==="")
            setErrUrl(true);
        else
            setErrUrl(false);
    }

    const handleClickOpenChangeDialog = () => {
        setOpenChangeDialog(true);
    };
    const handleCloseChangeDialog = () => {
        setOpenChangeDialog(false);
    };


    return(
        <Container>
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
                            {rows.map((row) => (
                                <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell align="center">
                                    text - text
                                </TableCell>
                                <TableCell align="center">
                                     <Button onClick={handleClickOpenChangeDialog} sx={{ color:"#bb252e" }} >
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
                    <button href={url} type="button" class="btn btn-primary "> save data <SaveAsTwoToneIcon /> </button>
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
                    id="outlined-error-helper-text"
                    label="ling"
                    defaultValue=""
                    helperText="This field must not be empty"
                    
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
export default Types