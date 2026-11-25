import React, { Component } from "react";
import './Data.css'

class Data extends Component{
    render(){
        return(
            <div >
                <h6 className="text">{this.props.data}<br className="text-status"/>{this.props.status}</h6>
            </div>
        )
    }
}
export default Data