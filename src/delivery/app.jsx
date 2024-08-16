import {Outlet } from 'react-router-dom';
import Err401 from '../SVGs/err401';
import { useSelector } from 'react-redux';

const DelivaryApp=()=>{

    const acc = useSelector(state=>state.account);

    if(acc!=="4")
        return(
            <div>
                <Err401/>
                <p>You cannot access this page. You must log in as an admin , go to <a href='/login'>Login</a></p>
            </div>
        )

    return(
        <div>
            <Outlet />
        </div>
    )
}
export default DelivaryApp