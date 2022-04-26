import React, { Component } from "react";
import './Profile.css'

class Profile extends Component{
    render(){
        return(
            <div>
                <h6 className="text-name">{this.props.name}</h6>
                <p className='text'>{this.props.grade}</p>
                <p className='text'>{this.props.major}</p>
            </div>
        )
    }
}
export default Profile