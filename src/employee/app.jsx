import {Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Err401 from '../SVGs/err401'
import EmpNav from './empNav'
const EmployeeApp=()=>{

    const acc = useSelector(state=>state.account);

    if(acc!=="2")
        return(
            <div>
                <Err401/>
                <p>You cannot access this page. You must log in as an admin , go to <a href='/login'>Login</a></p>
            </div>
        )

    return(
        <div className='admin_app'>
            <div className='admin_header' lg={3} md={2} xm={2} >
                <EmpNav />
            </div>
            <div className='admin_body' lg={9} md={10} xs={10}>
                <Outlet />
            </div>
        </div>
    )
}
export default EmployeeApp