import React, { Component } from "react";
import './Image.css'

class Image extends Component{
    render(){
        return(
            <div className="container-image" style={{backgroundColor:this.props.bgcolor}}>
                <img className="image" src={this.props.url} style={{width:this.props.size}} />
            </div>
        )
    }
}
export default Image