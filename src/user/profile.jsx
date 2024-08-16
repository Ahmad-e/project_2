import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Img from '../images/home2.jpg';
import {useState,useEffect} from 'react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import {modeActions} from "../Store/Store"
import Err500 from '../SVGs/err500';
import Err401 from '../SVGs/err401';
import Loading from "../component/loading";

function Profile() {
    const dispatch = useDispatch();
    const {setToken,setAcc} = modeActions;
    const url = useSelector(state=>state.url);
    const token = useSelector(state=>state.token);
    const acc = useSelector(state=>state.account);
    const [errServer,setErrServver] = useState(false);
    const [user,setUser]=useState([]);
    const [messages,setMessages] = useState([]);
    const [showMessages,setShowMessages] = useState(false);
    const [load,setLoad] = useState(true);


    useEffect(() => {
        axios.get( url+"profile",
            {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' +token 
                }
            }
        )
            .then((response) => {
                setUser(response.data.user_data[0])
                setMessages(response.data.user_messages);
                setLoad(false);
                console.log(response.data.user_messages);
            })
            .catch((error) => {
                setErrServver(true);
                console.log(error);
                setLoad(false);
            });
    }, []);


    const logOut=()=>{
        dispatch(setAcc(null))
        dispatch(setToken(null))
    }

    if(errServer)
        return(
            <div>
                <Err500/>
                <p>
                    There was a problem with the servers , You can try later
                </p>
            </div>
        )

        if(acc!=="3")
            return(
                <div>
                    <Err401/>
                    <p>You cannot access this page. You must log in as an admin , go to <a href='/login'>Login</a></p>
                </div>
            )

        return(
            <div className="profile py-md-3">
                {load ? <Loading/> : ""}
                <div className="container">
                    <div className="top p-4 d-sm-flex align-items-center justify-content-between">
                    <div className="info d-sm-flex align-items-center gap-3">
                        <div className="image">
                            <img width={"100px"} height={"100px"} src={user.img_url ?  user.img_url : require("../images/download (2).png")} alt="img" />
                        </div>
                        <div className="name-email">
                            <h5>
                                {user.name}
                            </h5>
                            <span className=" ٍ">
                                {user.email}
                            </span>
                        </div>
                    </div>
                    <Link to="/editProfile" className="btn d-block edit btn-primary">
                        <FontAwesomeIcon icon={faEdit}/>
                        <span className="ps-2">Edit</span>
                    </Link>
                </div>
                <div className="bottom mt-2">
                        <div className="left text-md-center text-lg-start p-4">
                            <h5 className="fw-bold mb-md-4 mb-lg-0">
                                Wallet Manage
                            </h5>
                            <div className="wallet-info">
                                <div className="d-flex py-3 align-items-center justify-content-center fs-4">
                                    <span className="d-block text-center my-md-5 my-lg-0">
                                        Your Balance
                                        <span className="d-block">{user.badget}$</span>
                                    </span>
                                </div>
                                <div className="buttons d-lg-flex justify-content-between align-items-center">
                                    <button className="btn btn-primary d-md-block m-md-auto mb-md-4 m-lg-0">
                                        Add
                                    </button>
                                    <button className="btn btn-primary d-md-block m-md-auto mt-md-3 m-lg-0">
                                        Withdrow
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="right text-md-center p-4">
                            <h5 className="fw-bold mb-5 mb-lg-4">
                                Actions
                            </h5>
                            <div className="links row mx-md-2 ms-lg-0">
                                    <Link to="/search/-1/-1" className="link col-lg-6">
                                        Start Shopping
                                    </Link>
                                    <Link to="/support" className="link col-lg-6">
                                        support
                                    </Link>
                                    <Link to="orders" className="link col-lg-6">
                                        my orders
                                    </Link>
                                    <Link to="#" onClick={()=>{setShowMessages(prev => !prev)}} className="link col-lg-6">
                                        {showMessages ? "Hide Messages" : "Show Messages"}
                                    </Link>
                                    <Link onClick={()=>logOut()} className="link col-lg-12">
                                        log out
                                    </Link>
                            </div>
                        </div>
                    </div>
                    {showMessages ? <div className="messages d-flex justify-content-center py-4 my-2 rounded">
                        <table className="rounded">
                                <th className="rounded">
                                        <td>Your message</td>
                                        <td>Reply</td>
                                </th>
                            <tbody>
                            {
                                messages.map((el,key)=>
                                    <tr className="question border-bottom">
                                        <td className="msg" key={key}>
                                            {el.question}
                                        </td>
                                        <td className="reply">
                                            {el.answer===null ? "no reply" : el.answer}
                                        </td>
                                    </tr>
                            )}
                            </tbody>
                        </table>
                    </div> : ""}
                </div>
            </div>
        )
}
export default Profile;