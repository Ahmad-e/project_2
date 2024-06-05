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
        basket:{},
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
        }
    }
})

const store = createStore(modeSlice.reducer);
export const modeActions = modeSlice.actions;

export default store;
