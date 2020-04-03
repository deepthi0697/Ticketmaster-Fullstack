import React from 'react'
import Form from './Form'
import axios from '../../config/axios'

class NewCustomer extends React.Component {
    handleSubmit = (formData) => {
        axios.post('/customers',formData, {
            headers : {
                'x-auth': localStorage.getItem('authKey')
            }
        })
        .then((response) => {
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            } else {
                this.props.history.push('/customers')
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
    render(){
        return (
            <div>
                <h2 >Add customer</h2>
                <Form handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}

export default NewCustomer