import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Img from '../images/home2.jpg'
function Profile() {

    let mode = "dark";



    return(
        <div className="profile py-md-5">
            <div className="container">
                <div className="top p-4 d-sm-flex align-items-center justify-content-between">
                <div className="info d-sm-flex align-items-center gap-3">
                    <div className="image">
                        <img width={"100px"} height={"100px"} src={Img} alt="img" />
                    </div>
                    <div className="name-email">
                        <h5>
                            User Name
                        </h5>
                        <span className=" ٍ">
                            username@gmail.com
                        </span>
                    </div>
                </div>
                <button className="btn d-block edit btn-primary">
                    <FontAwesomeIcon icon={faEdit}/>
                    <span className="ps-2">Edit</span>
                </button>
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
                                    <span className="d-block">494$</span>
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
                                <Link to="" className="link col-lg-6">
                                    Start Shopping
                                </Link>
                                <Link to="" className="link col-lg-6">
                                Purchase records
                                </Link>
                                <Link to="" className="link col-lg-6">
                                    Money records
                                </Link>
                                <Link to="" className="link col-lg-6">
                                    The Basket
                                </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile;