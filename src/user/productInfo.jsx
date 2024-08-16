import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as empty} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  Col, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import Card from "../component/card";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function ProductInfo(){

    const [hidden,setHidden] = useState("true");
    const [number,setNumber] = useState("");
    const [isLove,setIsLove] = useState(false);
    const [numLoves,setNumLoves] = useState(false);
    const [productInfo,setProductInfo] = useState([]);
    const [sameType, setSameType]= useState([]);
    const url = useSelector(state => state.url);
    const token = useSelector(state => state.token);
    console.log(url);
    console.log(token);

    const {id} = useParams();
    console.log(id);

    useEffect(()=>{
        axios.get(url+"showProductData/"+id,
            {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' +token 
                }
            }
        ).then(res => {
            setProductInfo(res.data.product[0]);
            setSameType(res.data["products with same type"]);
        }).catch(err => {
            console.log(err);
        })
    },[]);

    return(        
        <div className="productInfo">
            <Container> 
                <div className="d-flex justify-content-center">
                <div className="box rounded p-4 d-flex my-5 align-items-center align-items-start justify-content-center">
                    <div className="d-md-flex align-items-start text-sm-center text-md-start gap-4">
                        <div className="image">
                            <img className="rounded" width={"200px"} height={"200px"} src={productInfo.img_url} alt="img" />
                        </div>
                        <div className="info">
                            <div className="name mb-4 fw-bold fs-5">{productInfo.name}</div>
                            <div className="disc">{productInfo.disc}</div>
                            <div className="price my-3 fw-bold fs-4">
                                <span>
                                    {productInfo.price}$
                                </span>
                            </div>
                            <button onClick={()=>setHidden(false)} className="btn mt-2 w-100 fw-bold btn-primary">Add to cart</button>
                            <div hidden={hidden} className="field mt-5 position-relative">
                                <input className="input mb-4 w-100 rounded py-1 px-3" type="text" value={number} onChange={(e)=>setNumber(e.target.value)} placeholder="Number of product"/>
                                <label className="label text-black-50 fw-bold">Number of product</label>
                                <div className="buttuns d-flex align-items0center justify-content-between">
                                    <button className="btn btn-primary fw-bold">
                                        Ok
                                    </button>
                                    <button onClick={()=>setHidden(true)} className="btn btn-primary fw-bold">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                            <div className="loveHolder d-flex flex-column align-items-center justify-content-center">
                                <FontAwesomeIcon cursor={"pointer"} className='love mt-4 mb-2'
                                style={{
                                    color: isLove ? "#b0171f" : "",
                                }}
                                onClick={()=>setIsLove(prev => !prev)} icon={faHeart}/>
                                <div onClick={()=>{
                                    setNumLoves(prev => !prev);
                                }} className="showLoves d-flex align-items-center gap-3 rounded py-2 px-4">
                                    <FontAwesomeIcon icon={empty} className="emptyHeart"/>
                                    <span className="text-b">{numLoves? "Hidden" : "Show"} the number of Loves</span>
                                </div>
                                {numLoves && 
                                <div className="mt-3 fs-5">
                                    <span>{productInfo.likes}</span>
                                    <FontAwesomeIcon icon={faHeart} className="numberLove px-2"/>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <h2 className="mt-4 mb-3">Product meybe like</h2>
                <div className="sameType row d-flex justify-content-center">
                    {sameType.map((el,key)=>{
                        return(
                            <Col lg={4} md={6} sm={6} xs={12}>
                            <Card 
                                        id={el.id}
                                        name={el.name}
                                        imgURL={el.img_url}
                                        disc={el.disc}
                                        salary={el.price} 
                                        love={true} 
                                        type_id={el.type_id} />
                        </Col>
                        )
                    })}
                </div>
            </Container>
        </div>
    );
}
export default ProductInfo;