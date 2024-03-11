import { createSlice} from "@reduxjs/toolkit";

const initialState={
    datas:[],
}
export const dataSlice=createSlice({
    name:'data',
    initialState,
    reducers:{
        Name: (state, action) => {
            console.log("Payload:", action);
            state.datas=action.payload;
        },
    },
});

export const {Name} = dataSlice.actions;
export default dataSlice.reducer;