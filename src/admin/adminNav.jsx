import Nav from 'react-bootstrap/Nav';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import FastfoodRoundedIcon from '@mui/icons-material/FastfoodRounded';
import SpaceDashboardRoundedIcon from '@mui/icons-material/SpaceDashboardRounded';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import WebOutlinedIcon from '@mui/icons-material/WebOutlined';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {modeActions} from "../Store/Store";

const AdminNav=()=>{
    const currentURL = useLocation().pathname;

    const dispatch = useDispatch();
    const {setToken,setAcc} = modeActions;

    const logOut=()=>{
        dispatch(setAcc(null))
        dispatch(setToken(null))
    }

    return(
        <div className='Admin_navbar'>
            <h5 className='disable_in_mobile' style={{ padding:"20px" }} >
                wenday's  dashpord
            </h5>
            <Nav.Link className={ currentURL==="/admin/home" ? 'Admin_nav_link_selected Admin_nav_link' : "Admin_nav_link"} href="/admin/home">
                <SpaceDashboardRoundedIcon/><span className='disable_in_mobile'>home</span> 
            </Nav.Link>
            <Nav.Link className={ currentURL==="/admin/order" ? 'Admin_nav_link_selected Admin_nav_link' : "Admin_nav_link"} href="/admin/order">
                <ChecklistIcon/><span className='disable_in_mobile'>orders</span> 
            </Nav.Link>
            <Nav.Link className={ currentURL==="/admin/employees" ? 'Admin_nav_link_selected Admin_nav_link' : "Admin_nav_link"} href="/admin/employees">
                <PersonAddIcon/><span className='disable_in_mobile'>employees</span>  
            </Nav.Link>

            <Nav.Link className={ currentURL==="/admin/keywords" ? 'Admin_nav_link_selected Admin_nav_link' : "Admin_nav_link"} href="/admin/keywords">
                 <VpnKeyRoundedIcon/><span className='disable_in_mobile'>keywords</span>  
            </Nav.Link>

            <Nav.Link className={ currentURL==="/admin/products" ? 'Admin_nav_link_selected Admin_nav_link' : "Admin_nav_link"} href="/admin/products">
                <FastfoodRoundedIcon/><span className='disable_in_mobile'>products</span>  
            </Nav.Link>

            <Nav.Link className={ currentURL==="/admin/branchs" ? 'Admin_nav_link_selected Admin_nav_link' : "Admin_nav_link"} href="/admin/branchs">
                <StorefrontOutlinedIcon/><span className='disable_in_mobile'>branchs</span>  
            </Nav.Link>

            <Nav.Link className={ currentURL==="/admin/ads" ? 'Admin_nav_link_selected Admin_nav_link' : "Admin_nav_link"} href="/admin/ads">
                <WebOutlinedIcon/><span className='disable_in_mobile'>ads</span>  
            </Nav.Link>
            <Nav.Link onClick={()=>logOut()} className="Admin_nav_link" >
                <span  className='disable_in_mobile'>log out</span>  
            </Nav.Link>
        </div>
    )
}
export default AdminNav