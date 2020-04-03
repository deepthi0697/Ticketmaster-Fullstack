import React from 'react' 
import isEmpty from 'lodash/isEmpty'
import axios from '../../config/axios'
import Form from './Form'

class CustomerEdit extends React.Component{
    constructor(){
        super()
        this.state = {
            customer: {}
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`customers/${id}`, {
            headers : {
                'x-auth' : localStorage.getItem('authKey')
            }
        })
        .then((response) => {
            const customer = response.data
            this.setState({customer})
        })
        .catch((err) => {
            alert(err)
        })
    }

    handleSubmit = (formData) => {
        const _id = this.props.match.params.id
        axios.put(`/customers/${_id}` , formData , {
            headers: {
                'x-auth' : localStorage.getItem('authKey')
            }
        })
        .then((response) => {
            const customer = response.data
            this.setState({customer})
            this.props.history.push('/customers')
        })
        .catch((err) => {
            alert(err)
        })
    }

    render() {
        return (
            <div>
                <h1>Edit Customer</h1>
                { !isEmpty(this.state.customer) && <Form customer={this.state.customer} handleSubmit={this.handleSubmit}/>}
            </div>
        )
    }
}

export default CustomerEdit