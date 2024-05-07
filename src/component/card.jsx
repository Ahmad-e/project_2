import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Card(param) {
    console.log(param);
    const [isLove,setIsLove] =  useState(param.love);
    return (
        <div className='card text-center rounded'>
            <div className='image position-relative'>
                <img width={"100%"} height={"100%"} src={param.imgURL} alt="img" />
            </div>
            <div className='content'>
                <h1 className='title pb-3 m-0'>{param.name}</h1>
                    <div className='description text-black-50 py-4'>
                        {param.disc}
                    </div>
                <div className='love-price border-bottom d-flex align-items-center justify-content-between pb-4 mx-3 mb-4'>
                    <span className='price fw-bold d-block'>{ param.salary }$</span>
                    <FontAwesomeIcon cursor={"pointer"} className='love'
                    style={{
                        color: isLove ? "#b0171f" : "",
                    }}
                    onClick={()=>setIsLove(prev => !prev)} icon={faHeart}/>
                </div>
                <Link to="/" className='card-btn d-block fw-bold py-2 px-4 my-2'>
                    <span>More</span>
                </Link>
                
            </div>
        </div>
    )
};

export default Card;