import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const SearchBar =()=>{
    const mode = "datk"
    const [text,setText]=React.useState('-1');

    const handleChangeText=(event)=>{
        setText(event.target.value)
    }
    return (
        <Container>
            <Row  className="justify-content-center">
                <Paper
                
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 , marginBottom: "20px" }}
                >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    onChange={handleChangeText}
                    placeholder="Search for product name"
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton href={text==="" ? ('/search/-1/-1') : ('/search/'+text+'/-1')} type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
                </Paper>
            </Row>
        </Container>
      );
}
export default SearchBar