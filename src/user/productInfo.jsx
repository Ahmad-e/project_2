import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as empty} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "react-bootstrap";
import { useState } from "react";
import Img from '../images/home.jpg'
function ProductInfo(){

    let mode = "light";

    const [hidden,setHidden] = useState("true");
    const [number,setNumber] = useState("");
    const [isLove,setIsLove] = useState(false);
    const [numLoves,setNumLoves] = useState(false);

    const numberOfLoves = 33;

    return(        
        <div className="productInfo">
            <Container className="h-100 d-flex align-items-center align-items-start justify-content-center">
                <div className="box rounded p-4">
                    <div className="d-md-flex align-items-start text-sm-center text-md-start gap-4">
                        <div className="image">
                            <img className="rounded" width={"200px"} height={"200px"} src={Img} alt="img" />
                        </div>
                        <div className="info">
                            <div className="name mb-4 fw-bold fs-5">Product Name</div>
                            <div className=" ">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius commodi adipisci, porro eum odio qu Eius commodi adipisci
                            </div>
                            <div className="price my-3 fw-bold fs-4">
                                <span>
                                    290$
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
                                    <span>{numberOfLoves}</span>
                                    <FontAwesomeIcon icon={faHeart} className="numberLove px-2"/>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
export default ProductInfo;