import { light } from "@mui/material/styles/createPalette";
import { createSlice, createStore } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const modeSlice = createSlice({
    name: "mode",
    initialState: {
        mode: Cookies.get("color_mode")
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
        }

    }
})

const store = createStore(modeSlice.reducer);
export const modeActions = modeSlice.actions;

export default store;
