import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {modeActions} from "../Store/Store";
import {useState} from 'react';
import axios from "axios";


function Card(param) {

    const [isLove,setIsLove] =  useState(param.love);
    const [isAdded,setIsAdded] =  useState(false);

    const {addProduct} = modeActions;
    const url = useSelector(state=>state.url);
    const token = useSelector(state=>state.token);

    const dispatch = useDispatch();

    const tuggleFavorite = () =>{
        axios.get( url+"toggleFavourite/"+param.id,
            {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' +token 
                }
            }
        ).then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    return (
        <div className='productCard text-center  rounded'>
            <div className='image position-relative'>
                <img className='d-block position-absolute' width={"100%"} height={"100%"} src={param.imgURL} alt="img" />
            </div>
            <div className='content px-3'>
                <h3 className='title py-3 my-4'>{param.name}</h3>
                    <div className='description py-4'>{param.disc}</div>
                <span className='price fw-bold d-block'>{param.salary}$</span>
                <div className='cart-love border-bottom d-flex align-items-center justify-content-between pb-2 pt-3 mx-3'>
                    <div>
                        <FontAwesomeIcon 
                        className="cart"
                        style={{
                        color: isAdded ? "#b0171f" : "",
                        }}
                        onClick={()=>{
                            setIsAdded(true);
                            dispatch(addProduct(
                                {
                                    id:param.id,
                                    name:param.name,
                                    imgURL:param.imgURL,
                                    salary:param.salary ,
                                    quantity:1,
                                }
                            ))
                        }}
                        cursor={"pointer"}
                        icon={faCartShopping}/>
                        <p className='pCart'>{isAdded ? "Added" : "Add"}</p>
                    </div>
                    <div>
                        <FontAwesomeIcon cursor={"pointer"} className='love'
                        style={{
                            color: isLove ? "#b0171f" : "",
                        }}
                        onClick={()=>{tuggleFavorite(); setIsLove(prev => !prev)}} icon={faHeart}/>
                        <p className='pLove'>{isLove ? "Loved" : "Love"}</p>
                    </div>
                </div>
                <Link to={"/product/"+ param.id} className='card-btn d-block fw-bold py-2 px-4 mt-3'>
                    <span>More</span>
                </Link>
            </div>
        </div>
    )
};

export default Card;