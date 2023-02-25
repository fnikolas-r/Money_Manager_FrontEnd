import {createSlice} from "@reduxjs/toolkit";

const component = createSlice({
    name:"component",
    initialState:{
        modalInputOpen: {status:false,name:null,before:false,id:null},
    },
    reducers:{
        setinputmodalstatus: (state,action)=>{
            state.modalInputOpen.status = true;
            state.modalInputOpen.id = action.payload.id ?? state.modalInputOpen.id;
            state.modalInputOpen.name = action.payload.name ?? state.modalInputOpen.name ;
            state.modalInputOpen.before = action.payload.before ?? null;
        },
        resetinputmodal : (state,action)=>{
            state.modalInputOpen.status= false;
            state.modalInputOpen.id= null;

        },
        modalbackto : (state,action)=>{
            if(action.payload){
                state.modalInputOpen.name = action.payload
            }else if(state.modalInputOpen.before){
                state.modalInputOpen.name = state.modalInputOpen.before
            }else{
                state.modalInputOpen.name = null
            }
            state.modalInputOpen.id = null
            state.modalInputOpen.before = null
        }

    }
})

const {reducer,actions} = component;
export default reducer;
export const {setinputmodalstatus,resetinputmodal,modalbackto} = actions;