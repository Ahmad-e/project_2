import Nav from 'react-bootstrap/Nav';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {modeActions} from "../Store/Store";

const EmpNav=()=>{
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
                wenday's dashpord
            </h5>
            <Nav.Link className={ currentURL==="/employee/home" ? 'Admin_nav_link_selected Admin_nav_link' : "Admin_nav_link"} href="/employee/home">
                <ChecklistIcon/><span className='disable_in_mobile'>orders</span> 
            </Nav.Link>
            <Nav.Link className={ currentURL==="/employee" ? 'Admin_nav_link_selected Admin_nav_link' : "Admin_nav_link"} href="/employee/home">
                <EditNoteIcon/><span className='disable_in_mobile'>create order</span> 
            </Nav.Link>
            <Nav.Link className={ currentURL==="/employee/support" ? 'Admin_nav_link_selected Admin_nav_link' : "Admin_nav_link"} href="/employee/support">
                <SupportAgentIcon/><span className='disable_in_mobile'>support</span>  
            </Nav.Link>

            <Nav.Link onClick={()=>logOut()} className="Admin_nav_link" >
                <span  className='disable_in_mobile'>log out</span>  
            </Nav.Link>
        </div>
    )
}
export default EmpNav