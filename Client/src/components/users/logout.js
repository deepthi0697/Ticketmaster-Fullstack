import React from 'react'
import {Redirect} from 'react-router-dom'

class Logout extends React.Component{
    render(){
        localStorage.clear('authKey') 
        return(
           this.props.history.push('/')     
        )
    }
}

export default Logout