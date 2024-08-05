import { Language } from "@mui/icons-material";
import { light } from "@mui/material/styles/createPalette";
import { createSlice, createStore } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const modeSlice = createSlice({
    name: "mode",
    initialState: {
        mode: Cookies.get("color_mode"),
        token: Cookies.get("ToKEn"),
        account: Cookies.get("AcC"),
        Language:Cookies.get("Language"),
        basket:Cookies.get('BaKet_W') ? (JSON.parse(Cookies.get('BaKet_W'))) : ([]),
        url:"http://127.0.0.1:8000/api/"
    },
    reducers: {
        darking : (state) => {
            Cookies.set("color_mode","dark",{expires: 70})
            state.mode = "dark";
        },
        lighting : (state) => {
            Cookies.set("color_mode","light",{expires: 70})
            state.mode = "light";
        },
        toggleMode : (state)=>{
            if(state.mode==="light")
            {
                Cookies.set("color_mode","dark",{expires: 70})
                state.mode = "dark";
            }
            else
            {
                Cookies.set("color_mode","light",{expires: 70})
                state.mode = "light";
            }
        },
        setToken : (state,value)=>{
            Cookies.set("ToKEn",value.payload,{expires: 70})
            state.token = value.payload;
        },
        setAcc : (state,value)=>{
            Cookies.set("AcC",value.payload,{expires: 70})
            state.account = value.payload;

            if(value.payload===1)
                window.location.href = '/admin/home';
            else if(value.payload===2)
                window.location.href = '/employee/home';
            else if(value.payload===3)
                window.location.href = '/profile';
            else
                window.location.href = '/';
        },
        clearBasket:(state)=>{
            state.basket=[];
            Cookies.remove('BaKet_W');
            console.log( state.basket)
        },
        addProduct:(state,value)=>{
            var newArr = [];
            for(var i=0;i<state.basket.length;i++)
                {  
                    if(JSON.parse(JSON.stringify(state.basket[i])).id===value.payload.id)
                    {
                        newArr = JSON.parse(JSON.stringify(state.basket))
                        newArr[i].quantity=newArr[i].quantity+1;
                        state.basket=newArr
                        Cookies.set('BaKet_W',  JSON.stringify(state.basket), { expires: 70 });
                        return
                    }

                }
            state.basket=[...state.basket, value.payload];
            Cookies.set('BaKet_W',  JSON.stringify(state.basket), { expires: 70 });
            //console.log(state.basket)
        }
        ,deleteProduct:(state,value)=>{
            var newArr = [];
            for(var i=0;i<state.basket.length;i++)
                {  
                    if(JSON.parse(JSON.stringify(state.basket[i])).id===value.payload)
                    {
                        newArr = JSON.parse(JSON.stringify(state.basket))
                        if(newArr[i].quantity > 1)
                        {
                            newArr[i].quantity = newArr[i].quantity - 1;
                            state.basket=newArr
                            Cookies.set('BaKet_W',  JSON.stringify(state.basket), { expires: 70 });
                            return
                        }
                        /*else if(newArr[i].quantity === 1)
                            {
                               
                            }*/
                    }

                }
        },
        deleteFullProduct(state,value){
            var newArr = [];
            var oldArr = JSON.parse(JSON.stringify(state.basket))
            for(var i=0;i<oldArr.length;i++)
                {  
                  if(i!==value.payload)
                  {
                    newArr.push(oldArr[i])
                  }
                }

            state.basket=newArr;
            Cookies.set('BaKet_W',  JSON.stringify(state.basket), { expires: 70 });
            console.log(state.basket)
            
        }
        
    }
})

const store = createStore(modeSlice.reducer);
export const modeActions = modeSlice.actions;

export default store;
