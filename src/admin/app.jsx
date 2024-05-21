import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AdminNave from './adminNav'
import {Outlet } from 'react-router-dom';
const AdminApp=()=>{
    return(
        <div className='admin_app'>
            <div className='admin_header' lg={3} md={2} xm={2} >
                <AdminNave />
            </div>
            <div className='admin_body' lg={9} md={10} xs={10}>
                <Outlet />
            </div>
        </div>
    )
}
export default AdminApp