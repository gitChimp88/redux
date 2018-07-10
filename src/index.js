import React from 'react';
import { render } from 'react-dom';
import Counter from './Counter';
import { Provider } from 'react-redux';
import { createStore } from 'redux';



const initialState = {
    count: 0,
    asset: [{name: "Asset1", power:"300"}, {name: "Asset2", power: "200"}, {name: "Asset3", power:"150"}],
    variable2: "connected",
    assets: ""
  };
  

function reducer(state = initialState, action) {
    
    if(action.type === "UPDATE"){

      console.log("updated heres the action data - ")
      console.log(action.data)
      return Object.assign({}, state, {assets: action.data}
      )
    }

    return state

  }

const store = createStore(reducer);


const App = () => (
  <Provider store={store}>
    <Counter />
  </Provider>
);

render(<App />, document.getElementById('root'));