import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import axios from "axios";

 class Counter extends React.Component {
   constructor(props){
     super(props)
     this.state = {
       assets: [],
       loading: false
     }
     this.updateRedux = this.updateRedux.bind(this)
   }
  
  
  componentWillMount(){
    axios.get('https://private-d9e42-instatrust.apiary-mock.com/Assets')
    .then(function (data) {
      console.log(data.data)
      debugger
      let assets = data.data
      
      this.setState({assets:assets})
      this.setState({loading: false})
      this.updateRedux();
     
    }.bind(this))
    .catch(function(err){
    console.log(err)
      return err
    })
  }

  /*
  async getData(){
    console.log("hi")
    const res = await axios.get('https://private-d9e42-instatrust.apiary-mock.com/Assets')
    .then(function (data) {
     
      debugger
      let assets = data.data
      console.log("hello this is async get data")
      return assets;
      
    
      

      //this.setState({assets:assets})
      //this.setState({loading: false})
      
     
    })
    .catch(function(err){
    console.log(err)
      return err
    })

    return await res;
  }*/

  /*
  componentDidMount() {
    console.log("component did mount")
    if (this.state.assets) {
        (async () => {
          console.log("before try")
            try {
               // this.setState({data: await this.getData()});
               console.log("being called from lifecycle")
                this.props.dispatch({type: "UPDATE", data: await this.getData()})
            } catch (e) {
                //...handle the error...
            }
        })();
    }
}*/


  updateRedux(){
    if(this.state.assets){
      console.log("updateRedux with this this.state.assets - ")
      console.log(this.state.assets)
      this.props.dispatch({type: "UPDATE", data: this.state.assets})
    } else {
      console.log("not available on mount")
    }
  }

  render() {
    let asset = this.props.asset
    let variable = this.props.variable2
    let assets = this.props.assets
    console.log("from the render function below is the local state (should be empty)")
    console.log(this.state.assets)

    console.log("checking if redux is sending props")
    console.log(assets)
    
    

    return (
      <div>
        <h2>Counter</h2>

        {assets ?  assets.map(function(val, i){
      return <div key={i}><h1>{val.asset}</h1></div>
    }) : null}
        
        <h1>{variable}</h1>
        <div>
          <button onClick={this.decrement}>-</button>
          <span>{this.props.count}</span>
          <button onClick={this.increment}>+</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
    return {
      count: state.count,
      asset: state.asset,
      variable2: state.variable2,
      assets: state.assets

    };
}
  
  
export default connect(mapStateToProps)(Counter);

Counter.propTypes = {
  asset: PropTypes.array,
 assets: PropTypes.array
};
