import React, { useReducer } from "react";
import ShoppitList from "./src/ShoppitList";
import { Shoppit } from "./src/Shoppit";

//default items to buy!

const shoppitInitialState = {
  shoppits:[
    {id:'1', text:'pasta'},
    {id:'2', text:'oats'},
    {id:'3', text:'bananas'},
  ]
};

export default function App() {
  const [state, dispatch] = useReducer(shoppitsReducer, shoppitInitialState)
  return (
    <Shoppit.Provider value={{state, dispatch}}>
      <ShoppitList/>
    </Shoppit.Provider>
  )
}

function shoppitsReducer(state, action){
  switch(action.type){
    case 'add':
      //add new item into the array
      const addedShoppits = [...state.shoppits, action.payload]
      //spread our state and assign shoppits
      return {...state, shoppits:addedShoppits}

    case 'edit':
       const updatedShoppit = {...action.payload}
       const updatedShoppitIndex = state.shoppits.findIndex(t => t.id === action.payload.id)
       const updatedShoppits = [
        ...state.shoppits.slice(0, updatedShoppitIndex),
        updatedShoppit,
        ...state.shoppits.slice(updatedShoppitIndex + 1)
       ];
       return {...state, shoppits: updatedShoppits}

    case 'delete':
      const filteredShoppitState = state.shoppits.filter(shoppit => shoppit.id !== action.payload.id)
      return {...state, shoppits:filteredShoppitState}

    default: 
    return shoppitInitialState
  }
}